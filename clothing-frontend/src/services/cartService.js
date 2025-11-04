import axios from "axios";

const API_URL = "http://localhost:5000/api/cart";

const getToken = () => localStorage.getItem("token");

// 🟢 جلب السلة من الـ backend
export const fetchCart = async () => {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.data;
};

// 🟡 إضافة منتج للسلة مع الحجم واللون
export const addToCartAPI = async (productId, quantity = 1, size, color) => {
  const res = await axios.post(
    `${API_URL}/add`,
    { productId, quantity, size, color },
    {
      headers: { Authorization: `Bearer ${getToken()}` },
    }
  );
  return res.data;
};

// 🔴 حذف منتج من السلة (من الـ backend)
export const removeFromCartAPI = async ({ productId, size, color }) => {
  const res = await axios.delete(`${API_URL}/remove`, {
    headers: { Authorization: `Bearer ${getToken()}` },
    data: { productId, size, color },
  });
  return res.data;
};
