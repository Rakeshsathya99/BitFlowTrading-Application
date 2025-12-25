import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("jwt", token);
      navigate("/dashboard"); // or home page
    } else {
      navigate("/login");
    }
  }, []);

  return <p>Logging you in...</p>;
};

export default OAuthSuccess;
