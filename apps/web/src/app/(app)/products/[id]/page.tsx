"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { useCart } from "@/lib/cart";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // cents
  stock: number;
  imageUrl?: string;
}

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  console.log("Product ID:", id);

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [toast, setToast] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    apiFetch<Product>(`/products/${id}`)
      .then(setProduct)
      .finally(() => setLoading(false));
  }, [id]);

  function formatPrice(price: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price / 100);
  }

  if (loading) return <div>Loading product…</div>;
  if (!product) return <div>Product not found</div>;
  console.log("quantity:", quantity, "type:", typeof quantity);
  console.log("Product stock:", product.stock, typeof product.stock);

  {toast && (
  <div style={{
    position: "fixed",
    top: "20px",
    right: "20px",
    background: "#10B981",
    color: "white",
    padding: "12px 20px",
    borderRadius: "6px",
    fontWeight: 600,
    zIndex: 1000
  }}>
    {toast}
  </div>
)}
  return (
    <div className="product-detail-grid">

      {product.imageUrl ? (
  <img
    src={`http://localhost:4000${product.imageUrl}`}
    alt={product.name}
    style={{
      width: "100%",
      height: "400px",
      objectFit: "cover",
      borderRadius: "8px"
    }}
  />
) : (
  <div className="product-image-large" />
)}

      

      <div className="product-info">
        <span className="badge">In stock: {product.stock}</span>
        <h1>{product.name}</h1>
        <p className="price-tag">{formatPrice(product.price)}</p>
        <p className="description">{product.description}</p>

        <div className="action-section">
        <input
  type="number"
  min={1}
  max={product.stock}
  value={quantity}
  onChange={(e) => {
    const value = Number(e.target.value);

     if (isNaN(value)) {
      setQuantity(1);
      return;
    }

    const clampedValue = Math.min(
      product.stock,
      Math.max(1, value)
    );

    setQuantity(clampedValue);
  }}
/>

  

          <button
            className="btn-primary"
            disabled={product.stock === 0}
            onClick={() =>{
              addToCart({
                productId: product.id,
                name: product.name,
                price: product.price,
                quantity,
                 imageUrl: product.imageUrl
    ? `http://localhost:4000${product.imageUrl}`
    : undefined,
              });
               setToast(`${product.name} added to cart`);
  setTimeout(() => setToast(null), 3000);
}}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
