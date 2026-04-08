import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const { data } = await API.post("/auth/register", form);

      // ✅ save token
      localStorage.setItem("userInfo", JSON.stringify(data));

      // ✅ redirect
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-6 rounded-xl w-80">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Register
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full p-2 mb-3 rounded bg-gray-700"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 mb-3 rounded bg-gray-700"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 mb-3 rounded bg-gray-700"
          onChange={handleChange}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-blue-500 py-2 rounded hover:bg-blue-600"
        >
          Register
        </button>

        <p className="text-sm mt-3 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;