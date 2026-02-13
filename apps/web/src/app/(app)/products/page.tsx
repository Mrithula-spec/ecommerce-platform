"use client";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/lib/cart";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl?: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [toast, setToast] = useState<string | null>(null);


  const { addToCart } = useCart();

  useEffect(() => {
    apiFetch<Product[]>("/products")
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function handleAddToCart(product: Product) {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrl
    ? `http://localhost:4000${product.imageUrl}`
    : undefined,
    });

    setToast(`${product.name} added to cart`);
    setTimeout(() => setToast(null), 3000);
  }

  function formatPrice(price: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price / 100);
  }

  if (loading) return <div className="loading">Loading products…</div>;

  return (
    <div className="products-container">
      <h1 className="page-title">Shop All Products</h1>

      {toast && <div className="toast">{toast}</div>}

      {/* Search Input */}
      

      <div className="product-grid">
        {filteredProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          filteredProducts.map(product => (
            <div key={product.id} className="product-card">
             <Link
  key={product.id}
  href={`/products/${product.id}`}
  className="product-card"
  style={{ display: "block", textDecoration: "none", color: "inherit" }}
>
  {product.imageUrl ? (
  <img
    src={`http://localhost:4000${product.imageUrl}`}
    alt={product.name}
    style={{
      width: "100%",
      height: "200px",
      objectFit: "cover",
      borderRadius: "8px",
    }}
  />
) : (
  <div className="image-placeholder" />
)}
  <h3>{product.name}</h3>
  <p className="price">{formatPrice(product.price)}</p>
</Link>

            </div>
          ))
        )}
      </div>
    </div>
  );
}
