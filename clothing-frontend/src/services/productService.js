import axios from "axios";

const API_URL = "http://localhost:5000/api/products"; // route backend

export const getProducts = async () => {
  return await axios.get(API_URL);
};

export const getProduct = async (id) => {
  return await axios.get(`${API_URL}/${id}`);
};

export const addProduct = async (data, token) => {
  return await axios.post(API_URL, data, { headers: { Authorization: `Bearer ${token}` } });
};

export const updateProduct = async (id, data, token) => {
  return await axios.put(`${API_URL}/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });
};

export const deleteProduct = async (id, token) => {
  return await axios.delete(`${API_URL}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
};
