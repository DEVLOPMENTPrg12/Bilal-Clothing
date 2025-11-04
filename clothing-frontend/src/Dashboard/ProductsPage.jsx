import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Eye, Trash2, Edit2, Plus, Search } from "lucide-react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // 🆕 Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // ممكن تختار عدد المنتجات لكل صفحة

  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    description: "",
    images: "",
    sizes: "",
    colors: "",
    tags: "",
    category: "",
    stock: "",
  });

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const getImageSrc = (url) => {
    if (!url) return "/placeholder.png";
    return url.startsWith("http")
      ? url
      : `http://localhost:5000${url.startsWith("/") ? url : "/" + url}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          api.get("/products"),
          api.get("/category"),
        ]);
        setProducts(prodRes.data);
        setCategories(catRes.data);
      } catch (err) {
        console.error(err);
        alert("Erreur lors du chargement des données.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce produit ?")) return;
    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
      alert("Échec de la suppression.");
    }
  };

  const openModal = (product = null) => {
    setEditingProduct(product);
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        description: product.description,
        images: product.images.join(","),
        sizes: product.sizes.join(","),
        colors: product.colors.join(","),
        tags: product.tags.join(","),
        category: product.category?._id || "",
        stock: Object.entries(product.stock || {})
          .map(([k, v]) => `${k}:${v}`)
          .join(","),
      });
    } else {
      setFormData({
        name: "",
        price: 0,
        description: "",
        images: "",
        sizes: "",
        colors: "",
        tags: "",
        category: "",
        stock: "",
      });
    }
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      name: formData.name,
      price: parseFloat(formData.price),
      description: formData.description,
      images: formData.images.split(",").map((i) => i.trim()),
      sizes: formData.sizes.split(",").map((s) => s.trim()),
      colors: formData.colors.split(",").map((c) => c.trim()),
      tags: formData.tags.split(",").map((t) => t.trim()),
      category: formData.category,
      stock: Object.fromEntries(
        formData.stock.split(",").map((s) => {
          const [size, qty] = s.split(":");
          return [size.trim(), parseInt(qty)];
        })
      ),
    };

    try {
      if (editingProduct) {
        const res = await api.put(`/products/${editingProduct._id}`, body);
        setProducts(products.map((p) => (p._id === editingProduct._id ? res.data : p)));
      } else {
        const res = await api.post("/products", body);
        setProducts([...products, res.data]);
      }
      setModalOpen(false);
      setFile(null);
    } catch (err) {
      console.error("Erreur:", err.response ? err.response.data : err);
      alert("Erreur lors de l'enregistrement du produit.");
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    const data = new FormData();
    data.append("file", file);
    setUploading(true);
    try {
      const res = await api.post("/products/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (editingProduct) {
        setFormData({ ...formData, images: res.data.path });
      } else {
        setFormData({
          ...formData,
          images: formData.images
            ? formData.images + "," + res.data.path
            : res.data.path,
        });
      }
      setFile(null);
      alert("Image uploaded!");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  // ✅ Search + safe handling
  const filteredProducts = products.filter((p) => {
    const term = searchTerm.toLowerCase();
    return (
      p.name?.toLowerCase().includes(term) ||
      p.description?.toLowerCase().includes(term) ||
      (typeof p.category === "string"
        ? p.category.toLowerCase().includes(term)
        : p.category?.name?.toLowerCase().includes(term)) ||
      p.tags?.some((t) => t.toLowerCase().includes(term)) ||
      p.colors?.some((c) => c.toLowerCase().includes(term)) ||
      p.sizes?.some((s) => s.toLowerCase().includes(term)) ||
      String(p.price).includes(term)
    );
  });

  // 🧮 Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  if (loading) return <div className="p-6 text-center">Chargement...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Header + Search + Ajouter */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-3">
        <h2 className="text-xl font-semibold text-gray-700">Produits</h2>

        <div className="flex items-center border rounded px-2 py-1 w-full md:w-1/3">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un produit..."
            className="flex-1 px-2 py-1 outline-none"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // reset page on search
            }}
          />
        </div>

        <button
          onClick={() => openModal()}
          className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          <Plus size={16} /> Ajouter
        </button>
      </div>

      {/* Table */}
      <table className="min-w-full border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Nom</th>
            <th className="px-4 py-2">Prix</th>
            <th className="px-4 py-2">Catégorie</th>
            <th className="px-4 py-2">Stock</th>
            <th className="px-4 py-2">Couleurs</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.length ? (
            currentProducts.map((p) => (
              <tr key={p._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">
                  <img
                    src={getImageSrc(p.images[0])}
                    alt={p.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2 font-medium">{p.name}</td>
                <td className="px-4 py-2">{p.price} DH</td>
                <td className="px-4 py-2">{p.category?.name || "—"}</td>
                <td className="px-4 py-2">
                  {Object.values(p.stock || {}).reduce((a, b) => a + b, 0)}
                </td>
                <td className="px-4 py-2 flex gap-1">
                  {p.colors?.map((c, i) => (
                    <span
                      key={i}
                      className="w-5 h-5 rounded-full border"
                      style={{ backgroundColor: c }}
                      title={c}
                    ></span>
                  ))}
                </td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => setSelectedProduct(p)}
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <Eye size={16} /> Voir
                  </button>
                  <button
                    onClick={() => openModal(p)}
                    className="text-yellow-600 hover:text-yellow-800 flex items-center gap-1"
                  >
                    <Edit2 size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="text-red-600 hover:text-red-800 flex items-center gap-1"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-4 text-gray-500">
                Aucun produit.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Précédent
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Suivant
          </button>
        </div>
      )}

      {/* Voir Produit Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg relative">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-lg"
            >
              ✖
            </button>
            <h3 className="text-2xl font-bold mb-4">{selectedProduct.name}</h3>
            <img
              src={getImageSrc(selectedProduct.images[0])}
              alt={selectedProduct.name}
              className="w-full h-56 object-cover rounded mb-4"
            />
            <p><strong>Prix:</strong> {selectedProduct.price} DH</p>
            <p><strong>Catégorie:</strong> {selectedProduct.category?.name || "—"}</p>
            <p><strong>Description:</strong> {selectedProduct.description}</p>
            <p><strong>Tailles:</strong> {selectedProduct.sizes?.join(", ")}</p>
            <p>
              <strong>Couleurs:</strong>
              <span className="flex gap-1 mt-1">
                {selectedProduct.colors?.map((c, i) => (
                  <span
                    key={i}
                    className="w-5 h-5 rounded-full border"
                    style={{ backgroundColor: c }}
                    title={c}
                  ></span>
                ))}
              </span>
            </p>
            <p><strong>Tags:</strong> {selectedProduct.tags?.join(", ")}</p>
            <p>
              <strong>Stock:</strong>{" "}
              {Object.entries(selectedProduct.stock || {})
                .map(([k, v]) => `${k}:${v}`)
                .join(", ")}
            </p>
          </div>
        </div>
      )}

      {/* Ajouter / Modifier Produit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-lg relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-lg"
            >
              ✖
            </button>
            <h3 className="text-xl font-semibold mb-4">
              {editingProduct ? "Modifier Produit" : "Ajouter Produit"}
            </h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Nom"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="border p-2 rounded"
                required
              />
              <input
                type="number"
                placeholder="Prix"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="border p-2 rounded"
                required
              />
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="border p-2 rounded"
              >
                <option value="">Choisir catégorie</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Tailles (S,M,L)"
                value={formData.sizes}
                onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                className="border p-2 rounded"
              />

              {/* Color Picker */}
              <div className="flex flex-col gap-1">
                <label>Couleurs:</label>
                <div className="flex gap-2 flex-wrap">
                  {formData.colors.split(",").map((color, idx) => (
                    <input
                      key={idx}
                      type="color"
                      value={color || "#000000"}
                      onChange={(e) => {
                        const newColors = formData.colors.split(",");
                        newColors[idx] = e.target.value;
                        setFormData({ ...formData, colors: newColors.join(",") });
                      }}
                      className="w-10 h-10 border rounded"
                    />
                  ))}
                  <button
                    type="button"
                    className="px-2 bg-gray-200 rounded"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        colors: formData.colors ? formData.colors + ",#000000" : "#000000",
                      })
                    }
                  >
                    +
                  </button>
                </div>
              </div>

              <input
                type="text"
                placeholder="Tags (tag1,tag2)"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Stock (S:10,M:5)"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="border p-2 rounded"
              />

              {/* Upload Image */}
              <input type="file" onChange={handleFileChange} />
              <button
                type="button"
                onClick={handleUpload}
                disabled={uploading || !file}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                {uploading ? "Uploading..." : "Upload Image"}
              </button>

              {/* Show uploaded images */}
              <div className="flex gap-2 mt-2 col-span-2 flex-wrap">
                {formData.images.split(",").map((img, i) => (
                  <img
                    key={i}
                    src={getImageSrc(img)}
                    alt={`img-${i}`}
                    className="w-16 h-16 object-cover rounded"
                  />
                ))}
              </div>

              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="border p-2 rounded col-span-2"
              />

              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded col-span-2"
              >
                {editingProduct ? "Modifier" : "Ajouter"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
