import React, { useState, useEffect } from "react";

const Cart = () => {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  useEffect(() => {
    const userCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(userCart);
  }, []);

  const handleRemove = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">
        Your Shopping Cart
      </h2>
      {cart.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col bg-white rounded-lg shadow-md p-4"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {item.name}
              </h3>
              <img
                src={item.thumbnail}
                alt={item.title}
                className="h-48 w-full object-contain rounded-lg mb-4"
              />
              <p className="text-gray-600">Quantity: {item.quantity}</p>
              <p className="text-gray-600">Price: ${item.price.toFixed(2)}</p>
              <div className="mt-4">
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">Your cart is empty!</p>
      )}
      <div className="text-right mt-6">
        <h3 className="text-xl font-bold text-gray-800">
          Total: ${total.toFixed(2)}
        </h3>
      </div>
    </div>
  );
};

export default Cart;
