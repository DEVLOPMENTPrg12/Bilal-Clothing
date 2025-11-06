import React from "react";
import FeaturesSection from "./FeaturesSection";


export default function HeroSection() {
  return (
    <div>
    <section className="flex flex-col-reverse md:flex-row justify-between items-center m-4 mt-28 max-w-7xl mx-auto px-4">
      {/* النصوص */}
      <div className="mt-10 md:mt-0 md:w-1/2">
        <h1 className="text-3xl md:text-5xl text-zinc-700 font-bold font-serif mb-4 text-center md:text-left">
  Discover Your Style with Bilal Clothing
</h1>
<p className="text-lg md:text-xl text-zinc-700 mb-2 text-center md:text-left">
  Fashion that Fits Your Lifestyle
</p>
<p className="text-lg md:text-xl text-zinc-700 mb-6 text-center md:text-left">
  Quality, Comfort, and Trend – All in One Place
</p>

        <div className="flex justify-center md:justify-start">
          <button className="text-lg text-white font-bold bg-gradient-to-r from-red-500 to-red-400 hover:from-red-600 hover:to-red-500 transition rounded-full py-3 px-6">
            SHOP NOW
          </button>
        </div>
      </div>

      {/* الصورة */}
      <div className="md:w-1/2 mb-6 md:mb-0">
        <img
          src="/assets/hero-img.svg"
          alt="Hero"
          className="w-full max-w-md mx-auto md:max-w-full"
        />
      </div>
    </section>
    <FeaturesSection/>
    </div>
    
  );
}
