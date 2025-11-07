import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import Navbar from "./Navbar";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error("Please fill in all fields!");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/contact", {
        name,
        email,
        message,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setName("");
        setEmail("");
        setMessage("");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error sending the message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 mt-10">
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100">
          {/* Left side */}
          <div className="bg-gray-900 text-white p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center md:text-left">
                Contact Us
              </h2>
              <p className="text-gray-300 mb-8 sm:mb-10 text-center md:text-left leading-relaxed">
                Have a question, a project, or want to collaborate?
                <br />
                Feel free to reach out or follow us on social media.
              </p>

              <div className="space-y-5 text-sm sm:text-base">
                <div className="flex items-center justify-center md:justify-start space-x-4">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <span>contact@example.com</span>
                </div>
                <div className="flex items-center justify-center md:justify-start space-x-4">
                  <Phone className="w-5 h-5 text-blue-400" />
                  <span>+212 6 12 34 56 78</span>
                </div>
                <div className="flex items-center justify-center md:justify-start space-x-4">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  <span>Casablanca, Morocco</span>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-10 text-center md:text-left">
                <h3 className="text-lg font-semibold mb-3 text-gray-100">
                  Follow Us
                </h3>
                <div className="flex justify-center md:justify-start space-x-3 sm:space-x-4">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 sm:p-3 bg-blue-600 rounded-full hover:bg-blue-700 transition"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 sm:p-3 bg-pink-500 rounded-full hover:bg-pink-600 transition"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 sm:p-3 bg-blue-500 rounded-full hover:bg-blue-600 transition"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 sm:p-3 bg-sky-400 rounded-full hover:bg-sky-500 transition"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            <div className="text-xs sm:text-sm text-gray-400 mt-8 text-center md:text-left">
              © 2025 YourCompany. All rights reserved.
            </div>
          </div>

          {/* Right side - Form */}
          <div className="p-6 sm:p-10">
            <h3 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-800 text-center md:text-left">
              Send Us a Message
            </h3>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm sm:text-base"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm sm:text-base"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Message
                </label>
                <textarea
                  rows="5"
                  placeholder="Your message..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm sm:text-base"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>

              <button
                type="submit"
                className={`w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
