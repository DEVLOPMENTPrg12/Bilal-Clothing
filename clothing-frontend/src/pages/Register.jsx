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
    <div className="flex justify-center items-center min-h-screen bg-gray-50 pt-20">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">
          <span className="text-purple-800">Bilal</span> Clothing
        </h2>
        <h3 className="text-xl font-semibold text-gray-700 text-center mb-6">
          Create your account ✨
        </h3>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} className="w-full border px-4 py-2 rounded-lg" required />
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border px-4 py-2 rounded-lg" required />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border px-4 py-2 rounded-lg" required />
          <input type="password" placeholder="Confirm Password" value={confirm} onChange={e => setConfirm(e.target.value)} className="w-full border px-4 py-2 rounded-lg" required />

          <button type="submit" className="w-full bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-800 transition">Register</button>
        </form>

        {/* Login Link */}
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-700 hover:underline font-medium">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
