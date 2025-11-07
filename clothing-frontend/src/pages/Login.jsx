import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import api from "../services/api";
import { loadCart } from "../redux/cartSlice"; // 🟢 استدعاء الأكشن

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });

      // ✅ خزن المستخدم فـ localStorage
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      // 🟣 load cart مباشرة بعد login
      await dispatch(loadCart());

      // توجيه المستخدم حسب الدور
      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 pt-20 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md sm:max-w-lg md:max-w-md transition-all duration-300">
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6">
          <span className="text-purple-800">Bilal</span> Clothing
        </h2>
        <h3 className="text-lg sm:text-xl font-semibold text-gray-700 text-center mb-6">
          Welcome back 👋
        </h3>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-600 mb-1 font-medium">
              Email Address
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm sm:text-base"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1 font-medium">
              Password
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm sm:text-base"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 sm:py-3 rounded-lg text-sm sm:text-base transition duration-200"
          >
            Login
          </button>

          {error && (
            <p className="text-red-600 text-center mt-3 font-medium text-sm sm:text-base">
              {error}
            </p>
          )}
        </form>

        {/* Register Link */}
        <p className="text-center text-gray-600 mt-6 text-sm sm:text-base">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-purple-700 hover:underline font-medium"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
