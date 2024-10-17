// src/components/NewsletterSignup.jsx
import React, { useState } from "react";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle newsletter signup (e.g., API call)
  };

  return (
    <div className="bg-gray-200 p-6 rounded-lg shadow-md text-center">
      <h3 className="text-lg font-semibold mb-4">Sign up for our newsletter</h3>
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          className="p-2 border border-gray-300 rounded-lg w-full"
          required
        />
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsletterSignup;
