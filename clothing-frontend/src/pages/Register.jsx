import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      alert(res.data.message || "Account created successfully");
      navigate("/");
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-purple-50 to-gray-100 px-4 sm:px-6 lg:px-8 pt-20">
      <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 w-full max-w-md sm:max-w-lg md:max-w-xl transition-all duration-300">
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 sm:mb-6">
          <span className="text-purple-800">Bilal</span> Clothing
        </h2>
        <h3 className="text-lg sm:text-xl font-semibold text-gray-700 text-center mb-6">
          Create your account ✨
        </h3>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none px-4 py-2 rounded-lg text-sm sm:text-base"
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none px-4 py-2 rounded-lg text-sm sm:text-base"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none px-4 py-2 rounded-lg text-sm sm:text-base"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none px-4 py-2 rounded-lg text-sm sm:text-base"
            required
          />

          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-2 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-purple-800 active:scale-95 transition-transform duration-150"
          >
            Register
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-gray-600 mt-4 text-sm sm:text-base">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-purple-700 hover:underline font-medium"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
