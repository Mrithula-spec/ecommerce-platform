"use client";

export default function Footer() {
  return (
    <footer style={{ 
      background: 'var(--dark)', 
      color: 'var(--white)',
      marginTop: 'auto'
    }}>
      {/* Newsletter Section */}
      <div style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
        padding: 'var(--spacing-2xl) 0'
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 'var(--spacing-xl)',
          flexWrap: 'wrap'
        }}>
          <div>
            <h3 style={{ 
              fontSize: '24px', 
              fontWeight: 700, 
              marginBottom: 'var(--spacing-sm)',
              fontFamily: "'Bebas Neue', sans-serif",
              letterSpacing: '1px'
            }}>
              Subscribe to our Newsletter
            </h3>
            <p style={{ fontSize: '15px', opacity: 0.9 }}>
              Get the latest deals and exclusive offers delivered to your inbox
            </p>
          </div>
          <form style={{ display: 'flex', gap: 'var(--spacing-sm)', flex: 1, maxWidth: '500px' }}>
            <input
              type="email"
              placeholder="Enter your email address"
              style={{
                flex: 1,
                padding: '14px 20px',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                fontSize: '14px',
                margin: 0
              }}
            />
            <button type="submit" style={{
              background: 'var(--dark)',
              color: 'var(--white)',
              padding: '14px 28px',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all var(--transition-base)'
            }}>
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container" style={{ padding: 'var(--spacing-3xl) var(--spacing-lg)' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 'var(--spacing-2xl)',
          marginBottom: 'var(--spacing-2xl)'
        }}>
          {/* Company Info */}
          <div>
            <h3 style={{ 
              fontSize: '28px', 
              fontWeight: 700,
              marginBottom: 'var(--spacing-md)',
              fontFamily: "'Bebas Neue', sans-serif",
              letterSpacing: '1px',
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              E-SHOP
            </h3>
            <p style={{ 
              fontSize: '14px', 
              lineHeight: 1.7,
              color: 'var(--gray-300)',
              marginBottom: 'var(--spacing-lg)'
            }}>
              Your trusted global e-commerce platform for quality products at unbeatable prices. Shop with confidence!
            </p>
            <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
              {['facebook', 'twitter', 'instagram', 'youtube'].map((social) => (
                <a
                  key={social}
                  href={`#${social}`}
                  style={{
                    width: '40px',
                    height: '40px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--white)',
                    textDecoration: 'none',
                    transition: 'all var(--transition-base)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--primary)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {social[0].toUpperCase()}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ 
              fontSize: '16px', 
              fontWeight: 700,
              marginBottom: 'var(--spacing-lg)',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {['About Us', 'Contact', 'Careers', 'Press', 'Blog'].map((link) => (
                <li key={link} style={{ marginBottom: 'var(--spacing-md)' }}>
                  <a href={`#${link.toLowerCase().replace(' ', '-')}`} style={{
                    color: 'var(--gray-300)',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'color var(--transition-fast)',
                    display: 'inline-block'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--primary)';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--gray-300)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 style={{ 
              fontSize: '16px', 
              fontWeight: 700,
              marginBottom: 'var(--spacing-lg)',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Customer Service
            </h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {['Help Center', 'Track Order', 'Returns', 'Shipping Info', 'Size Guide'].map((link) => (
                <li key={link} style={{ marginBottom: 'var(--spacing-md)' }}>
                  <a href={`#${link.toLowerCase().replace(' ', '-')}`} style={{
                    color: 'var(--gray-300)',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'all var(--transition-fast)',
                    display: 'inline-block'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--primary)';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--gray-300)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 style={{ 
              fontSize: '16px', 
              fontWeight: 700,
              marginBottom: 'var(--spacing-lg)',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Contact Us
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, color: 'var(--gray-300)', fontSize: '14px' }}>
              <li style={{ marginBottom: 'var(--spacing-md)', display: 'flex', alignItems: 'start', gap: '10px' }}>
                <span>📧</span>
                <span>support@eshop.com</span>
              </li>
              <li style={{ marginBottom: 'var(--spacing-md)', display: 'flex', alignItems: 'start', gap: '10px' }}>
                <span>📞</span>
                <span>1-800-ESHOP-24</span>
              </li>
              <li style={{ marginBottom: 'var(--spacing-md)', display: 'flex', alignItems: 'start', gap: '10px' }}>
                <span>📍</span>
                <span>123 Commerce Street<br/>New York, NY 10001</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment & Security */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          paddingTop: 'var(--spacing-xl)',
          marginTop: 'var(--spacing-xl)'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 'var(--spacing-lg)'
          }}>
            <div>
              <p style={{ fontSize: '12px', color: 'var(--gray-500)', marginBottom: 'var(--spacing-sm)' }}>
                We Accept
              </p>
              <div style={{ display: 'flex', gap: 'var(--spacing-sm)', alignItems: 'center' }}>
                {['VISA', 'MC', 'AMEX', 'PayPal'].map((payment) => (
                  <div key={payment} style={{
                    background: 'var(--white)',
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: 'var(--dark)'
                  }}>
                    {payment}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '12px', color: 'var(--gray-500)', marginBottom: 'var(--spacing-sm)' }}>
                Secured by
              </p>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(6, 214, 160, 0.1)',
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--success)'
              }}>
                <span style={{ fontSize: '16px' }}>🔒</span>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--success)' }}>SSL Encrypted</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          marginTop: 'var(--spacing-xl)',
          paddingTop: 'var(--spacing-lg)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--spacing-md)',
          fontSize: '13px',
          color: 'var(--gray-500)'
        }}>
          <p>© 2026 E-Shop. All rights reserved.</p>
          <div style={{ display: 'flex', gap: 'var(--spacing-lg)' }}>
            <a href="/privacy" style={{ color: 'var(--gray-300)', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="/terms" style={{ color: 'var(--gray-300)', textDecoration: 'none' }}>Terms of Service</a>
            <a href="/cookies" style={{ color: 'var(--gray-300)', textDecoration: 'none' }}>Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}