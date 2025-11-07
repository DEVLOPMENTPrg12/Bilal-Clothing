import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const BlogPage = () => {
  // Sample blog posts data (replace with real data from API or state)
  const blogPosts = [
    {
      id: 1,
      title: "Top Fashion Trends for 2023",
      excerpt: "Discover the latest trends in clothing...",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=250&fit=crop&auto=format",
      date: "October 15, 2023",
      author: "Fashion Insider",
    },
    {
      id: 2,
      title: "Sustainable Clothing: Why It Matters",
      excerpt:
        "Learn about eco-friendly materials and how to build a sustainable wardrobe...",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&auto=format",
      date: "September 28, 2023",
      author: "Eco Fashionista",
    },
    {
      id: 3,
      title: "Styling Tips for Casual Outfits",
      excerpt:
        "Get inspired with easy ways to mix and match your casual wear...",
      image:
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&h=250&fit=crop&auto=format",
      date: "August 10, 2023",
      author: "Style Guru",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="pt-24 sm:pt-28 px-4 sm:px-6 lg:px-8 pb-16">
        {/* Header */}
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Fashion Blog
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            Stay updated with the latest in clothing trends, tips, and stories.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="max-w-7xl mx-auto mt-12 grid gap-8 sm:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-56 sm:h-48 object-cover"
              />
              <div className="p-6 flex flex-col flex-1">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4 text-sm sm:text-base line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex justify-between items-center text-xs sm:text-sm text-gray-500 mt-auto">
                  <span>By {post.author}</span>
                  <span>{post.date}</span>
                </div>
                <Link
                  to={`/blog/${post.id}`}
                  className="mt-4 inline-block text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="max-w-7xl mx-auto mt-12 text-center">
          <button className="bg-blue-600 text-white px-6 py-2 sm:px-8 sm:py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm sm:text-base">
            Load More Posts
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
