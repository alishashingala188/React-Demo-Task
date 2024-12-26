import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      try {
        localStorage.removeItem("isAuthenticated");
        navigate("/login");
      } catch (error) {
        console.error("Error during logout:", error);
      }
    }
  };

  return (
    <header className="sticky top-0 bg-white border-b border-slate-200 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          <div className="flex space-x-4">
            <Link
              to="/login"
              className="text-lg font-medium text-gray-700 hover:text-gray-900"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-lg font-medium text-gray-700 hover:text-gray-900"
            >
              Register
            </Link>
            <Link
              to="/product"
              className="text-lg font-medium text-gray-700 hover:text-gray-900"
            >
              Product
            </Link>
            <Link
              to="/cart"
              className="text-lg font-medium text-gray-700 hover:text-gray-900"
            >
              Cart
            </Link>
            <button
              onClick={handleLogout}
              className="text-lg font-medium text-gray-700 hover:text-gray-900"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
