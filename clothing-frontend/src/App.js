import { Routes, Route } from "react-router-dom";
import MainLayout from "./pages/MainLayout";
import CheckoutLayout from "./components/CheckoutLayout";
import CheckoutPage from "./pages/CheckoutPage";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import AdminDashboard from "./pages/admin";
import ProductList from "./pages/Product";
import ProtectedRoute from "./middleware/ProtectedRoute";
import MyOrdersPage from "./pages/myorders";
import { Toaster } from "react-hot-toast";

import OrderSuccessPage from "./pages/OrderSuccessPage"; // ✅ استدعاء الصفحة
import BlogPage from "./components/BlogPage";
import BlogDetail from "./components/BlogDetail";
import ContactPage from "./components/ContactPage";


function App() {
  return (
    <Routes>
      <Route path="/blog/:id" element={<BlogDetail />} />
      {/* الصفحات العادية */}
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />
      <Route
  path="/myorders"
  element={
    <ProtectedRoute>
    
        <MyOrdersPage />
      
    </ProtectedRoute>
  }
/>


       <Route
  path="/checkout"
  element={
    <ProtectedRoute>
    
        <CheckoutPage />
    
    </ProtectedRoute>
  }
/>
<Route
        path="/order-success/:orderId"
        element={
          <ProtectedRoute>
            <OrderSuccessPage />
          </ProtectedRoute>
        }
      />


      <Route path="/shop" element={<ProductList />} />
      <Route path="/blog" element={<BlogPage/>} />
      <Route path="/contact" element={<ContactPage/>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* 🔐 صفحة الأدمن محمية */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
