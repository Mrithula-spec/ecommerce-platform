"use client";

import { useCart } from "@/lib/cart";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const discount = appliedCoupon ? subtotal * 0.1 : 0; // 10% discount
  const shipping = subtotal > 5000 ? 0 : 499; // Free shipping over $50
  const tax = (subtotal - discount) * 0.08; // 8% tax
  const total = subtotal - discount + shipping + tax;

  function formatPrice(price: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price / 100);
  }

  function applyCoupon() {
    if (couponCode.toUpperCase() === "SAVE10") {
      setAppliedCoupon(couponCode);
    }
  }

  if (items.length === 0) {
    return (
      <div style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--spacing-2xl)',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: '120px',
          marginBottom: 'var(--spacing-lg)',
          opacity: 0.3
        }}>
          🛒
        </div>
        <h2 style={{
          fontSize: '32px',
          fontWeight: 700,
          marginBottom: 'var(--spacing-md)',
          fontFamily: "'Bebas Neue', sans-serif",
          letterSpacing: '1px',
          color: 'var(--dark)'
        }}>
          Your Cart is Empty
        </h2>
        <p style={{
          fontSize: '16px',
          color: 'var(--gray-500)',
          marginBottom: 'var(--spacing-xl)',
          maxWidth: '400px'
        }}>
          Looks like you have not added any items to your cart yet. Start shopping to fill it up!
        </p>
        <Link href="/products" style={{
          background: 'var(--primary)',
          color: 'var(--white)',
          padding: '16px 40px',
          borderRadius: 'var(--radius-lg)',
          fontWeight: 700,
          fontSize: '16px',
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'all var(--transition-base)',
          boxShadow: 'var(--shadow-md)'
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
          </svg>
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', paddingBottom: 'var(--spacing-3xl)' }}>
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
          <Link href="/" style={{ color: 'var(--gray-500)', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <span style={{ color: 'var(--dark)', fontWeight: 600 }}>Shopping Cart</span>
        </div>

        {/* Page Title */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 'var(--spacing-xl)',
          flexWrap: 'wrap',
          gap: 'var(--spacing-md)'
        }}>
          <h1 style={{
            fontSize: '36px',
            fontWeight: 700,
            fontFamily: "'Bebas Neue', sans-serif",
            letterSpacing: '1px',
            color: 'var(--dark)'
          }}>
            Shopping Cart ({items.length} {items.length === 1 ? 'Item' : 'Items'})
          </h1>
          <button
            onClick={clearCart}
            style={{
              background: 'transparent',
              border: '2px solid var(--error)',
              color: 'var(--error)',
              padding: '10px 20px',
              borderRadius: 'var(--radius-md)',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all var(--transition-base)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--error)';
              e.currentTarget.style.color = 'var(--white)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--error)';
            }}
          >
            Clear All Items
          </button>
        </div>

        <div className="cart-layout">
          {/* Cart Items Section */}
          <div>
            {/* Free Shipping Banner */}
            {shipping > 0 && (
              <div style={{
                background: 'linear-gradient(135deg, #06D6A0 0%, #06B58A 100%)',
                color: 'var(--white)',
                padding: 'var(--spacing-md) var(--spacing-lg)',
                borderRadius: 'var(--radius-lg)',
                marginBottom: 'var(--spacing-lg)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-md)',
                fontSize: '14px',
                fontWeight: 600
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                  <circle cx="8.5" cy="7" r="4"/>
                  <polyline points="17 11 19 13 23 9"/>
                </svg>
                Add {formatPrice(5000 - subtotal)} more to get FREE shipping!
              </div>
            )}

            <div className="cart-items">
              {items.map((item, index) => (
                <div 
                  key={item.productId} 
                  className="cart-item"
                  style={{
                    animation: `fadeInUp 0.4s ease-out ${0.1 * index}s both`
                  }}
                >
                  {/* Product Image */}
                  <div style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--gray-100)',
                    overflow: 'hidden',
                    flexShrink: 0,
                    position: 'relative'
                  }}>
                    {item.imageUrl ? (
  <img
    src={item.imageUrl}
    alt={item.name}
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }}
  />
) : (
  <img
    src="/placeholder.png"
    alt="placeholder"
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }}
  />
)}

                  </div>

                  {/* Product Info */}
                  <div className="cart-item-info" style={{ flex: 1 }}>
                    <h4 style={{
                      fontSize: '18px',
                      fontWeight: 600,
                      marginBottom: 'var(--spacing-sm)',
                      color: 'var(--dark)'
                    }}>
                      {item.name}
                    </h4>
                    
                    <div className="cart-item-meta" style={{
                      fontSize: '13px',
                      color: 'var(--gray-500)',
                      marginBottom: 'var(--spacing-md)'
                    }}>
                      <span style={{ color: 'var(--success)', fontWeight: 600 }}>In Stock ✓</span>
                    </div>

                    {/* Price per unit */}
                    <div style={{
                      fontSize: '14px',
                      color: 'var(--gray-700)',
                      marginBottom: 'var(--spacing-md)'
                    }}>
                      Price: <strong>{formatPrice(item.price)}</strong>
                    </div>

                    {/* Quantity Controls */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--spacing-lg)',
                      flexWrap: 'wrap'
                    }}>
                      <div className="quantity-controls">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          style={{
                            opacity: item.quantity <= 1 ? 0.5 : 1,
                            cursor: item.quantity <= 1 ? 'not-allowed' : 'pointer'
                          }}
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          disabled={item.quantity >= 10}
                        >
                          +
                        </button>
                      </div>

                      <button
                        className="remove-btn"
                        onClick={() => removeFromCart(item.productId)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6"/>
                          <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                          <line x1="10" y1="11" x2="10" y2="17"/>
                          <line x1="14" y1="11" x2="14" y2="17"/>
                        </svg>
                        Remove
                      </button>

                      {/* Save for later option */}
                      <button style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--primary)',
                        fontSize: '13px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '4px 0',
                        transition: 'color var(--transition-fast)'
                      }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
                        </svg>
                        Save for Later
                      </button>
                    </div>
                  </div>

                  {/* Item Total Price */}
                  <div className="cart-item-price" style={{ textAlign: 'right' }}>
                    <div className="item-price" style={{
                      fontSize: '24px',
                      fontWeight: 700,
                      color: 'var(--primary)',
                      fontFamily: "'Bebas Neue', sans-serif",
                      letterSpacing: '0.5px',
                      marginBottom: 'var(--spacing-xs)'
                    }}>
                      {formatPrice(item.price * item.quantity)}
                    </div>
                    {item.quantity > 1 && (
                      <div style={{
                        fontSize: '12px',
                        color: 'var(--gray-500)'
                      }}>
                        {item.quantity} × {formatPrice(item.price)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Shopping Button */}
            <Link href="/products" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              marginTop: 'var(--spacing-lg)',
              color: 'var(--primary)',
              textDecoration: 'none',
              fontSize: '15px',
              fontWeight: 600,
              transition: 'gap var(--transition-base)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.gap = '12px';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.gap = '8px';
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Continue Shopping
            </Link>
          </div>

          {/* Order Summary Sidebar */}
          <div className="cart-summary">
            <h3 style={{
              fontSize: '20px',
              fontWeight: 700,
              marginBottom: 'var(--spacing-lg)',
              fontFamily: "'Bebas Neue', sans-serif",
              letterSpacing: '0.5px',
              color: 'var(--dark)'
            }}>
              Order Summary
            </h3>

            {/* Coupon Code */}
            <div style={{
              marginBottom: 'var(--spacing-lg)',
              padding: 'var(--spacing-md)',
              background: 'var(--bg-primary)',
              borderRadius: 'var(--radius-md)',
              border: '1px dashed var(--gray-300)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-sm)',
                marginBottom: 'var(--spacing-sm)'
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
                  <polyline points="7.5 4.21 12 6.81 16.5 4.21"/>
                  <polyline points="7.5 19.79 7.5 14.6 3 12"/>
                  <polyline points="21 12 16.5 14.6 16.5 19.79"/>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                  <line x1="12" y1="22.08" x2="12" y2="12"/>
                </svg>
                <span style={{ fontWeight: 600, fontSize: '14px' }}>Have a coupon code?</span>
              </div>
              <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                <input
                  type="text"
                  placeholder="Enter code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  disabled={appliedCoupon !== null}
                  style={{
                    flex: 1,
                    padding: '10px 12px',
                    fontSize: '14px',
                    border: '1px solid var(--gray-300)',
                    borderRadius: 'var(--radius-sm)',
                    margin: 0
                  }}
                />
                <button
                  onClick={applyCoupon}
                  disabled={appliedCoupon !== null}
                  style={{
                    background: appliedCoupon ? 'var(--success)' : 'var(--dark)',
                    color: 'var(--white)',
                    padding: '10px 16px',
                    border: 'none',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: appliedCoupon ? 'default' : 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {appliedCoupon ? '✓ Applied' : 'Apply'}
                </button>
              </div>
              {appliedCoupon && (
                <div style={{
                  marginTop: 'var(--spacing-sm)',
                  fontSize: '12px',
                  color: 'var(--success)',
                  fontWeight: 600
                }}>
                  ✓ Coupon &ldquo;{appliedCoupon}&rdquo; applied successfully!
                </div>
              )}
            </div>

            {/* Price Breakdown */}
            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
              <div className="summary-row">
                <span>Subtotal ({items.length} items)</span>
                <span style={{ fontWeight: 600 }}>{formatPrice(subtotal)}</span>
              </div>

              {appliedCoupon && (
                <div className="summary-row" style={{ color: 'var(--success)' }}>
                  <span>Discount (10% off)</span>
                  <span style={{ fontWeight: 600 }}>-{formatPrice(discount)}</span>
                </div>
              )}

              <div className="summary-row">
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  Shipping
                  {shipping === 0 && (
                    <span style={{
                      background: 'var(--success)',
                      color: 'var(--white)',
                      fontSize: '10px',
                      padding: '2px 6px',
                      borderRadius: 'var(--radius-full)',
                      fontWeight: 700
                    }}>
                      FREE
                    </span>
                  )}
                </span>
                <span style={{ fontWeight: 600 }}>
                  {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                </span>
              </div>

              <div className="summary-row">
                <span>Estimated Tax</span>
                <span style={{ fontWeight: 600 }}>{formatPrice(tax)}</span>
              </div>
            </div>

            {/* Total */}
            <div className="summary-row total">
              <span>Total</span>
              <span className="amount">{formatPrice(total)}</span>
            </div>

            {/* Savings Badge */}
            {appliedCoupon && (
              <div style={{
                background: 'linear-gradient(135deg, #06D6A0 0%, #06B58A 100%)',
                color: 'var(--white)',
                padding: 'var(--spacing-md)',
                borderRadius: 'var(--radius-md)',
                textAlign: 'center',
                marginTop: 'var(--spacing-lg)',
                fontSize: '14px',
                fontWeight: 600
              }}>
                🎉 You are saving {formatPrice(discount)}!
              </div>
            )}

            {/* Checkout Button */}
            <Link href="/checkout" className="checkout-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
              Proceed to Checkout
            </Link>

            {/* Secure Checkout Badge */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--spacing-sm)',
              marginTop: 'var(--spacing-lg)',
              fontSize: '13px',
              color: 'var(--gray-500)'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0110 0v4"/>
              </svg>
              Secure Checkout
            </div>

            {/* Payment Methods */}
            <div style={{
              marginTop: 'var(--spacing-lg)',
              paddingTop: 'var(--spacing-lg)',
              borderTop: '1px solid var(--gray-100)'
            }}>
              <p style={{
                fontSize: '12px',
                color: 'var(--gray-500)',
                marginBottom: 'var(--spacing-sm)',
                textAlign: 'center'
              }}>
                We Accept
              </p>
              <div style={{
                display: 'flex',
                gap: 'var(--spacing-sm)',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                {['VISA', 'MC', 'AMEX', 'PayPal'].map((payment) => (
                  <div key={payment} style={{
                    background: 'var(--gray-100)',
                    padding: '6px 10px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '10px',
                    fontWeight: 700,
                    color: 'var(--gray-700)'
                  }}>
                    {payment}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
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
      `}</style>
    </div>
  );
}