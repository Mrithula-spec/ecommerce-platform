"use client";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart";
import { useState } from "react";


export default function HomePage() {
  const categories = [
    { name: 'Electronics', icon: '📱', color: '#FF6B35' },
    { name: 'Fashion', icon: '👔', color: '#004E89' },
    { name: 'Home & Kitchen', icon: '🏠', color: '#FFD23F' },
    { name: 'Beauty', icon: '💄', color: '#06D6A0' },
    { name: 'Sports', icon: '⚽', color: '#F77F00' },
    { name: 'Books', icon: '📚', color: '#EF476F' },
  ];

  const features = [
    { icon: '🚚', title: 'Free Shipping', description: 'On orders over $50' },
    { icon: '🔒', title: 'Secure Payment', description: '100% protected' },
    { icon: '↩️', title: 'Easy Returns', description: '30-day guarantee' },
    { icon: '💬', title: '24/7 Support', description: 'Always here to help' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #FF6B35 0%, #004E89 100%)',
        padding: 'var(--spacing-3xl) 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.3
        }} />
        
        <div className="container" style={{ 
          position: 'relative', 
          zIndex: 1,
          textAlign: 'center',
          color: 'var(--white)'
        }}>
          <h1 style={{
            fontSize: '64px',
            fontWeight: 700,
            marginBottom: 'var(--spacing-lg)',
            fontFamily: "'Bebas Neue', sans-serif",
            letterSpacing: '2px',
            lineHeight: 1.1,
            animation: 'fadeInUp 0.6s ease-out'
          }}>
            Shop Everything<br/>You Need, All in One Place
          </h1>
          <p style={{
            fontSize: '20px',
            marginBottom: 'var(--spacing-2xl)',
            opacity: 0.95,
            maxWidth: '600px',
            margin: '0 auto var(--spacing-2xl)',
            animation: 'fadeInUp 0.6s ease-out 0.2s both'
          }}>
            Discover millions of products at unbeatable prices. Quality guaranteed. Fast shipping worldwide.
          </p>
          <div style={{
            display: 'flex',
            gap: 'var(--spacing-md)',
            justifyContent: 'center',
            flexWrap: 'wrap',
            animation: 'fadeInUp 0.6s ease-out 0.4s both'
          }}>
            <Link href="/products" style={{
              background: 'var(--white)',
              color: 'var(--dark)',
              padding: '16px 40px',
              borderRadius: 'var(--radius-lg)',
              fontWeight: 700,
              fontSize: '16px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all var(--transition-base)',
              boxShadow: 'var(--shadow-lg)'
            }}>
              Browse Products
              <span>→</span>
            </Link>
            <Link href="/deals" style={{
              background: 'transparent',
              color: 'var(--white)',
              padding: '16px 40px',
              borderRadius: 'var(--radius-lg)',
              fontWeight: 700,
              fontSize: '16px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              border: '2px solid var(--white)',
              transition: 'all var(--transition-base)'
            }}>
              Todays Deals
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{
        padding: 'var(--spacing-2xl) 0',
        background: 'var(--white)',
        borderBottom: '1px solid var(--gray-100)'
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 'var(--spacing-xl)'
          }}>
            {features.map((feature, index) => (
              <div key={index} style={{
                textAlign: 'center',
                padding: 'var(--spacing-lg)',
                animation: `fadeInUp 0.6s ease-out ${0.2 * index}s both`
              }}>
                <div style={{
                  fontSize: '48px',
                  marginBottom: 'var(--spacing-md)'
                }}>
                  {feature.icon}
                </div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  marginBottom: 'var(--spacing-sm)',
                  color: 'var(--dark)'
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: 'var(--gray-500)'
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section style={{ padding: 'var(--spacing-3xl) 0' }}>
        <div className="container">
          <h2 style={{
            fontSize: '40px',
            fontWeight: 700,
            textAlign: 'center',
            marginBottom: 'var(--spacing-2xl)',
            fontFamily: "'Bebas Neue', sans-serif",
            letterSpacing: '1px',
            color: 'var(--dark)'
          }}>
            Shop by Category
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'var(--spacing-lg)'
          }}>
            {categories.map((category, index) => (
              <Link
                key={category.name}
                href={`/products?category=${category.name.toLowerCase()}`}
                style={{
                  background: 'var(--white)',
                  padding: 'var(--spacing-xl)',
                  borderRadius: 'var(--radius-xl)',
                  textAlign: 'center',
                  textDecoration: 'none',
                  border: '2px solid var(--gray-100)',
                  transition: 'all var(--transition-base)',
                  position: 'relative',
                  overflow: 'hidden',
                  animation: `fadeInUp 0.6s ease-out ${0.1 * index}s both`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.borderColor = category.color;
                  e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'var(--gray-100)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  fontSize: '56px',
                  marginBottom: 'var(--spacing-md)',
                  filter: 'grayscale(20%)'
                }}>
                  {category.icon}
                </div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: 'var(--dark)',
                  marginBottom: 'var(--spacing-xs)'
                }}>
                  {category.name}
                </h3>
                <p style={{
                  fontSize: '13px',
                  color: 'var(--gray-500)',
                  fontWeight: 500
                }}>
                  Explore now →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section style={{
        background: 'linear-gradient(135deg, #FFD23F 0%, #F77F00 100%)',
        padding: 'var(--spacing-3xl) 0',
        marginTop: 'var(--spacing-2xl)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M0 40L40 0H20L0 20M40 40V20L20 40\'/%3E%3C/g%3E%3C/svg%3E")'
        }} />
        
        <div className="container" style={{ 
          position: 'relative', 
          zIndex: 1,
          textAlign: 'center' 
        }}>
          <h2 style={{
            fontSize: '48px',
            fontWeight: 700,
            marginBottom: 'var(--spacing-md)',
            fontFamily: "'Bebas Neue', sans-serif",
            letterSpacing: '2px',
            color: 'var(--dark)'
          }}>
            Flash Sale Alert! 🔥
          </h2>
          <p style={{
            fontSize: '20px',
            marginBottom: 'var(--spacing-xl)',
            color: 'var(--dark)',
            fontWeight: 500
          }}>
            Up to 70% OFF on selected items. Limited time only!
          </p>
          <Link href="/deals" style={{
            background: 'var(--dark)',
            color: 'var(--white)',
            padding: '16px 48px',
            borderRadius: 'var(--radius-lg)',
            fontWeight: 700,
            fontSize: '16px',
            textDecoration: 'none',
            display: 'inline-block',
            transition: 'all var(--transition-base)',
            boxShadow: 'var(--shadow-xl)'
          }}>
            Shop Flash Deals Now
          </Link>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
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