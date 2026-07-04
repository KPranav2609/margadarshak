import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import API from "../services/api";
import Logo from "../components/Logo";

import { ui } from "../styles/ui";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await API.post("/auth/register", {
        name,
        email,
        password,
      });

      login(data);

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Try again.",
      );
    }
  };

  return (
    <div className={ui.authContainer}>
      {/* Background Glow */}

      <div className={ui.authGlowLeft} />
      <div className={ui.authGlowRight} />

      <form onSubmit={handleRegister} className={ui.authCard}>
        {/* Logo */}

        <div className={ui.authLogo}>
          <Logo center size="large" />
        </div>

        <h2 className={`${ui.cardTitle} text-center`}>Create Account</h2>

        {/* Name */}

        <div>
          <label className={ui.label}>Name</label>

          <input
            type="text"
            placeholder="Enter your name"
            className={ui.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email */}

        <div>
          <label className={ui.label}>Email</label>

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
          <label className={ui.label}>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            className={ui.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Error */}

        {error && <div className={ui.error}>{error}</div>}

        {/* Register Button */}

        <button type="submit" className={ui.authButton}>
          Register
        </button>

        {/* Footer */}

        <p className={ui.authFooter}>
          Already have an account?{" "}
          <span className={ui.authLink} onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
