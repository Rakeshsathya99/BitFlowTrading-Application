import { Button } from "@/components/ui/button";

const LoginWithGoogle = () => {

  const handleGoogleLogin = () => {
    // 🔥 IMPORTANT:
    // This MUST be a full page redirect, not fetch / axios
    window.location.href =
      "https://bitflowtrading-application.onrender.com/login/oauth2/authorization/google";
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-6">
      <h2 className="text-2xl font-semibold">Login</h2>

      <Button onClick={handleGoogleLogin}>
        Login with Google
      </Button>
    </div>
  );
};

export default LoginWithGoogle;
