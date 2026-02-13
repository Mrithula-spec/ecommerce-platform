"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import Link from "next/link";

type OrderItem = {
  id: string;
  quantity: number;
  price: number;
  product: {
    id: string;
    name: string;
    imageUrl?: string | null;
  };
};

type Order = {
  id: string;
  status: string;
  totalAmount: number;
  createdAt: string;
  items: OrderItem[];
};

export default function OrderDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await apiFetch<Order>(`/orders/${id}`);
        setOrder(data);
      } catch {
        router.push("/orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, router]);

  function formatPrice(price: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price / 100);
  }

  if (loading) return <p>Loading...</p>;
  if (!order) return <p>Order not found</p>;

  return (
    <div style={{ padding: "40px", maxWidth: "1000px", margin: "auto" }}>
      
      <Link href="/orders" style={{ textDecoration: "none" }}>
        ← Back to Orders
      </Link>

      <h1 style={{ marginTop: "20px" }}>
        Order #{order.id.slice(0, 8).toUpperCase()}
      </h1>

      <p>
        Placed on{" "}
        {new Date(order.createdAt).toLocaleDateString()}
      </p>

      <p>
        <strong>Status:</strong> {order.status}
      </p>

      <hr style={{ margin: "30px 0" }} />

      <h2>Items</h2>

      {order.items.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            gap: "20px",
            alignItems: "center",
            marginBottom: "20px",
            borderBottom: "1px solid #eee",
            paddingBottom: "20px",
          }}
        >
          <img
            src={
              item.product.imageUrl
                ? `http://localhost:4000${item.product.imageUrl}`
                : "/placeholder.png"
            }
            alt={item.product.name}
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />

          <div style={{ flex: 1 }}>
            <h3>{item.product.name}</h3>
            <p>Quantity: {item.quantity}</p>
            <p>Unit Price: {formatPrice(item.price)}</p>
          </div>

          <div>
            <strong>
              {formatPrice(item.price * item.quantity)}
            </strong>
          </div>
        </div>
      ))}

      <hr style={{ margin: "30px 0" }} />

      <div style={{ textAlign: "right" }}>
        <h2>Total: {formatPrice(order.totalAmount)}</h2>
      </div>
    </div>
  );
}
