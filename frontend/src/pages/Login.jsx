import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/auth/login", {
        email,
        password,
      });

      // ✅ Save user + token
      localStorage.setItem("userInfo", JSON.stringify(data));

      // ✅ Redirect
      navigate("/");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form 
        onSubmit={handleLogin}
        className="bg-gray-800 p-6 rounded-xl shadow-md w-80"
      >
        <h2 className="text-xl font-bold mb-4">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 rounded bg-gray-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-3 rounded bg-gray-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-blue-500 py-2 rounded hover:bg-blue-600">
          Login
        </button>
        <p className="text-sm mt-3 text-center">
          Don't have an account?{" "}
          <span
            className="text-blue-400 cursor-pointer"
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
