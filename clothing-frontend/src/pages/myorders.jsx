import React, { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const res = await api.get("/orders/myorders");
        setOrders(res.data);
      } catch (err) {
        console.error(err);
        alert("Error loading your orders.");
      } finally {
        setLoading(false);
      }
    };
    fetchMyOrders();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[80vh] bg-gray-50">
        <p className="text-gray-600 text-lg">Loading your orders...</p>
      </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />

      {/* Add spacing so content doesn't overlap with Navbar */}
      <div className="flex flex-1 justify-center items-start px-4 py-10 mt-24">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md border border-gray-200 p-6 sm:p-10">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-b pb-3 text-center">
            🧾 My Orders
          </h2>

          {orders.length === 0 ? (
            <div className="text-center py-10 text-gray-500 text-lg">
              You haven't placed any orders yet.
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-shadow duration-200 bg-white"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3">
                    <div>
                      <p className="text-sm text-gray-500">
                        Order #{order._id.slice(-6)}
                      </p>
                      <p className="text-gray-700 font-medium">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="mt-2 sm:mt-0">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          order.fulfillmentStatus === "delivered"
                            ? "bg-green-100 text-green-700"
                            : order.fulfillmentStatus === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {order.fulfillmentStatus}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-3">
                    <p className="text-gray-800 font-semibold text-lg mb-2 text-center sm:text-left">
                      Total: <span className="text-blue-600">{order.total} DH</span>
                    </p>

                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-gray-700 font-medium mb-2">
                        Ordered Products:
                      </p>
                      <ul className="space-y-1 text-sm text-gray-600">
                        {order.items.map((item, i) => (
                          <li
                            key={i}
                            className="flex justify-between border-b border-gray-100 py-1 last:border-none"
                          >
                            <span>
                              {item.productId?.name || "Unknown Product"} × {item.quantity}
                            </span>
                            <span>
                              {item.productId?.price ? `${item.productId.price} DH` : "N/A"}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
