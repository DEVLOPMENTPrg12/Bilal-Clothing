import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItemFromCart, clearCart } from "../redux/cartSlice";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const getImageSrc = (url) =>
  url ? (url.startsWith("http") ? url : `http://localhost:5000${url.startsWith("/") ? url : "/" + url}`) : "/placeholder.png";

export default function CartModal({ isOpen, onClose }) {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (acc, item) => acc + item.productId.price * item.quantity,
    0
  );

  if (!isOpen) return null;

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
    toast.success("Proceeding to checkout!");
  };

  const handleRemoveItem = (item) => {
    dispatch(removeItemFromCart({
      productId: item.productId._id,
      size: item.size,
      color: item.color,
    }));
    toast.info(`${item.productId.name} removed from cart`);
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.warning("Cart cleared!");
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-end">
        <div className="bg-white w-80 md:w-96 h-full shadow-xl p-6 overflow-y-auto relative">
          <button className="absolute top-4 right-4 text-gray-700 text-2xl font-bold" onClick={onClose}>&times;</button>
          <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>

          {cartItems.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            <>
              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex items-center border p-3 rounded-lg shadow-sm bg-white">
                    <img src={getImageSrc(item.productId.images?.[0])} alt={item.productId.name} className="w-16 h-16 object-cover rounded-md mr-3"/>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{item.productId.name}</h3>
                      <p className="text-gray-600 text-sm">Size: {item.size}</p>
                      <p className="text-gray-600 text-sm">Color: <span className="inline-block w-4 h-4 rounded-full border" style={{backgroundColor: item.color}}></span></p>
                      <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                      <p className="text-purple-700 font-bold text-sm">Price: ${item.productId.price}</p>
                    </div>
                    <button className="text-red-600 hover:text-red-800" onClick={() => handleRemoveItem(item)}>
                      <TrashIcon className="w-6 h-6"/>
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-col space-y-3">
                <h3 className="text-xl font-bold">Total: ${total.toFixed(2)}</h3>
                <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700" onClick={handleClearCart}>Clear Cart</button>
                <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" onClick={handleCheckout}>Checkout</button>
              </div>
            </>
          )}
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    </>
  );
}
