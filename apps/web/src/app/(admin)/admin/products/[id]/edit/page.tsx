"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  imageUrl?: string;
};

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    apiFetch<Product>(`/admin/products/${id}`).then((p) => {
      setProduct(p);
      setName(p.name);
      setDescription(p.description || "");
      setPrice(String(p.price / 100));
      setStock(String(p.stock));
    });
  }, [id]);

  async function handleUpdate() {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", String(Number(price) * 100));
    formData.append("stock", stock);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    await apiFetch(`/admin/products/${id}`, {
      method: "PUT",
      body: formData,
    });

    router.push("/admin/products");
  }

  if (!product) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h1>Edit Product</h1>

      <div>
        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div>
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <label>Price (USD)</label>
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
        />
      </div>

      <div>
        <label>Stock</label>
        <input
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          type="number"
        />
      </div>

      <div>
        <label>Current Image</label>
        {product.imageUrl && (
          <img
            src={`http://localhost:4000${product.imageUrl}`}
            alt="preview"
            style={{ width: "200px", display: "block", marginBottom: "10px" }}
          />
        )}
      </div>

      <div>
        <label>Upload New Image</label>
        <input
          type="file"
          onChange={(e) =>
            setImageFile(e.target.files ? e.target.files[0] : null)
          }
        />
      </div>

      <button onClick={handleUpdate}>Save Changes</button>
    </div>
  );
}
