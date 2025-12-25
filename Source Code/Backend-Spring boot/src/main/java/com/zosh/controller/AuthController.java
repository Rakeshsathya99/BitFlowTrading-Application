package com.zosh.controller;

import com.zosh.config.JwtProvider;
import com.zosh.exception.UserException;
import com.zosh.model.TwoFactorOTP;
import com.zosh.model.User;
import com.zosh.repository.UserRepository;
import com.zosh.request.LoginRequest;
import com.zosh.response.AuthResponse;
import com.zosh.service.*;
import com.zosh.utils.OtpUtils;

import java.io.IOException;
import java.util.Collections;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private CustomeUserServiceImplementation customUserDetails;

    @Autowired
    private UserService userService;

    @Autowired
    private WatchlistService watchlistService;

    @Autowired
    private VerificationService verificationService;

    @Autowired
    private TwoFactorOtpService twoFactorOtpService;

    @Autowired
    private EmailService emailService;

    // ===================== SIGN UP =====================
    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@RequestBody User user) throws UserException {

        if (userRepository.findByEmail(user.getEmail()) != null) {
            throw new UserException("Email already registered");
        }

        User newUser = new User();
        newUser.setEmail(user.getEmail());
        newUser.setFullName(user.getFullName());
        newUser.setMobile(user.getMobile());
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));

        User savedUser = userRepository.save(newUser);

        watchlistService.createWatchList(savedUser);

        Authentication authentication =
                new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword());

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = JwtProvider.generateToken(authentication);

        AuthResponse response = new AuthResponse();
        response.setJwt(token);
        response.setMessage("Registration successful");

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // ===================== SIGN IN =====================
    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> signin(
            @RequestBody LoginRequest loginRequest
    ) throws UserException, MessagingException {

        Authentication authentication =
                authenticate(loginRequest.getEmail(), loginRequest.getPassword());

        User user = userService.findUserByEmail(loginRequest.getEmail());

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = JwtProvider.generateToken(authentication);

        // ===== TWO FACTOR AUTH =====
        if (user.getTwoFactorAuth().isEnabled()) {

            String otp = OtpUtils.generateOTP();

            TwoFactorOTP oldOtp = twoFactorOtpService.findByUser(user.getId());
            if (oldOtp != null) {
                twoFactorOtpService.deleteTwoFactorOtp(oldOtp);
            }

            TwoFactorOTP twoFactorOTP =
                    twoFactorOtpService.createTwoFactorOtp(user, otp, token);

            emailService.sendVerificationOtpEmail(user.getEmail(), otp);

            AuthResponse response = new AuthResponse();
            response.setMessage("Two-factor authentication required");
            response.setTwoFactorAuthEnabled(true);
            response.setSession(twoFactorOTP.getId());

            return new ResponseEntity<>(response, HttpStatus.OK);
        }

        AuthResponse response = new AuthResponse();
        response.setMessage("Login successful");
        response.setJwt(token);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

	@GetMapping("/login/oauth2/code/google")
public void handleGoogleCallback(
        OAuth2AuthenticationToken authentication,
        HttpServletResponse response
) throws IOException {

    String email = authentication.getPrincipal().getAttribute("email");
    String fullName = authentication.getPrincipal().getAttribute("name");

    User user = userRepository.findByEmail(email);

    // Create user if not exists
    if (user == null) {
        user = new User();
        user.setEmail(email);
        user.setFullName(fullName);
        user.setPassword(passwordEncoder.encode("GOOGLE_LOGIN"));
        user = userRepository.save(user);

        watchlistService.createWatchList(user);
    }

    UserDetails userDetails =
        customUserDetails.loadUserByUsername(email);

Authentication auth =
        new UsernamePasswordAuthenticationToken(
                userDetails,
                null,
                userDetails.getAuthorities()
        );

SecurityContextHolder.getContext().setAuthentication(auth);
    String token = JwtProvider.generateToken(auth);

    // Redirect to frontend with JWT
    String redirectUrl =
            "https://bit-flow-trading-application.vercel.app/oauth-success?token=" + token;

    response.sendRedirect(redirectUrl);
}

    // ===================== VERIFY 2FA OTP =====================
    @PostMapping("/two-factor/otp/{otp}")
    public ResponseEntity<AuthResponse> verifyOtp(
            @PathVariable String otp,
            @RequestParam String id
    ) throws Exception {

        TwoFactorOTP twoFactorOTP = twoFactorOtpService.findById(id);

        if (twoFactorOtpService.verifyTwoFactorOtp(twoFactorOTP, otp)) {

            AuthResponse response = new AuthResponse();
            response.setMessage("Two-factor authentication verified");
            response.setTwoFactorAuthEnabled(true);
            response.setJwt(twoFactorOTP.getJwt());

            return new ResponseEntity<>(response, HttpStatus.OK);
        }

        throw new Exception("Invalid OTP");
    }

    // ===================== AUTH HELPER =====================
    private Authentication authenticate(String email, String password) {

        UserDetails userDetails =
                customUserDetails.loadUserByUsername(email);

        if (userDetails == null) {
            throw new BadCredentialsException("Invalid email or password");
        }

        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException("Invalid email or password");
        }

        return new UsernamePasswordAuthenticationToken(
                userDetails,
                null,
                userDetails.getAuthorities()
        );
    }
}
