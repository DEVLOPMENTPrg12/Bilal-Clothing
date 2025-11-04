import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { clearCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Swal from "sweetalert2";

export default function CheckoutPage() {
  const cartItems = useSelector((state) => state.cart.items);
  const total = cartItems.reduce(
    (acc, item) => acc + (item.productId?.price || 0) * item.quantity,
    0
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    phone: "",
    city: "",
  });

  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await fetch("https://countriesnow.space/api/v0.1/countries/cities", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ country: "Morocco" }),
        });
        const data = await res.json();
        if (data.data) setCities(data.data.sort());
      } catch (error) {
        console.error("Error loading cities:", error);
        setCities([
          "Casablanca", "Rabat", "Marrakech", "Fès", "Tangier",
          "Agadir", "Oujda", "Laâyoune", "Dakhla", "Meknès",
          "Tétouan", "Kénitra",
        ]);
      }
    };
    fetchCities();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    setLoading(true);
    try {
      const orderData = {
        ...formData,
        items: cartItems.map((item) => ({
          productId: item.productId._id,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
        })),
        total,
      };

      const res = await api.post("/orders", orderData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      dispatch(clearCart());

      await Swal.fire({
        icon: "success",
        title: "Order confirmed!",
        text: "Your order has been placed successfully.",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate(`/order-success/${res.data._id}`);
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an error confirming your order.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex-grow flex items-start justify-center pt-28 pb-10">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 max-w-6xl">
          {/* 🧾 Shipping form */}
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Shipping Information</h2>

            {["fullName", "address", "phone"].map((field) => (
              <div className="mb-4" key={field}>
                <label className="block mb-2 font-medium">{field === "fullName" ? "Full Name" : field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input
                  type={field === "phone" ? "tel" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  className="w-full border px-3 py-2 rounded focus:ring focus:ring-green-300"
                />
              </div>
            ))}

            <div className="mb-4">
              <label className="block mb-2 font-medium">City</label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded focus:ring focus:ring-green-300"
              >
                <option value="">-- Select your city --</option>
                {cities.map((city, i) => (
                  <option key={i} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={cartItems.length === 0 || loading}
              className={`w-full mt-4 py-2 rounded text-white text-lg font-semibold transition ${
                cartItems.length === 0 || loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loading ? "Processing..." : "Confirm Order"}
            </button>
          </form>

          {/* 🛒 Cart summary */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Order Summary</h2>
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cartItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between mb-3">
                  <img
                    src={
                      item.productId?.images?.[0]
                        ? item.productId.images[0].startsWith("http")
                          ? item.productId.images[0]
                          : `http://localhost:5000${item.productId.images[0].startsWith("/") ? item.productId.images[0] : "/" + item.productId.images[0]}`
                        : "/placeholder.png"
                    }
                    alt={item.productId?.name || "Product image"}
                    className="w-16 h-16 object-cover rounded mr-3"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">{item.productId?.name}</p>
                    <p className="text-sm text-gray-600">Size: {item.size}</p>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      Color:
                      <span
                        className="inline-block w-4 h-4 rounded-full border"
                        style={{ backgroundColor: item.color }}
                      ></span>
                    </p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">{(item.productId?.price || 0) * item.quantity} MAD</p>
                </div>
              ))
            )}
            <hr className="my-4" />
            <h3 className="text-xl font-semibold text-right">Total: {total} MAD</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
