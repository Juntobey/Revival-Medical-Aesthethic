import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const TestimonialUpload = () => {
  const [testimonial, setTestimonial] = useState("");
  const [image, setImage] = useState(null);

  const handleTestimonialChange = (e) => {
    setTestimonial(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!testimonial || !image) {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please provide both a testimonial and an image.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("testimonial", testimonial);
    formData.append("image", image);

    try {
      const response = await fetch(
        "http://localhost:3000/api/testimonials/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        MySwal.fire({
          icon: "success",
          title: "Thank you!",
          text: "Your testimonial has been submitted successfully.",
        });
        setTestimonial("");
        setImage(null);
      } else {
        MySwal.fire({
          icon: "error",
          title: "Upload Failed",
          text: "There was an error submitting your testimonial. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error uploading testimonial:", error);
      MySwal.fire({
        icon: "error",
        title: "Upload Failed",
        text: "There was an error submitting your testimonial. Please try again.",
      });
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-2xl font-headers font-semibold mb-4">
        Submit Your Testimonial
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          placeholder="Write your testimonial here..."
          value={testimonial}
          onChange={handleTestimonialChange}
          className="w-full p-2 border border-gray-300 rounded"
          rows="4"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full"
          required
        />
        <button
          type="submit"
          className="bg-lightbrown font-cta text-luxwhite py-2 px-4 rounded hover:bg-blue-600"
        >
          Submit Testimonial
        </button>
      </form>
    </div>
  );
};

export default TestimonialUpload;
