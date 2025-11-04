import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { addItemToCart } from "../redux/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ دالة جلب الصور
const getImageSrc = (url) => {
  if (!url) return "/placeholder.png";
  return url.startsWith("http")
    ? url
    : `http://localhost:5000${url.startsWith("/") ? url : "/" + url}`;
};

// 🟣 ProductCard
function ProductCard({ product, onViewDetail, onAddToCart }) {
  const handleAddToCart = () => {
    onAddToCart({
      productId: product._id,
      productName: product.name,
      quantity: 1,
      size: product.sizes[0],
      color: product.colors[0],
    });
  };

  return (
    <div className="border rounded-lg m-2 w-72 shadow-lg p-3 bg-white hover:shadow-2xl transition-shadow duration-300">
      <img
        src={getImageSrc(product.images[0])}
        alt={product.name}
        className="w-full h-64 object-contain rounded-md bg-gray-100"
      />

      <div className="flex justify-between items-center mt-3">
        <h1 className="font-bold text-lg">{product.name}</h1>
        <span className="text-pink-600 font-semibold">${product.price}</span>
      </div>

      <div className="flex mt-2">
        {product.colors.map((color, index) => (
          <div
            key={index}
            className="rounded-full h-5 w-5 shadow-md mr-2 border"
            style={{ backgroundColor: color }}
          ></div>
        ))}
      </div>

      <div className="flex flex-wrap mt-2">
        {product.sizes.map((size, index) => (
          <p
            key={index}
            className="border text-sm rounded-lg w-10 h-8 px-2 py-1 m-1 flex items-center justify-center"
          >
            {size}
          </p>
        ))}
      </div>

      <div className="flex mt-3">
        <button
          className="bg-gradient-to-r from-red-600 to-pink-500 rounded-full py-2 px-4 text-sm text-white hover:from-red-700 hover:to-pink-600 flex-1 mr-2"
          onClick={() => onViewDetail(product)}
        >
          View Details
        </button>
        <button
          className="bg-purple-600 rounded-full py-2 px-4 text-sm text-white hover:bg-purple-700 flex-1"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

// 🟣 ProductModal
function ProductModal({ product, onClose, onAddToCart }) {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-11/12 md:w-3/4 lg:w-2/3 p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-700 text-2xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2">
            <img
              key={selectedImage}
              src={getImageSrc(selectedImage)}
              alt={product.name}
              className="w-full h-80 object-contain rounded-md transition-all duration-300"
            />
            <div className="flex mt-2 space-x-2">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={getImageSrc(img)}
                  alt={`thumb-${index}`}
                  className={`w-20 h-20 object-contain rounded-md cursor-pointer border-2 bg-gray-100 transition-transform duration-200 ${
                    selectedImage === img
                      ? "border-purple-500 scale-105"
                      : "border-transparent hover:scale-105"
                  }`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 lg:pl-6 mt-4 lg:mt-0">
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <p className="text-purple-700 font-bold text-xl mt-2">
              ${product.price}
            </p>
            <p className="mt-4 text-gray-700">{product.description}</p>

            <div className="flex mt-2">
              {product.colors.map((color, index) => (
                <div
                  key={index}
                  className={`rounded-full h-6 w-6 shadow-md mr-2 border-2 cursor-pointer ${
                    selectedColor === color
                      ? "border-purple-500 scale-110"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                ></div>
              ))}
            </div>

            <div className="mt-4">
              <p className="font-semibold mb-1">Size:</p>
              <div className="flex space-x-2">
                {product.sizes.map((size, index) => (
                  <button
                    key={index}
                    className={`border px-3 py-1 rounded-md ${
                      selectedSize === size ? "bg-purple-600 text-white" : ""
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-center space-x-2">
              <p className="font-semibold">Quantity:</p>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border rounded-md w-16 px-2 py-1"
              />
            </div>

            <div className="mt-6 flex space-x-2">
              <button
                className="bg-gradient-to-r from-red-600 to-pink-500 text-white py-2 px-4 rounded-full hover:from-red-700 hover:to-pink-600"
                onClick={() => {
                  onAddToCart({
                    productId: product._id,
                    productName: product.name,
                    quantity,
                    size: selectedSize,
                    color: selectedColor,
                  });
                  onClose();
                }}
              >
                Add to Cart
              </button>
              <button
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-full hover:bg-gray-400"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 🟣 ProductList Page
export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [colorFilter, setColorFilter] = useState("");
  const [sizeFilter, setSizeFilter] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
      }
    }
    loadProducts();
  }, []);

  const handleAddToCart = (item) => {
    dispatch(addItemToCart(item));
    toast.success(`✅ "${item.productName}" added to cart!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };

  // 🔥 Global search filter (name, description, colors, sizes, tags)
  const filterProducts = (productsArray) => {
    return productsArray.filter((p) => {
      const term = searchTerm.toLowerCase();
      return (
        p.name.toLowerCase().includes(term) ||
        p.description?.toLowerCase().includes(term) ||
        p.tags?.some((tag) => tag.toLowerCase().includes(term)) ||
        p.colors?.some((c) => c.toLowerCase().includes(term)) ||
        p.sizes?.some((s) => s.toLowerCase().includes(term)) ||
        p.price.toString().includes(term)
      );
    })
    .filter((p) => (colorFilter ? p.colors.includes(colorFilter) : true))
    .filter((p) => (sizeFilter ? p.sizes.includes(sizeFilter) : true));
  };

  const menProducts = filterProducts(products.filter((p) => p.tags?.includes("men")));
  const womenProducts = filterProducts(products.filter((p) => p.tags?.includes("women")));

  // Extract unique colors and sizes for filter buttons
  const allColors = [...new Set(products.flatMap((p) => p.colors))];
  const allSizes = [...new Set(products.flatMap((p) => p.sizes))];

  const renderFilterBar = () => (
    <div className="flex flex-wrap items-center gap-4 mb-6">
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border rounded-lg px-3 py-2 w-64 focus:outline-purple-500"
      />
      <div className="flex flex-wrap gap-2">
        {allColors.map((color, index) => (
          <button
            key={index}
            style={{ backgroundColor: color }}
            className={`h-6 w-6 rounded-full border-2 focus:outline-none transition-transform duration-200 ${
              colorFilter === color ? "scale-110 border-purple-500" : "border-gray-300"
            }`}
            onClick={() => setColorFilter(colorFilter === color ? "" : color)}
          ></button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {allSizes.map((size, index) => (
          <button
            key={index}
            className={`border px-3 py-1 rounded-lg text-sm transition-transform duration-200 ${
              sizeFilter === size ? "bg-purple-600 text-white scale-105" : ""
            }`}
            onClick={() => setSizeFilter(sizeFilter === size ? "" : size)}
          >
            {size}
          </button>
        ))}
      </div>
      <button
        onClick={() => {
          setSearchTerm("");
          setColorFilter("");
          setSizeFilter("");
        }}
        className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-300"
      >
        Clear
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4 sm:px-6 lg:px-8">
      <Navbar />
      <div className="m-12">
        <h1 className="text-2xl font-bold mb-4">Men's Collection</h1>
        {renderFilterBar()}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {menProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onViewDetail={setSelectedProduct}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        <h1 className="text-2xl font-bold mb-4 mt-12">Women's Collection</h1>
        {renderFilterBar()}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {womenProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onViewDetail={setSelectedProduct}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={handleAddToCart}
          />
        )}
      </div>

      <ToastContainer />
    </div>
  );
}
