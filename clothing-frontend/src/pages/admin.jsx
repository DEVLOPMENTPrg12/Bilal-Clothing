import React, { useEffect, useState } from "react";
import api from "../services/api";
import { BarChart2, Menu, Box, User, Tag, ShoppingBag, Mail } from "lucide-react"; // 🔹 import Mail
import ProductsPage from "../Dashboard/ProductsPage";
import UsersPage from "../Dashboard/Users"; 
import CategoryPage from "../Dashboard/CategoryPage";
import OrdersPage from "../Dashboard/OrdersPage";
import ContactPage from "../Dashboard/ContactPage"; // 🔹 import ContactPage

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalProducts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/admin/dashboard");
        setStats(res.data.stats);
      } catch (err) {
        console.error(err);
        alert("Error fetching dashboard data.");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="p-10 text-center">Loading dashboard...</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? "w-64" : "w-20"} bg-white shadow-md transition-all duration-300`}
      >
        <div className="p-4 border-b flex items-center justify-between">
          <h1 className="text-xl font-bold text-blue-600">
            {sidebarOpen ? "Bilal Clothing" : "BC"}
          </h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 hover:bg-gray-100 rounded-md"
          >
            <Menu size={20} />
          </button>
        </div>

        <nav className="p-4 space-y-2 text-gray-700">
          <button
            onClick={() => setActiveSection("dashboard")}
            className="flex items-center gap-3 p-2 rounded-md hover:bg-blue-50 hover:text-blue-600 w-full"
          >
            <BarChart2 size={20} /> {sidebarOpen && <span>Dashboard</span>}
          </button>

          <button
            onClick={() => setActiveSection("products")}
            className="flex items-center gap-3 p-2 rounded-md hover:bg-blue-50 hover:text-blue-600 w-full"
          >
            <Box size={20} /> {sidebarOpen && <span>Products</span>}
          </button>

          <button
            onClick={() => setActiveSection("category")}
            className="flex items-center gap-3 p-2 rounded-md hover:bg-blue-50 hover:text-blue-600 w-full"
          >
            <Tag size={20} /> {sidebarOpen && <span>Category</span>}
          </button>

          <button
            onClick={() => setActiveSection("orders")}
            className="flex items-center gap-3 p-2 rounded-md hover:bg-blue-50 hover:text-blue-600 w-full"
          >
            <ShoppingBag size={20} /> {sidebarOpen && <span>Orders</span>}
          </button>

          <button
            onClick={() => setActiveSection("users")}
            className="flex items-center gap-3 p-2 rounded-md hover:bg-blue-50 hover:text-blue-600 w-full"
          >
            <User size={20} /> {sidebarOpen && <span>Users</span>}
          </button>

          {/* 🔹 Contact */}
          <button
            onClick={() => setActiveSection("contact")}
            className="flex items-center gap-3 p-2 rounded-md hover:bg-blue-50 hover:text-blue-600 w-full"
          >
            <Mail size={20} /> {sidebarOpen && <span>Contact</span>}
          </button>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm border-b p-4 flex justify-between items-center">
          <h2 className="font-semibold text-gray-700 text-lg">Admin Panel</h2>
        </header>

        <main className="p-6 space-y-6 overflow-y-auto">
          {activeSection === "dashboard" && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 border shadow-sm flex justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Users</p>
                  <h3 className="text-2xl font-semibold">{stats.totalUsers}</h3>
                </div>
                <Box className="text-blue-500 w-8 h-8" />
              </div>

              <div className="bg-white rounded-lg p-4 border shadow-sm flex justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Orders</p>
                  <h3 className="text-2xl font-semibold">{stats.totalOrders}</h3>
                </div>
                <Box className="text-green-500 w-8 h-8" />
              </div>

              <div className="bg-white rounded-lg p-4 border shadow-sm flex justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Products</p>
                  <h3 className="text-2xl font-semibold">{stats.totalProducts}</h3>
                </div>
                <Box className="text-yellow-500 w-8 h-8" />
              </div>
            </div>
          )}

          {activeSection === "products" && <ProductsPage />}
          {activeSection === "users" && <UsersPage />} 
          {activeSection === "category" && <CategoryPage />}
          {activeSection === "orders" && <OrdersPage />}
          {activeSection === "contact" && <ContactPage />} {/* 🔹 affichage Contact */}
        </main>
      </div>
    </div>
  );
}
