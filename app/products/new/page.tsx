"use client";

import Header from "@/app/components/header";
import { useState } from "react";

export default function NewProductPage() {
  const [image, setImage] = useState<File | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    discountedPrice: "",
    tags: "",
    rating: "",
    numReviews: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return alert("Please upload an image");

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (["price", "discountedPrice", "rating", "numReviews"].includes(key)) {
        formData.append(key, String(parseFloat(value)));
      } else {
        formData.append(key, value);
      }
    });
    formData.append("image", image);

    const res = await fetch("/api/products", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("Product uploaded!");
    } else {
      alert("Upload failed!");
    }
  };

  return (
    <div>
      <Header />
      <form
        onSubmit={handleSubmit}
        className="max-w-md mt-10 m-auto p-4 space-y-4 bg-white rounded-2xl shadow"
      >
        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          className="w-full border p-2"
        />
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="w-full border p-2"
        />
        <input
          name="price"
          placeholder="Price"
          onChange={handleChange}
          className="w-full border p-2"
        />
        <input
          name="discountedPrice"
          placeholder="Discounted Price"
          onChange={handleChange}
          className="w-full border p-2"
        />
        <input
          name="tags"
          placeholder="Tags (comma separated)"
          onChange={handleChange}
          className="w-full border p-2"
        />
        <input
          name="rating"
          placeholder="Rating"
          onChange={handleChange}
          className="w-full border p-2"
        />
        <input
          name="numReviews"
          placeholder="Number of Reviews"
          onChange={handleChange}
          className="w-full border p-2"
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="w-full"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">
          Upload Product
        </button>
      </form>
    </div>
  );
}
