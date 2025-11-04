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

        <ul className={`${isOpen ? "block" : "hidden"} md:flex md:items-center md:space-x-8 absolute md:static left-0 w-full md:w-auto bg-white md:bg-transparent text-center md:text-left py-4 md:py-0 top-16 md:top-0 shadow-md md:shadow-none`}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/shop">Shop</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          {user && <li><Link to="/myorders">My Orders</Link></li>}
        </ul>

        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="relative">
              {/* Profile image/button */}
              <button
                onClick={() => setIsProfileOpen(prev => !prev)}
                className="w-10 h-10 rounded-full border-2 border-purple-600 flex items-center justify-center text-purple-800 font-bold text-lg"
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
              className="bg-purple-100 text-purple-800 py-2 px-4 rounded-full font-medium"
            >
              Login
            </Link>
          )}

          {/* Cart */}
         <button
  className="bg-purple-600 text-white py-2 px-4 rounded-full flex items-center"
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
