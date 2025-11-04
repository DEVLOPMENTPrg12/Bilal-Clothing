import React, { useState } from "react";
 // تأكد الصورة موجودة

export default function SubscribeSection() {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email) {
      alert("Please enter your email address");
      return;
    }
    alert(`Subscribed successfully with: ${email}`);
    setEmail("");
  };

  return (
    <div className="mt-6 text-center lg:text-left lg:items-start">
      <div className="ml-4 lg:ml-16 my-20 bg-gradient-to-r from-black to-purple-900 lg:from-black lg:via-purple-900 lg:to-transparent rounded-lg text-gray-100 p-6 lg:p-12 flex flex-col lg:flex-row justify-between items-center">
        
        {/* Left content */}
        <div className="mt-6">
          <h1 className="text-white font-bold text-xl m-4">
            Subscribe to get our offers first
          </h1>
          <p className="text-slate-300 font-bold m-4">
            Want to hear from us when we have new offers? Sign up <br /> for our
            newsletter and we'll email you every time <br /> we have new sale
            offers.
          </p>

          {/* Input + Button */}
          <div className="ml-2">
            <input
              className="border-none w-full max-w-md shadow-xl bg-gray-600 rounded-xl text-white p-3"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={handleSubscribe}
              className="mt-4 bg-red-600 rounded-xl text-xl font-bold p-3 text-white shadow-xl w-full max-w-md"
            >
              Subscribe
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div>
          <img
            src="/assets/subscribe-banner.png"
            alt="Subscribe Banner"
            className="h-60 lg:h-96 mt-6 lg:mt-0"
          />
        </div>
      </div>
    </div>
  );
}
