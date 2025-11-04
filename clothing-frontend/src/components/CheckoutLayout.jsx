import React from "react";

import Footer from "./Footer";
import Navbar from "./Navbar";

export default function CheckoutLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex items-center justify-center mt-20 mb-20 px-4">
        {children}
      </main>
      <Footer />
    </>
  );
}
