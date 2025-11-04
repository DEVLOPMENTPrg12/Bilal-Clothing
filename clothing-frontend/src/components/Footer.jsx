import React from "react";

export default function Footer() {
  return (
    <footer className="bg-black p-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-white border-t border-gray-700">
      {/* Logo */}
      <div className="text-center sm:text-left">
        <h1 className="text-3xl font-bold mb-4">
          <span className="text-purple-800">Bilal</span> Shop
        </h1>
        <p className="text-gray-400">Your favorite fashion destination.</p>
      </div>

      {/* Navigation Links */}
      <div className="text-center sm:text-left">
        <h2 className="text-xl font-semibold mb-4">Navigation</h2>
        <ul className="space-y-2">
          <li>
            <a href="#" className="hover:text-purple-600">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-purple-600">
              Shop
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-purple-600">
              Blog
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-purple-600">
              Contact
            </a>
          </li>
        </ul>
      </div>

      {/* Categories */}
      <div className="text-center sm:text-left">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <ul className="space-y-2">
          <li>
            <a href="#" className="hover:text-purple-600">
              Men's Collection
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-purple-600">
              Women's Collection
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-purple-600">
              Accessories
            </a>
          </li>
        </ul>
      </div>

      {/* Social Media */}
      <div className="text-center sm:text-left">
        <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
        <ul className="space-y-2">
          <li>
            <a href="#" className="hover:text-purple-600">
              Facebook
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-purple-600">
              Twitter
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-purple-600">
              LinkedIn
            </a>
          </li>
        </ul>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 mt-8 text-sm col-span-full">
        &copy; 2025 Bilal Shop. All rights reserved.
      </div>
    </footer>
  );
}
