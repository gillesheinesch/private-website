import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="mt-8 mb-4 py-4 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm text-gray-600">
          &copy; {new Date().getFullYear()} Gilles Heinesch
        </p>
      </div>
    </footer>
  );
};

export default Footer;
