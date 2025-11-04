import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCart, addToCartAPI, removeFromCartAPI } from "../services/cartService";

// 🟢 تحميل السلة من الـ backend
export const loadCart = createAsyncThunk("cart/loadCart", async () => {
  return await fetchCart();
});

// 🟡 إضافة منتج للـ backend
export const addItemToCart = createAsyncThunk(
  "cart/addItem",
  async ({ productId, quantity = 1, size, color }) => {
    return await addToCartAPI(productId, quantity, size, color);
  }
);

// 🔴 حذف منتج من الـ backend
export const removeItemFromCart = createAsyncThunk(
  "cart/removeItem",
  async ({ productId, size, color }) => {
    return await removeFromCartAPI({ productId, size, color });
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {
    clearCart(state) {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // تحميل السلة
      .addCase(loadCart.fulfilled, (state, action) => {
        state.items = action.payload?.items || [];
      })
      // إضافة منتج
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
      })
      // حذف منتج
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
      })
      // التعامل مع الأخطاء
      .addCase(loadCart.rejected, (state, action) => {
        state.error = "Failed to load cart";
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.error = "Failed to add item to cart";
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.error = "Failed to remove item from cart";
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
