"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Menu, X, User, LogOut, PlusCircle, Settings, Shield } from "lucide-react";

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Sign out failed", error);
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Browse Items", path: "/items" },
    { name: "About Us", path: "/about" }
  ];

  return (
    <header className="sticky-nav-wrapper">
      <div className="container">
        <nav className="nav-bar">
          {/* Logo */}
          <Link href="/" className="nav-logo">
            <span className="logo-glow"></span>
            Luxe<span>Space</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="nav-links-desktop">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`nav-link ${pathname === link.path ? "active" : ""}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Controls */}
          <div className="nav-auth-desktop">
            {loading ? (
              <div className="nav-skeleton"></div>
            ) : user ? (
              <div className="dropdown-container" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="user-profile-trigger"
                  aria-label="User menu"
                >
                  <div className="avatar">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt={user.displayName || "User"} />
                    ) : (
                      <span>{user.displayName ? user.displayName[0].toUpperCase() : "U"}</span>
                    )}
                  </div>
                  <span className="user-name-label">{user.displayName || "Profile"}</span>
                </button>

                {dropdownOpen && (
                  <div className="user-dropdown glass animate-fade-in">
                    <div className="dropdown-header">
                      <p className="user-name">{user.displayName || "Luxe Member"}</p>
                      <p className="user-email">{user.email}</p>
                    </div>
                    <div className="dropdown-divider"></div>
                    <Link href="/items/add" className="dropdown-item">
                      <PlusCircle size={16} />
                      Add Product
                    </Link>
                    <Link href="/items/manage" className="dropdown-item">
                      <Settings size={16} />
                      Manage Products
                    </Link>
                    <div className="dropdown-divider"></div>
                    <button onClick={handleLogout} className="dropdown-item logout-btn">
                      <LogOut size={16} />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="auth-buttons">
                <Link href="/login" className="btn btn-secondary nav-btn">
                  Log In
                </Link>
                <Link href="/register" className="btn btn-primary nav-btn">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-toggle"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer glass animate-fade-in">
          <div className="mobile-links">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`mobile-link ${pathname === link.path ? "active" : ""}`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="dropdown-divider"></div>
            
            {loading ? (
              <div className="mobile-loader">Loading session...</div>
            ) : user ? (
              <div className="mobile-user-section">
                <div className="mobile-user-info">
                  <div className="avatar">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt={user.displayName || "User"} />
                    ) : (
                      <span>{user.displayName ? user.displayName[0].toUpperCase() : "U"}</span>
                    )}
                  </div>
                  <div>
                    <p className="user-name">{user.displayName || "Luxe Member"}</p>
                    <p className="user-email">{user.email}</p>
                  </div>
                </div>
                
                <Link href="/items/add" className="mobile-action-link">
                  <PlusCircle size={18} />
                  Add Product
                </Link>
                <Link href="/items/manage" className="mobile-action-link">
                  <Settings size={18} />
                  Manage Products
                </Link>
                
                <button onClick={handleLogout} className="btn btn-danger mobile-logout-btn">
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="mobile-auth-buttons">
                <Link href="/login" className="btn btn-secondary mobile-btn">
                  Log In
                </Link>
                <Link href="/register" className="btn btn-primary mobile-btn">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Embedded CSS specific to Navbar layout. We append this for ease of layout consistency. */}
      <style jsx global>{`
        .sticky-nav-wrapper {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(6, 7, 10, 0.75);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--clr-border);
        }

        .nav-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 70px;
        }

        .nav-logo {
          font-family: var(--font-title);
          font-size: 1.45rem;
          font-weight: 700;
          color: var(--clr-text-main);
          letter-spacing: -0.03em;
          display: flex;
          align-items: center;
          position: relative;
        }

        .nav-logo span {
          color: var(--clr-primary);
        }

        .logo-glow {
          position: absolute;
          width: 30px;
          height: 30px;
          background: var(--clr-primary);
          filter: blur(15px);
          opacity: 0.5;
          z-index: -1;
          left: -5px;
        }

        .nav-links-desktop {
          display: flex;
          align-items: center;
          gap: 32px;
        }

        .nav-link {
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--clr-text-muted);
          position: relative;
          padding: 8px 0;
        }

        .nav-link:hover {
          color: var(--clr-text-main);
        }

        .nav-link.active {
          color: var(--clr-primary-light);
        }

        .nav-link.active::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, var(--clr-primary), var(--clr-secondary));
          border-radius: 2px;
        }

        .nav-auth-desktop {
          display: flex;
          align-items: center;
        }

        .nav-skeleton {
          width: 120px;
          height: 38px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: var(--radius-sm);
          animation: pulse 1.5s infinite ease-in-out;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }

        .auth-buttons {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .nav-btn {
          padding: 8px 18px !important;
          font-size: 0.85rem !important;
        }

        .dropdown-container {
          position: relative;
        }

        .user-profile-trigger {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--clr-border);
          padding: 6px 14px;
          border-radius: 50px;
          cursor: pointer;
          color: var(--clr-text-main);
          font-family: var(--font-body);
          font-size: 0.9rem;
          font-weight: 500;
          transition: var(--transition-smooth);
        }

        .user-profile-trigger:hover {
          background: rgba(255, 255, 255, 0.07);
          border-color: var(--clr-primary-light);
        }

        .avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--clr-primary), var(--clr-secondary));
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 0.8rem;
          color: var(--clr-text-dark);
          overflow: hidden;
        }

        .avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .user-dropdown {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          width: 220px;
          border-radius: var(--radius-md);
          padding: 8px;
          z-index: 110;
        }

        .dropdown-header {
          padding: 12px 12px 8px;
        }

        .dropdown-header .user-name {
          font-weight: 600;
          font-size: 0.95rem;
          color: var(--clr-text-main);
          margin-bottom: 2px;
        }

        .dropdown-header .user-email {
          font-size: 0.75rem;
          color: var(--clr-text-muted);
          word-break: break-all;
        }

        .dropdown-divider {
          height: 1px;
          background: var(--clr-border);
          margin: 6px 0;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: var(--radius-sm);
          font-size: 0.88rem;
          color: var(--clr-text-muted);
          transition: var(--transition-smooth);
          width: 100%;
          background: transparent;
          border: none;
          text-align: left;
          cursor: pointer;
          font-family: var(--font-body);
        }

        .dropdown-item:hover {
          background: rgba(255, 255, 255, 0.05);
          color: var(--clr-text-main);
        }

        .dropdown-item svg {
          color: var(--clr-primary-light);
        }

        .logout-btn:hover {
          background: rgba(239, 68, 68, 0.1);
          color: var(--clr-error);
        }
        .logout-btn:hover svg {
          color: var(--clr-error);
        }

        .mobile-menu-toggle {
          display: none;
          background: transparent;
          border: none;
          color: var(--clr-text-main);
          cursor: pointer;
        }

        .mobile-menu-drawer {
          position: absolute;
          top: 70px;
          left: 0;
          width: 100%;
          z-index: 99;
          padding: 24px;
          border-top: none;
          border-left: none;
          border-right: none;
          border-bottom: 1px solid var(--clr-border);
        }

        .mobile-links {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .mobile-link {
          font-size: 1.1rem;
          font-weight: 500;
          color: var(--clr-text-muted);
          padding: 6px 0;
        }

        .mobile-link.active {
          color: var(--clr-primary-light);
        }

        .mobile-user-section {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .mobile-user-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .mobile-user-info .user-name {
          font-weight: 600;
          color: var(--clr-text-main);
        }

        .mobile-user-info .user-email {
          font-size: 0.8rem;
          color: var(--clr-text-muted);
        }

        .mobile-action-link {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.95rem;
          color: var(--clr-text-muted);
          padding: 8px 0;
        }

        .mobile-logout-btn {
          margin-top: 10px;
        }

        .mobile-auth-buttons {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 8px;
        }

        @media (max-width: 768px) {
          .nav-links-desktop,
          .nav-auth-desktop,
          .user-name-label {
            display: none;
          }

          .mobile-menu-toggle {
            display: block;
          }
        }
      `}</style>
    </header>
  );
}
