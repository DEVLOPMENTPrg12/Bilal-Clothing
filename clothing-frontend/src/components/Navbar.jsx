import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CartModal from "../pages/CartPage";
import { useSelector } from "react-redux";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const cartItems = useSelector(state => state.cart.items);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Invalid JSON in localStorage user:", err);
        setUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          <span className="text-purple-800">Bilal</span> Clothing
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-700 md:hidden focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex md:items-center md:space-x-8">
          <li><Link to="/" className="text-gray-700 hover:text-purple-800 transition">Home</Link></li>
          <li><Link to="/shop" className="text-gray-700 hover:text-purple-800 transition">Shop</Link></li>
          <li><Link to="/blog" className="text-gray-700 hover:text-purple-800 transition">Blog</Link></li>
          <li><Link to="/contact" className="text-gray-700 hover:text-purple-800 transition">Contact</Link></li>
          {user && <li><Link to="/myorders" className="text-gray-700 hover:text-purple-800 transition">My Orders</Link></li>}
        </ul>

        {/* Mobile Menu */}
        <ul className={`${isOpen ? "block" : "hidden"} md:hidden absolute left-0 w-full bg-white text-center py-4 top-16 shadow-md`}>
          <li className="py-2"><Link to="/" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-purple-800 transition">Home</Link></li>
          <li className="py-2"><Link to="/shop" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-purple-800 transition">Shop</Link></li>
          <li className="py-2"><Link to="/blog" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-purple-800 transition">Blog</Link></li>
          <li className="py-2"><Link to="/contact" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-purple-800 transition">Contact</Link></li>
          {user && <li className="py-2"><Link to="/myorders" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-purple-800 transition">My Orders</Link></li>}
          {/* Mobile Cart and Auth */}
          <li className="py-2">
            <button
              onClick={() => { setIsCartOpen(true); setIsOpen(false); }}
              className="text-gray-700 hover:text-purple-800 transition"
            >
              🛒 Cart ({cartItems?.length || 0})
            </button>
          </li>
          {user ? (
            <li className="py-2">
              <button
                onClick={() => { handleLogout(); setIsOpen(false); }}
                className="text-red-600 hover:text-red-800 transition"
              >
                Logout
              </button>
            </li>
          ) : (
            <li className="py-2">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="text-purple-800 hover:text-purple-600 transition"
              >
                Login
              </Link>
            </li>
          )}
        </ul>

        {/* Desktop Profile and Cart */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="relative">
              {/* Profile image/button */}
              <button
                onClick={() => setIsProfileOpen(prev => !prev)}
                className="w-10 h-10 rounded-full border-2 border-purple-600 flex items-center justify-center text-purple-800 font-bold text-lg hover:bg-purple-50 transition"
              >
                {user.name.charAt(0).toUpperCase()}
              </button>

              {/* Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4">
                  <button
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    ❌
                  </button>

                  <div className="flex flex-col items-center space-y-2 mb-2">
                    <img
                      src={user.profilePicture || "/png-clipart-profile-icon-circled-user-icon-icons-logos-emojis-users.png"}
                      alt="Profile"
                      className="w-16 h-16 rounded-full border-2 border-purple-600"
                    />
                    <p className="text-lg font-semibold text-gray-800">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>

                  <hr className="my-2 border-gray-200" />

                  <button
                    className="w-full bg-red-100 text-red-600 hover:bg-red-200 py-2 rounded-lg font-medium transition"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-purple-100 text-purple-800 py-2 px-4 rounded-full font-medium hover:bg-purple-200 transition"
            >
              Login
            </Link>
          )}

          {/* Cart */}
          <button
            className="bg-purple-600 text-white py-2 px-4 rounded-full flex items-center hover:bg-purple-700 transition"
            onClick={() => setIsCartOpen(true)}
          >
            🛒 Cart ({cartItems?.length || 0})
          </button>
        </div>
      </div>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </nav>
  );
}
