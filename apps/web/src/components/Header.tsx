"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/lib/cart";
import { useSearchParams } from "next/navigation";
import { getToken, logout } from "@/lib/auth";
import { useState } from "react";

export default function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isAuthenticated = Boolean(getToken());
  const { items } = useCart();
  const totalQuantity = items.reduce(
  (sum, item) => sum + item.quantity,
  0
);
  const [searchQuery, setSearchQuery] = useState(
  searchParams.get("search") || ""
  
);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function handleLogout() {
    logout();
    router.push("/login");
  }

function handleSearch(e: React.FormEvent) {
  e.preventDefault();

  if (searchQuery.trim() === "") {
    router.push("/products");
  } else {
    router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
  }
}


  return (
    <header style={{ 
      background: 'var(--white)', 
      borderBottom: '1px solid var(--gray-100)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: 'var(--shadow-sm)'
    }}>
      {/* Top Bar */}
      <div style={{ 
        background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
        padding: '8px 0',
        color: 'var(--white)',
        fontSize: '13px',
        textAlign: 'center',
        fontWeight: 500
      }}>
        🎉 Free Shipping on Orders Over $50 | 30-Day Money Back Guarantee
      </div>

      {/* Main Header */}
      <div className="container" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 'var(--spacing-xl)',
        padding: 'var(--spacing-md) var(--spacing-lg)',
        flexWrap: 'wrap'
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center" }}>
  <Image
    src="/logo.png"
    alt="E-Shop Logo"
    width={140}
    height={90}
    priority
    style={{ objectFit: "contain" }}
  />
</Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} style={{ 
          flex: 1,
          maxWidth: '600px',
          position: 'relative',
          display: 'flex'
        }}>
          <input
            type="search"
            placeholder="Search for products, brands and more..."
            value={searchQuery}
          onChange={(e) => {
  const value = e.target.value;
  setSearchQuery(value);

  if (value.trim() === "") {
    router.push("/products");
  } else {
    router.push(`/products?search=${encodeURIComponent(value)}`);
  }
}}

            style={{
              width: '100%',
              padding: '12px 48px 12px 20px',
              border: '2px solid var(--gray-300)',
              borderRadius: 'var(--radius-full)',
              fontSize: '14px',
              transition: 'all var(--transition-base)',
              margin: 0,
              background: 'var(--bg-primary)'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--primary)';
              e.target.style.boxShadow = '0 0 0 3px rgba(255, 107, 53, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--gray-300)';
              e.target.style.boxShadow = 'none';
            }}
          />
          <button type="submit" style={{
            position: 'absolute',
            right: '4px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'var(--primary)',
            color: 'var(--white)',
            border: 'none',
            borderRadius: 'var(--radius-full)',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all var(--transition-base)'
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </button>
        </form>

        {/* Navigation */}
        <nav style={{ 
          display: 'flex', 
          gap: 'var(--spacing-lg)',
          alignItems: 'center',
          marginLeft: 'auto'
        }}>
          {isAuthenticated ? (
            <>
              <Link href="/products" style={{
                color: 'var(--dark)',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: '15px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'color var(--transition-fast)'
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <path d="M3 9h18"/>
                  <path d="M9 21V9"/>
                </svg>
                Products
              </Link>

              <Link href="/cart" style={{
                color: 'var(--dark)',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: '15px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                position: 'relative',
                transition: 'color var(--transition-fast)'
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1"/>
                  <circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                Cart
                {totalQuantity > 0 && (
  <span style={{
    position: 'absolute',
    top: '-8px',
    right: '-12px',
    background: 'var(--error)',
    color: 'var(--white)',
    fontSize: '11px',
    fontWeight: 700,
    borderRadius: 'var(--radius-full)',
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}>
    {totalQuantity}
  </span>
)}
              </Link>

              <button onClick={handleLogout} style={{
                background: 'var(--dark)',
                color: 'var(--white)',
                border: 'none',
                padding: '10px 20px',
                borderRadius: 'var(--radius-md)',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all var(--transition-base)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" style={{
                background: 'var(--primary)',
                color: 'var(--white)',
                border: 'none',
                padding: '10px 24px',
                borderRadius: 'var(--radius-md)',
                fontWeight: 600,
                fontSize: '14px',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'all var(--transition-base)'
              }}>
                Sign In
              </Link>
            </>
          )}
        </nav>
      </div>

      {/* Categories Bar */}
      <div style={{
        background: 'var(--bg-primary)',
        borderTop: '1px solid var(--gray-100)',
        padding: 'var(--spacing-sm) 0'
      }}>
        <div className="container" style={{
          display: 'flex',
          gap: 'var(--spacing-xl)',
          overflowX: 'auto',
          padding: '0 var(--spacing-lg)'
        }}>
          {['Electronics', 'Fashion', 'Home & Kitchen', 'Beauty', 'Sports', 'Books', 'Toys'].map((category) => (
            <Link 
              key={category}
              href={`/products?category=${category.toLowerCase()}`}
              style={{
                color: 'var(--gray-700)',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 500,
                whiteSpace: 'nowrap',
                padding: 'var(--spacing-sm) 0',
                transition: 'color var(--transition-fast)',
                borderBottom: '2px solid transparent'
              }}
            >
              {category}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}