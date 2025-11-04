import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Eye, X, RefreshCw, Search } from "lucide-react";
import Swal from "sweetalert2";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders");
      setOrders(res.data);
    } catch (err) {
      console.error(err);
      Swal.fire("Erreur", "Erreur lors du chargement des commandes", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleSaveStatus = async () => {
    const result = await Swal.fire({
      title: "Voulez-vous vraiment mettre à jour ces statuts ?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Oui, sauvegarder",
      cancelButtonText: "Annuler",
    });

    if (result.isConfirmed) {
      try {
        await api.put(`/orders/${selectedOrder._id}/status`, {
          paymentStatus: selectedOrder.paymentStatus,
          fulfillmentStatus: selectedOrder.fulfillmentStatus,
        });
        Swal.fire("✅ Mis à jour !", "Les statuts ont été modifiés avec succès.", "success");
        setSelectedOrder(null);
        fetchOrders();
      } catch (err) {
        console.error(err);
        Swal.fire("Erreur", "Erreur lors de la mise à jour du statut !", "error");
      }
    }
  };

  if (loading)
    return <div className="text-center p-8 text-lg">Chargement...</div>;

  // ✅ Filtrage (Search)
  const filteredOrders = orders.filter((o) => {
    const term = searchTerm.toLowerCase();
    return (
      o.fullName?.toLowerCase().includes(term) ||
      o.phone?.toLowerCase().includes(term) ||
      o.city?.toLowerCase().includes(term) ||
      o.address?.toLowerCase().includes(term) ||
      o.paymentStatus?.toLowerCase().includes(term) ||
      o.fulfillmentStatus?.toLowerCase().includes(term) ||
      String(o.total).includes(term) ||
      new Date(o.createdAt).toLocaleDateString().includes(term)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-16 px-4 md:px-10">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-3">
          <h2 className="text-2xl font-semibold">📦 Liste des Commandes</h2>

          <div className="flex items-center gap-2">
            {/* 🔍 Champ de recherche */}
            <div className="relative">
              <Search className="absolute left-2 top-2.5 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border pl-8 pr-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>

            <button
              onClick={fetchOrders}
              className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition"
            >
              <RefreshCw size={18} />
              Rafraîchir
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm md:text-base">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-3 text-left border">#</th>
                <th className="p-3 text-left border">Client</th>
                <th className="p-3 text-left border">Téléphone</th>
                <th className="p-3 text-left border">Ville</th>
                <th className="p-3 text-left border">Total</th>
                <th className="p-3 text-left border">Paiement</th>
                <th className="p-3 text-left border">Livraison</th>
                <th className="p-3 text-left border">Date</th>
                <th className="p-3 text-center border">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center p-4 text-gray-500 italic">
                    Aucune commande trouvée
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order, index) => (
                  <tr key={order._id} className="border hover:bg-gray-50 transition">
                    <td className="p-3 border">{index + 1}</td>
                    <td className="p-3 border font-medium">{order.fullName}</td>
                    <td className="p-3 border">{order.phone}</td>
                    <td className="p-3 border">{order.city}</td>
                    <td className="p-3 border font-semibold text-green-600">
                      {order.total} DH
                    </td>
                    <td
                      className={`p-3 border capitalize font-medium ${
                        order.paymentStatus === "paid"
                          ? "text-green-600"
                          : order.paymentStatus === "failed"
                          ? "text-red-500"
                          : "text-yellow-500"
                      }`}
                    >
                      {order.paymentStatus}
                    </td>
                    <td
                      className={`p-3 border capitalize font-medium ${
                        order.fulfillmentStatus === "shipped"
                          ? "text-green-600"
                          : order.fulfillmentStatus === "cancelled"
                          ? "text-red-500"
                          : "text-yellow-500"
                      }`}
                    >
                      {order.fulfillmentStatus === "pending"
                        ? "En cours"
                        : order.fulfillmentStatus === "shipped"
                        ? "Livré"
                        : "Annulé"}
                    </td>
                    <td className="p-3 border">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3 text-center border">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-blue-600 hover:underline flex items-center justify-center gap-1 mx-auto"
                      >
                        <Eye size={18} /> Détails
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 animate-fadeIn">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg relative animate-slideUp max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-semibold mb-4 border-b pb-2">
              🧾 Détails de la commande
            </h3>

            <div className="space-y-2 text-gray-800">
              <p>
                <strong>Nom du client:</strong> {selectedOrder.fullName}
              </p>
              <p>
                <strong>Téléphone:</strong> {selectedOrder.phone}
              </p>
              <p>
                <strong>Adresse:</strong> {selectedOrder.address}, {selectedOrder.city}
              </p>
              <p>
                <strong>Total:</strong>{" "}
                <span className="text-green-600 font-semibold">{selectedOrder.total} DH</span>
              </p>

              <div>
                <label className="block font-medium mb-1">Statut Paiement :</label>
                <select
                  value={selectedOrder.paymentStatus}
                  onChange={(e) =>
                    setSelectedOrder({ ...selectedOrder, paymentStatus: e.target.value })
                  }
                  className="border rounded px-2 py-1 w-full"
                >
                  <option value="pending">En attente</option>
                  <option value="paid">Payé</option>
                  <option value="failed">Échoué</option>
                </select>
              </div>

              <div>
                <label className="block font-medium mb-1 mt-2">Statut Livraison :</label>
                <select
                  value={selectedOrder.fulfillmentStatus}
                  onChange={(e) =>
                    setSelectedOrder({ ...selectedOrder, fulfillmentStatus: e.target.value })
                  }
                  className="border rounded px-2 py-1 w-full"
                >
                  <option value="pending">En cours</option>
                  <option value="shipped">Livré</option>
                  <option value="cancelled">Annulé</option>
                </select>
              </div>
            </div>

            <div className="mt-5">
              <h4 className="font-semibold mb-2">🛍️ Produits commandés :</h4>
              <ul className="space-y-2">
                {selectedOrder.items?.map((item, i) => {
                  const price = item.productId?.price || 0;
                  const subtotal = price * item.quantity;
                  return (
                    <li key={i} className="border p-2 rounded flex justify-between items-center">
                      <div>
                        <p className="font-medium">
                          {item.productId?.name || "Produit inconnu"}
                        </p>
                        <p className="text-sm text-gray-600">
                          Couleur: {item.color || "—"} | Taille: {item.size || "—"}
                        </p>
                      </div>
                      <div className="text-right">
                        <p>
                          {item.quantity} × {price} DH
                        </p>
                        <p className="font-semibold text-green-600">= {subtotal} DH</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="flex justify-end mt-6 gap-2 sticky bottom-0 bg-white pt-3 pb-2">
              <button
                onClick={handleSaveStatus}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Sauvegarder
              </button>

              <button
                onClick={() => setSelectedOrder(null)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
