// *
// =================================================
// Student Details
// =================================================
// Name : YOUR NAME
// Roll No. : YOUR ROLL NO.
// Contact No. : YOUR CONTACT NUMBER
// Address : Hetauda, Nepal
// Program : BSc CSIT
// Semester : 2nd
// =================================================
// Task: Product Creation Form
// =================================================
// */

import React, { useState } from "react";

const initialForm = {
  name: "",
  description: "",
  category: "Electronics",
  price: "",
  stock: "",
  brand: "",
  condition: "New",
  imageUrl: "",
  available: true,
  featured: false,
};

export default function CreateProduct() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({ type: "", message: "", id: null });

  const updateField = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult({ type: "", message: "", id: null });

    if (!form.name || !form.description || !form.price || !form.stock || !form.brand) {
      setResult({ type: "error", message: "Please fill all required fields.", id: null });
      return;
    }

    if (Number(form.price) < 0 || Number(form.stock) < 0) {
      setResult({ type: "error", message: "Price and stock cannot be negative.", id: null });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("Request failed");

      const data = await response.json();

      setResult({
        type: "success",
        message: "Product created successfully!",
        id: data.id,
      });
      setForm(initialForm);
    } catch (error) {
      setResult({
        type: "error",
        message: "Failed to create product. Please try again.",
        id: null,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card">
      <h2>Create Product</h2>

      {loading && <p className="loading">Submitting product...</p>}
      {result.message && (
        <div className={result.type === "success" ? "success" : "error"}>
          <p>{result.message}</p>
          {result.id !== null && <p>Demo Product ID: {result.id}</p>}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label>Product Name *
          <input name="name" value={form.name} onChange={updateField} />
        </label>

        <label>Product Description *
          <textarea name="description" value={form.description} onChange={updateField} />
        </label>

        <label>Category *
          <select name="category" value={form.category} onChange={updateField}>
            {["Electronics", "Clothing", "Books", "Grocery", "Furniture"].map((x) => <option key={x}>{x}</option>)}
          </select>
        </label>

        <label>Price *
          <input type="number" min="0" name="price" value={form.price} onChange={updateField} />
        </label>

        <label>Stock Quantity *
          <input type="number" min="0" name="stock" value={form.stock} onChange={updateField} />
        </label>

        <label>Brand *
          <input name="brand" value={form.brand} onChange={updateField} />
        </label>

        <fieldset>
          <legend>Product Condition *</legend>
          {["New", "Used", "Refurbished"].map((x) => (
            <label className="inline" key={x}>
              <input type="radio" name="condition" value={x}
                checked={form.condition === x} onChange={updateField} />
              {x}
            </label>
          ))}
        </fieldset>

        <label>Product Image URL
          <input type="url" name="imageUrl" value={form.imageUrl} onChange={updateField} />
        </label>

        <label className="inline">
          <input type="checkbox" name="available" checked={form.available} onChange={updateField} />
          Available for Sale
        </label>

        <label className="inline">
          <input type="checkbox" name="featured" checked={form.featured} onChange={updateField} />
          Featured Product
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Create Product"}
        </button>
      </form>
    </section>
  );
}
