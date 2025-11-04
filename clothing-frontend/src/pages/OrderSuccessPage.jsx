import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

export default function OrderSuccessPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await api.get(`/orders/${orderId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setOrder(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        Chargement de votre commande...
      </div>
    );

  if (!order)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600 font-semibold">
        Commande introuvable.
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8 border border-gray-200">
        {/* ✅ En-tête de confirmation */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            Commande confirmée avec succès 🎉
          </h1>
          <p className="text-gray-500 mt-1">
            Merci pour votre achat, <span className="font-semibold">{order.fullName}</span> !
          </p>
        </div>

        {/* ✅ Détails de la commande */}
        <div className="border-t border-gray-200 pt-6 space-y-3 text-gray-700">
          <h2 className="text-xl font-semibold mb-2">🧾 Détails de la commande</h2>
          <p><strong>ID de commande :</strong> {order._id}</p>
          <p><strong>Nom complet :</strong> {order.fullName}</p>
          <p><strong>Adresse :</strong> {order.address}, {order.city}</p>
          <p><strong>Téléphone :</strong> {order.phone}</p>
          <p>
            <strong>Total :</strong>{" "}
            <span className="text-green-600 font-semibold">{order.total} MAD</span>
          </p>
        </div>

        {/* ✅ Produits commandés */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-3">🛍️ Produits commandés :</h3>
          <div className="space-y-4">
            {order.items.map((item, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-50 border rounded-lg p-3 hover:shadow-sm transition"
              >
                <img
                  src={
                    item.productId?.images?.[0]
                      ? `http://localhost:5000${item.productId.images[0]}`
                      : "/placeholder.png"
                  }
                  alt={item.productId?.name}
                  className="w-20 h-20 object-cover rounded mr-4 border"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">
                    {item.productId?.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    Quantité: {item.quantity} | Taille: {item.size || "—"} | Couleur:{" "}
                    {item.color || "—"}
                  </p>
                </div>
                <p className="font-semibold text-green-700">
                  {item.productId?.price * item.quantity} MAD
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ✅ Bouton retour */}
        <div className="text-center mt-10">
          <Link
            to="/"
            className="bg-green-600 text-white px-6 py-3 rounded-md font-medium hover:bg-green-700 transition"
          >
            Retour à l’accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
