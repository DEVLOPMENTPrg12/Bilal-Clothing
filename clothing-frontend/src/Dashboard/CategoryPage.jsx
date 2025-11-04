import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Plus, Trash2 } from "lucide-react";
import Swal from "sweetalert2"; // ✅ استيراد SweetAlert2

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🟢 Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await api.get("/category"); 
      setCategories(res.data);
    } catch (err) {
      console.error(err);
      setError("Erreur lors du chargement des catégories.");
      Swal.fire({
        icon: "error",
        title: "Erreur !",
        text: "Impossible de charger les catégories.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // 🟢 Add category
  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
      return Swal.fire({
        icon: "warning",
        title: "Attention !",
        text: "Veuillez entrer un nom de catégorie.",
      });
    }
    try {
      const res = await api.post("/category", { name: newCategory });
      setCategories([...categories, res.data]);
      setNewCategory("");
      Swal.fire({
        icon: "success",
        title: "Succès !",
        text: "Catégorie ajoutée avec succès.",
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Erreur !",
        text: "Impossible d'ajouter la catégorie.",
      });
    }
  };

  // 🟢 Delete category avec confirmation
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Cette action est irréversible.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Oui, supprimer !",
      cancelButtonText: "Annuler",
    });

    if (!result.isConfirmed) return;

    try {
      await api.delete(`/category/${id}`);
      setCategories(categories.filter((c) => c._id !== id));
      Swal.fire({
        icon: "success",
        title: "Supprimée !",
        text: "Catégorie supprimée avec succès.",
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Erreur !",
        text: "Problème lors de la suppression.",
      });
    }
  };

  if (loading) return <p className="p-4 text-center">Chargement...</p>;

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Gestion des Catégories</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Ajouter nouvelle catégorie */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Nouvelle catégorie"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="border p-2 rounded flex-1 focus:outline-blue-500"
        />
        <button
          onClick={handleAddCategory}
          className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <Plus size={18} /> Ajouter
        </button>
      </div>

      {/* Liste des catégories */}
      {categories.length === 0 ? (
        <p>Aucune catégorie trouvée.</p>
      ) : (
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">#</th>
              <th className="p-2 border">Nom</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, i) => (
              <tr key={cat._id} className="hover:bg-gray-50">
                <td className="p-2 border">{i + 1}</td>
                <td className="p-2 border">{cat.name}</td>
                <td className="p-2 border text-center">
                  <button
                    onClick={() => handleDelete(cat._id)}
                    className="text-red-500 hover:text-red-700 flex items-center justify-center gap-1"
                  >
                    <Trash2 size={16} /> Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
