"use client";
import { useCart } from "@/lib/cart";
import { apiFetch } from "@/lib/api";
import { useRouter } from "next/navigation";
import { requireAuth } from "@/lib/requireAuth";
import { useState } from "react";

requireAuth();

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const total = items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  function formatPrice(price: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price / 100);
  }

  async function handlePlaceOrder() {
    if (items.length === 0) return;

    try {
      setLoading(true);
      await apiFetch("/orders", {
        method: "POST",
        body: JSON.stringify({
          items: items.map(i => ({
            productId: i.productId,
            quantity: i.quantity,
          })),
          totalAmount: total,
        }),
      });

      clearCart();
      router.push("/orders?success=true");
    } catch {
      alert("Order failed. Please login or check stock.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="checkout-container">
      <h1>Finalize Order</h1>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="order-review">
            {items.map(item => (
              <div key={item.productId} className="review-item">
                <span>{item.name} × {item.quantity}</span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
            <div className="grand-total">
              Total: {formatPrice(total)}
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="btn-primary full-width"
            disabled={loading}
          >
            {loading ? "Placing Order…" : "Place Order"}
          </button>
        </>
      )}
    </div>
  );
}
