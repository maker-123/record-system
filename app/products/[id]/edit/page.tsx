"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Header from "@/app/components/header";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    discountedPrice: "",
    tags: "",
    rating: "",
    numReviews: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [existingImage, setExistingImage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();
      setForm({
        title: data.title,
        description: data.description,
        price: data.price,
        discountedPrice: data.discountedPrice.toString(),
        tags: data.tags.join(", "),
        rating: data.rating.toString(),
        numReviews: data.numReviews.toString(),
      });
      setExistingImage(data.image);
    };
    fetchProduct();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (image) {
      formData.append("image", image);
    }
    formData.append("existingImage", existingImage);

    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      body: formData,
    });

    if (res.ok) {
      alert("Product updated!");
      router.push("/");
    } else {
      alert("Update failed!");
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
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full border p-2"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-2"
        />
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full border p-2"
        />
        <input
          name="discountedPrice"
          value={form.discountedPrice}
          onChange={handleChange}
          placeholder="Discounted Price"
          className="w-full border p-2"
        />
        <input
          name="tags"
          value={form.tags}
          onChange={handleChange}
          placeholder="Tags (comma separated)"
          className="w-full border p-2"
        />
        <input
          name="rating"
          value={form.rating}
          onChange={handleChange}
          placeholder="Rating"
          className="w-full border p-2"
        />
        <input
          name="numReviews"
          value={form.numReviews}
          onChange={handleChange}
          placeholder="Number of Reviews"
          className="w-full border p-2"
        />

        <div>
          <p className="mb-1">Current Image:</p>
          {existingImage && (
            <Image
              src={existingImage}
              alt="Current product image"
              width={128}
              height={128}
              className="rounded object-cover"
            />
          )}
          <input
            type="file"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}
