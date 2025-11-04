// src/components/BlogDetail.js
import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

const BlogDetail = () => {
  const { id } = useParams();

  // مثال بيانات مؤقتة، ممكن تجيبها من API لاحقًا
  const blogPosts = [
    {
      id: 1,
      title: "Top Fashion Trends for 2023",
      content: "Full content of Top Fashion Trends for 2023...",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop&auto=format",
      date: "October 15, 2023",
      author: "Fashion Insider",
    },
    {
      id: 2,
      title: "Sustainable Clothing: Why It Matters",
      content: "Full content of Sustainable Clothing...",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop&auto=format",
      date: "September 28, 2023",
      author: "Eco Fashionista",
    },
    {
      id: 3,
      title: "Styling Tips for Casual Outfits",
      content: "Full content of Styling Tips for Casual Outfits...",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop&auto=format",
      date: "August 10, 2023",
      author: "Style Guru",
    },
  ];

  const post = blogPosts.find((p) => p.id === parseInt(id));

  if (!post) return <p className="text-center mt-20">Post not found!</p>;

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4 sm:px-6 lg:px-8">
      <Navbar />
      <div className="max-w-3xl mx-auto py-12 px-4">
        <img src={post.image} alt={post.title} className="w-full h-64 object-cover rounded mb-6" />
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <div className="flex justify-between text-sm text-gray-500 mb-6">
          <span>By {post.author}</span>
          <span>{post.date}</span>
        </div>
        <p className="text-gray-700">{post.content}</p>
      </div>
    </div>
  );
};

export default BlogDetail;
