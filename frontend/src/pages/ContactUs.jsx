import React, { useState } from "react";

const ContactUs = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic ( send form data to backend)
  };

  return (
    <section className="py-16 px-8">
      <div className="container mx-auto max-w-lg">
        <h2 className="text-4xl font-bold mb-6">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              className="border p-2 w-full rounded h-32"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-black text-white py-2 px-6 rounded-lg hover:bg-gray-800"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
