import React from "react";
import { Truck, Star, Tag } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: <Truck className="w-10 h-10 text-zinc-500" />,
      title: "Fast Delivery",
      description: "Receive your orders quickly and reliably.",
    },
    {
      icon: <Star className="w-10 h-10 text-zinc-500" />,
      title: "Premium Quality",
      description: "Carefully selected products for top quality.",
    },
    {
      icon: <Tag className="w-10 h-10 text-zinc-500" />,
      title: "Best Offers",
      description: "Exclusive deals and discounts for you.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-zinc-700 text-center mb-10">
        Why Shop With Us
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-6 rounded-lg bg-zinc-50 hover:bg-zinc-100 transition"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-zinc-700 mb-2">{feature.title}</h3>
            <p className="text-zinc-500">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
