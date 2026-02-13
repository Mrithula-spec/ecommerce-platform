"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

type Order = {
  id: string;
  totalAmount: number;
  status: string;
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  async function loadOrders() {
    const data = await apiFetch<Order[]>("/admin/orders");
    setOrders(data);
  }

 useEffect(() => {
  const fetchOrders = async () => {
    const data = await apiFetch<Order[]>("/admin/orders");
    setOrders(data);
  };

  fetchOrders();
}, []);


  async function updateStatus(id: string, status: string) {
    await apiFetch(`/admin/orders/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });

    loadOrders(); // refresh after update
  }

  return (
    <div>
      <h1>Orders</h1>

      {orders.map((o) => (
        <div key={o.id} style={{ marginBottom: "20px" }}>
          <div>
            <strong>{o.id}</strong>
          </div>
          <div>${(o.totalAmount / 100).toFixed(2)}</div>
          <div>Status: {o.status}</div>

          {/* ADMIN ACTION BUTTONS */}
          {o.status === "CREATED" && (
            <>
              <button onClick={() => updateStatus(o.id, "PROCESSING")}>
                Accept
              </button>

              <button onClick={() => updateStatus(o.id, "CANCELLED")}>
                Reject
              </button>
            </>
          )}

          {o.status === "PROCESSING" && (
            <>
              <button onClick={() => updateStatus(o.id, "SHIPPED")}>
                Mark as Shipped
              </button>

              <button onClick={() => updateStatus(o.id, "CANCELLED")}>
                Cancel
              </button>
            </>
          )}

          {o.status === "SHIPPED" && (
            <button onClick={() => updateStatus(o.id, "DELIVERED")}>
              Mark as Delivered
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
