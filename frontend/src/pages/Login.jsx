import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";
import { useAuth } from "../context/AuthContext";

import Logo from "../components/Logo";

import { ui } from "../styles/ui";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await API.post("/auth/login", {
        email,
        password,
      });

      login(data);
      navigate("/");
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div className={ui.authContainer}>
      {/* Background Glow */}

      <div className={ui.authGlowLeft} />
      <div className={ui.authGlowRight} />

      <form
        onSubmit={handleLogin}
        className={ui.authCard}
      >
        {/* Logo */}

        <div className={ui.authLogo}>
          <Logo center size="large" />
        </div>

        <h2 className={`${ui.cardTitle} text-center`}>
          Welcome Back
        </h2>

        {/* Email */}

        <div>
          <label className={ui.label}>
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            className={ui.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}

        <div>
          <label className={ui.label}>
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            className={ui.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Error */}

        {error && (
          <div className={ui.error}>
            {error}
          </div>
        )}

        {/* Login */}

        <button
          type="submit"
          className={ui.authButton}
        >
          Login
        </button>

        {/* Footer */}

        <p className={ui.authFooter}>
          Don't have an account?{" "}

          <span
            className={ui.authLink}
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;