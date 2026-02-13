"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { requireAuth } from "@/lib/requireAuth";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

requireAuth();

type Order = {
  id: string;
  status:
    | "CREATED"
    | "PAID"
    | "PROCESSING"
    | "SHIPPED"
    | "DELIVERED"
    | "CANCELLED"
    | "RETURNED"
    | "REFUNDED";
  totalAmount: number;
  createdAt: string;
};


export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"ALL" | Order["status"]>("ALL");
  const router = useRouter();
  const searchParams = useSearchParams();

  const success = searchParams.get("success");

  useEffect(() => {
    apiFetch<Order[]>("/orders")
      .then(setOrders)
      .catch(() => router.push("/login"))
      .finally(() => setLoading(false));
  }, [router]);

  function formatPrice(price: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price / 100);
  }

  function getStatusInfo(status: Order["status"]) {
  switch (status) {
    case "CREATED":
      return {
        label: "Order Placed",
        color: "#3B82F6",
        bg: "#DBEAFE",
        icon: "📦",
      };

    case "PROCESSING":
      return {
        label: "Processing",
        color: "#F59E0B",
        bg: "#FEF3C7",
        icon: "⏳",
      };

    case "SHIPPED":
      return {
        label: "Shipped",
        color: "#6366F1",
        bg: "#E0E7FF",
        icon: "🚚",
      };

    case "DELIVERED":
      return {
        label: "Delivered",
        color: "#10B981",
        bg: "#D1FAE5",
        icon: "✓",
      };

    case "PAID":
      return {
        label: "Paid",
        color: "#10B981",
        bg: "#D1FAE5",
        icon: "✓",
      };

    case "CANCELLED":
      return {
        label: "Cancelled",
        color: "#EF4444",
        bg: "#FEE2E2",
        icon: "✕",
      };

    case "RETURNED":
      return {
        label: "Returned",
        color: "#8B5CF6",
        bg: "#EDE9FE",
        icon: "↩",
      };

    case "REFUNDED":
      return {
        label: "Refunded",
        color: "#EC4899",
        bg: "#FCE7F3",
        icon: "💸",
      };

    default:
      return {
        label: status,
        color: "#6B7280",
        bg: "#F3F4F6",
        icon: "•",
      };
  }
}


  const filteredOrders = filter === "ALL" 
    ? orders 
    : orders.filter(order => order.status === filter);

  if (loading) {
    return (
      <div style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--spacing-lg)'
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          border: '4px solid var(--gray-200)',
          borderTop: '4px solid var(--primary)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <p style={{ color: 'var(--gray-500)', fontSize: '16px' }}>
          Loading your orders...
        </p>
        <style jsx>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ 
      background: 'var(--bg-primary)', 
      minHeight: '100vh',
      paddingBottom: 'var(--spacing-3xl)'
    }}>
      <div className="container" style={{ paddingTop: 'var(--spacing-2xl)' }}>
        {/* Breadcrumb */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-sm)',
          marginBottom: 'var(--spacing-xl)',
          fontSize: '14px',
          color: 'var(--gray-500)'
        }}>
          <Link href="/" style={{ color: 'var(--gray-500)', textDecoration: 'none' }}>
            Home
          </Link>
          <span>/</span>
          <span style={{ color: 'var(--dark)', fontWeight: 600 }}>My Orders</span>
        </div>

        {/* Success Banner */}
        {success && (
          <div style={{
            background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
            color: 'var(--white)',
            padding: 'var(--spacing-lg) var(--spacing-xl)',
            borderRadius: 'var(--radius-lg)',
            marginBottom: 'var(--spacing-xl)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-md)',
            boxShadow: 'var(--shadow-lg)',
            animation: 'slideIn 0.5s ease-out'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px'
            }}>
              ✓
            </div>
            <div>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: 700, 
                marginBottom: '4px' 
              }}>
                Order Placed Successfully!
              </h3>
              <p style={{ fontSize: '14px', opacity: 0.95 }}>
                Your order has been confirmed and is being processed.
              </p>
            </div>
          </div>
        )}

        {/* Header Section */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 'var(--spacing-2xl)',
          flexWrap: 'wrap',
          gap: 'var(--spacing-lg)'
        }}>
          <div>
            <h1 style={{
              fontSize: '36px',
              fontWeight: 700,
              fontFamily: "'Bebas Neue', sans-serif",
              letterSpacing: '1px',
              color: 'var(--dark)',
              marginBottom: 'var(--spacing-xs)'
            }}>
              My Orders
            </h1>
            <p style={{
              fontSize: '15px',
              color: 'var(--gray-500)'
            }}>
              {orders.length} {orders.length === 1 ? 'order' : 'orders'} in total
            </p>
          </div>

          {/* Filter Tabs */}
          <div style={{
            display: 'flex',
            gap: 'var(--spacing-sm)',
            background: 'var(--white)',
            padding: '6px',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-sm)',
            flexWrap: 'wrap'
          }}>
            {(['ALL', 'CREATED', 'PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                style={{
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all var(--transition-base)',
                  background: filter === status ? 'var(--primary)' : 'transparent',
                  color: filter === status ? 'var(--white)' : 'var(--gray-700)'
                }}
              >
                {status === 'ALL' ? 'All Orders' : status.charAt(0) + status.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div style={{
            background: 'var(--white)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--spacing-3xl)',
            textAlign: 'center',
            boxShadow: 'var(--shadow-md)'
          }}>
            <div style={{
              fontSize: '80px',
              marginBottom: 'var(--spacing-lg)',
              opacity: 0.3
            }}>
              📦
            </div>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 700,
              marginBottom: 'var(--spacing-md)',
              color: 'var(--dark)'
            }}>
              {filter === 'ALL' ? 'No Orders Yet' : `No ${filter.toLowerCase()} Orders`}
            </h2>
            <p style={{
              fontSize: '15px',
              color: 'var(--gray-500)',
              marginBottom: 'var(--spacing-xl)',
              maxWidth: '400px',
              margin: '0 auto var(--spacing-xl)'
            }}>
              {filter === 'ALL' 
                ? "You haven't placed any orders yet. Start shopping to see your orders here!"
                : `You don't have any ${filter.toLowerCase()} orders at the moment.`}
            </p>
            <Link href="/products" style={{
              background: 'var(--primary)',
              color: 'var(--white)',
              padding: '14px 32px',
              borderRadius: 'var(--radius-lg)',
              fontWeight: 700,
              fontSize: '15px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all var(--transition-base)',
              boxShadow: 'var(--shadow-md)'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              Start Shopping
            </Link>
          </div>
        ) : (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-lg)'
          }}>
            {filteredOrders.map((order, index) => {
              const statusInfo = getStatusInfo(order.status);
              return (
                <div 
                  key={order.id} 
                  className="order-card"
                  style={{
                    background: 'var(--white)',
                    borderRadius: 'var(--radius-xl)',
                    padding: 'var(--spacing-xl)',
                    boxShadow: 'var(--shadow-md)',
                    border: '1px solid var(--gray-100)',
                    transition: 'all var(--transition-base)',
                    animation: `fadeInUp 0.4s ease-out ${0.1 * index}s both`,
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {/* Status Indicator Bar */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: `linear-gradient(90deg, ${statusInfo.color} 0%, ${statusInfo.color}AA 100%)`
                  }} />

                  {/* Order Header */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: 'var(--spacing-lg)',
                    flexWrap: 'wrap',
                    gap: 'var(--spacing-md)',
                    paddingBottom: 'var(--spacing-lg)',
                    borderBottom: '1px solid var(--gray-100)'
                  }}>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-md)',
                        marginBottom: 'var(--spacing-sm)',
                        flexWrap: 'wrap'
                      }}>
                        <h3 style={{
                          fontSize: '16px',
                          fontWeight: 700,
                          color: 'var(--dark)',
                          fontFamily: "'DM Sans', sans-serif"
                        }}>
                          Order #{order.id.slice(0, 8).toUpperCase()}
                        </h3>
                        <span style={{
                          background: statusInfo.bg,
                          color: statusInfo.color,
                          padding: '6px 14px',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '12px',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}>
                          <span>{statusInfo.icon}</span>
                          {statusInfo.label}
                        </span>
                      </div>
                      <p style={{
                        fontSize: '14px',
                        color: 'var(--gray-500)'
                      }}>
                        Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>

                    {/* Order Total */}
                    <div style={{ textAlign: 'right' }}>
                      <p style={{
                        fontSize: '13px',
                        color: 'var(--gray-500)',
                        marginBottom: '4px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        Order Total
                      </p>
                      <p style={{
                        fontSize: '28px',
                        fontWeight: 700,
                        color: 'var(--primary)',
                        fontFamily: "'Bebas Neue', sans-serif",
                        letterSpacing: '0.5px',
                        lineHeight: 1
                      }}>
                        {formatPrice(order.totalAmount)}
                      </p>
                    </div>
                  </div>

                  {/* Order Details Grid */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: 'var(--spacing-lg)',
                    marginBottom: 'var(--spacing-lg)'
                  }}>
                    <div>
                      <p style={{
                        fontSize: '12px',
                        color: 'var(--gray-500)',
                        marginBottom: '6px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        fontWeight: 600
                      }}>
                        Order ID
                      </p>
                      <p style={{
                        fontSize: '15px',
                        color: 'var(--dark)',
                        fontWeight: 600,
                        fontFamily: 'monospace'
                      }}>
                        #{order.id.slice(0, 12)}
                      </p>
                    </div>

                    <div>
                      <p style={{
                        fontSize: '12px',
                        color: 'var(--gray-500)',
                        marginBottom: '6px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        fontWeight: 600
                      }}>
                        Order Date
                      </p>
                      <p style={{
                        fontSize: '15px',
                        color: 'var(--dark)',
                        fontWeight: 600
                      }}>
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                    </div>

                    <div>
                      <p style={{
                        fontSize: '12px',
                        color: 'var(--gray-500)',
                        marginBottom: '6px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        fontWeight: 600
                      }}>
                        Payment Status
                      </p>
                      <p style={{
                        fontSize: '15px',
                        color: statusInfo.color,
                        fontWeight: 600
                      }}>
                        {getStatusInfo(order.status).label}

                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{
                    display: 'flex',
                    gap: 'var(--spacing-sm)',
                    flexWrap: 'wrap',
                    paddingTop: 'var(--spacing-lg)',
                    borderTop: '1px solid var(--gray-100)'
                  }}>
                    <Link
                      href={`/orders/${order.id}`}
                      style={{
                        background: 'var(--primary)',
                        color: 'var(--white)',
                        padding: '12px 24px',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '14px',
                        fontWeight: 600,
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'all var(--transition-base)',
                        border: 'none'
                      }}
                    >
                      View Details
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </Link>

                    {order.status === "PAID" && (
                      <button style={{
                        background: 'transparent',
                        color: 'var(--dark)',
                        padding: '12px 24px',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '14px',
                        fontWeight: 600,
                        border: '2px solid var(--gray-300)',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'all var(--transition-base)'
                      }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                          <circle cx="12" cy="10" r="3"/>
                        </svg>
                        Track Order
                      </button>
                    )}

                    <button style={{
                      background: 'transparent',
                      color: 'var(--gray-700)',
                      padding: '12px 24px',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '14px',
                      fontWeight: 600,
                      border: '2px solid var(--gray-300)',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all var(--transition-base)',
                      marginLeft: 'auto'
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                        <line x1="16" y1="13" x2="8" y2="13"/>
                        <line x1="16" y1="17" x2="8" y2="17"/>
                        <polyline points="10 9 9 9 8 9"/>
                      </svg>
                      Invoice
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}