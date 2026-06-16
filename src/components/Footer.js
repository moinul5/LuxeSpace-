"use client";

import Link from "next/link";
import { Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer-wrapper">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand-col">
            <Link href="/" className="footer-logo">
              Luxe<span>Space</span>
            </Link>
            <p className="footer-description">
              Curating exceptional smart living tech and organic designer furniture for modern homes. Elevate your everyday space.
            </p>
            <div className="footer-socials">
              <a href="#" aria-label="Twitter" className="social-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className="social-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a href="#" aria-label="GitHub" className="social-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                  <path d="M9 18c-4.51 2-5-2-7-2"/>
                </svg>
              </a>
              <a href="#" aria-label="Website" className="social-icon">
                <Globe size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links-col">
            <h4 className="footer-heading">Navigate</h4>
            <ul className="footer-links-list">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/items">Browse Catalog</Link></li>
              <li><Link href="/about">About LuxeSpace</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="footer-links-col">
            <h4 className="footer-heading">Categories</h4>
            <ul className="footer-links-list">
              <li><Link href="/items?category=Audio+%26+Sound">Audio & Sound</Link></li>
              <li><Link href="/items?category=Smart+Wearables">Wearables</Link></li>
              <li><Link href="/items?category=Minimalist+Workspace">Minimalist Workspace</Link></li>
              <li><Link href="/items?category=Ambient+Lighting">Smart Living</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-links-col">
            <h4 className="footer-heading">Support</h4>
            <ul className="footer-links-list">
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Shipping FAQ</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} LuxeSpace Inc. All rights reserved. Designed for premium aesthetics.</p>
        </div>
      </div>

      <style jsx>{`
        .footer-wrapper {
          background-color: #040507;
          border-top: 1px solid var(--clr-border);
          padding: 60px 0 30px;
          margin-top: auto;
          position: relative;
          z-index: 10;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 48px;
          margin-bottom: 48px;
        }

        .footer-brand-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .footer-logo {
          font-family: var(--font-title);
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--clr-text-main);
          letter-spacing: -0.03em;
        }

        .footer-logo span {
          color: var(--clr-primary);
        }

        .footer-description {
          font-size: 0.9rem;
          color: var(--clr-text-muted);
          max-width: 320px;
          line-height: 1.6;
        }

        .footer-socials {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 8px;
        }

        .social-icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--clr-border);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--clr-text-muted);
          transition: var(--transition-smooth);
        }

        .social-icon:hover {
          color: var(--clr-primary-light);
          background: rgba(124, 58, 237, 0.1);
          border-color: var(--clr-primary);
          transform: translateY(-2px);
        }

        .footer-heading {
          font-family: var(--font-title);
          font-size: 1rem;
          color: var(--clr-text-main);
          font-weight: 600;
          margin-bottom: 20px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .footer-links-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-links-list a {
          font-size: 0.9rem;
          color: var(--clr-text-muted);
          transition: var(--transition-smooth);
        }

        .footer-links-list a:hover {
          color: var(--clr-text-main);
          padding-left: 4px;
        }

        .footer-bottom {
          border-top: 1px solid var(--clr-border);
          padding-top: 24px;
          text-align: center;
        }

        .footer-bottom p {
          font-size: 0.82rem;
          color: var(--clr-text-muted);
        }

        @media (max-width: 992px) {
          .footer-grid {
            grid-template-columns: 1.5fr 1fr 1fr;
            gap: 32px;
          }
        }

        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 36px;
          }
          .footer-description {
            max-width: 100%;
          }
        }
      `}</style>
    </footer>
  );
}
