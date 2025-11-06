import React, { useState } from "react";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
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
    <div className="min-h-screen bg-gray-50 pt-20 px-4 sm:px-6 lg:px-8">
      <Navbar />

      <div className="min-h-screen flex items-center justify-center px-4 py-16">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100">
          {/* Left side - Info */}
          <div className="bg-gray-900 text-white p-10 flex flex-col justify-between">
            <div>
              <h2 className="text-4xl font-bold mb-6">Contact Us</h2>
              <p className="text-gray-300 mb-10 leading-relaxed">
                Have a question, a project, or want to collaborate? 
                Feel free to reach out or follow us on our social media.
              </p>

              <div className="space-y-5">
                <div className="flex items-center space-x-4">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <span>contact@example.com</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone className="w-5 h-5 text-blue-400" />
                  <span>+212 6 12 34 56 78</span>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  <span>Casablanca, Morocco</span>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-10">
                <h3 className="text-lg font-semibold mb-3 text-gray-100">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-600 rounded-full hover:bg-blue-700 transition">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-pink-500 rounded-full hover:bg-pink-600 transition">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-500 rounded-full hover:bg-blue-600 transition">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-sky-400 rounded-full hover:bg-sky-500 transition">
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            <div className="text-sm text-gray-400 mt-10">
              © 2025 YourCompany. All rights reserved.
            </div>
          </div>

          {/* Right side - Form */}
          <div className="p-10">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">Send Us a Message</h3>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Message</label>
                <textarea
                  rows="5"
                  placeholder="Your message..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>

              <button
                type="submit"
                className={`w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
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
