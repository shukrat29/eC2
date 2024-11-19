import React from "react";

const Footer = () => {
  return (
    <footer className="bg-zinc-500 text-white py-8 text-center">
      <p className="text-sm">
        © {new Date().getFullYear()} TechStore. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
