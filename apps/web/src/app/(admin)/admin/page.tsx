"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

type Stats = {
  products: number;
  orders: number;
  users: number;
  pendingOrders?: number;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch<Stats>("/admin/stats")
      .then(setStats)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="dashboard-loading">Loading dashboard…</div>;
  }

  if (!stats) {
    return <div className="dashboard-error">Failed to load dashboard data.</div>;
  }
  return (
  <div className="dashboard-wrapper">

    <div className="dashboard-header-section">
      <div>
        <h2 className="dashboard-title">Overview</h2>
        <p className="dashboard-subtitle">
          Platform performance summary
        </p>
      </div>
    </div>

    <div className="dashboard-grid">
      <div className="stat-card">
        <span>Total Products</span>
        <h2>{stats.products}</h2>
      </div>

      <div className="stat-card">
        <span>Total Orders</span>
        <h2>{stats.orders}</h2>
      </div>

      <div className="stat-card">
        <span>Total Users</span>
        <h2>{stats.users}</h2>
      </div>

      <div className="stat-card highlight">
        <span>Pending Orders</span>
        <h2>{stats.pendingOrders ?? 0}</h2>
      </div>
    </div>

    <div className="dashboard-section">
      <h3>Quick Actions</h3>

      <div className="quick-actions">
        <a href="/admin/products" className="action-btn">
          Manage Products
        </a>

        <a href="/admin/orders" className="action-btn secondary">
          Manage Orders
        </a>
      </div>
    </div>

  </div>
);
  
}
