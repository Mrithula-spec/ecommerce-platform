"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";

type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  imageUrl?: string;
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await apiFetch<Product[]>("/admin/products");
        setProducts(data);
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  async function handleDelete(id: string) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      await apiFetch(`/admin/products/${id}`, {
        method: "DELETE",
      });

      // Remove from UI immediately
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch {
      alert("Failed to delete product");
    }
  }

  function formatPrice(price: number) {
    return (price / 100).toFixed(2);
  }

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>Products</h1>

      <Link
        href="/admin/products/new"
        style={{
          display: "inline-block",
          marginBottom: "20px",
          padding: "8px 14px",
          backgroundColor: "#2563eb",
          color: "white",
          borderRadius: "6px",
          textDecoration: "none",
        }}
      >
        + New Product
      </Link>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {products.map(p => (
            <div
              key={p.id}
              style={{
                padding: "12px",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <strong>{p.name}</strong>
                <div style={{ fontSize: "14px", color: "#64748b" }}>
                  ${formatPrice(p.price)} | Stock: {p.stock}
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <Link
                  href={`/admin/products/${p.id}/edit`}
                  style={{
                    padding: "6px 10px",
                    backgroundColor: "#facc15",
                    borderRadius: "6px",
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(p.id)}
                  style={{
                    padding: "6px 10px",
                    backgroundColor: "#ef4444",
                    color: "white",
                    borderRadius: "6px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
