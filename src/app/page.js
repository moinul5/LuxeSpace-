"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProducts } from "@/utils/storage";
import { ArrowRight, ShieldCheck, Truck, Sparkles, Headphones, Layers, Users, Star, ArrowUpRight } from "lucide-react";

export default function LandingPage() {
  const [trendingItems, setTrendingItems] = useState([]);

  useEffect(() => {
    // Get the first 3 products to display in the trending section
    const products = getProducts();
    setTrendingItems(products.slice(0, 3));
  }, []);

  const features = [
    {
      icon: <Truck size={24} className="feature-icon-svg" />,
      title: "Insured Global Delivery",
      description: "Secure, tracked shipping on all orders worldwide, with bespoke wooden padding for fragile designer furniture."
    },
    {
      icon: <ShieldCheck size={24} className="feature-icon-svg" />,
      title: "End-to-End Secure Payments",
      description: "State-of-the-art encrypted gateway supports credit cards, Google Pay, and major cryptos."
    },
    {
      icon: <Sparkles size={24} className="feature-icon-svg" />,
      title: "Bespoke Curated Catalog",
      description: "Every item is rigorously reviewed for acoustic profile, ergonomic performance, and structural integrity."
    },
    {
      icon: <Headphones size={24} className="feature-icon-svg" />,
      title: "24/7 Expert Concierge",
      description: "Direct line to spatial designers and smart home engineers to guide your office setups."
    }
  ];

  const stats = [
    { value: "12K+", label: "Deliveries Completed" },
    { value: "99.8%", label: "Satisfaction Rate" },
    { value: "450+", label: "Hand-Picked Gadgets" },
    { value: "4.9★", label: "Average Customer Rating" }
  ];

  const testimonials = [
    {
      quote: "The Walnut standing desk completely redefined my remote workspace. The wood grains are spectacular and the motor is dead silent.",
      author: "Sarah Jenkins",
      role: "Architect & Spatial Designer",
      rating: 5,
      avatar: "S"
    },
    {
      quote: "Aether headphones have replaced my high-end studio monitors. The acoustic depth is incredible, and they look stunning on my stand.",
      author: "Marcus Chen",
      role: "Principal Tech Lead",
      rating: 5,
      avatar: "M"
    },
    {
      quote: "LuxeSpace is hands-down the best place to find high-end design gadgets. Their shipping is extremely fast and customer care is unmatched.",
      author: "Elena Rostova",
      role: "Interior Stylist",
      rating: 5,
      avatar: "E"
    }
  ];

  return (
    <div className="landing-wrapper">
      <div className="glow-accent" style={{ top: "5%", left: "5%" }}></div>
      <div className="glow-accent" style={{ top: "40%", right: "10%" }}></div>

      {/* 2. Hero Section */}
      <section className="hero-section container">
        <div className="hero-content">
          <span className="hero-tag animate-fade-in">
            <Sparkles size={14} /> Design Meets Technology
          </span>
          <h1 className="hero-title animate-fade-in text-gradient">
            Living in the Future, Designed for Today
          </h1>
          <p className="hero-subtitle animate-fade-in">
            Experience LuxeSpace—a premium, hand-picked catalog of state-of-the-art smart devices, ambient lighting, and organic designer furniture to elevate your home.
          </p>
          <div className="hero-ctas animate-fade-in">
            <Link href="/items" className="btn btn-primary hero-btn">
              Explore Catalog <ArrowRight size={16} />
            </Link>
            <Link href="/about" className="btn btn-secondary hero-btn">
              Our Philosophy
            </Link>
          </div>
        </div>
        
        <div className="hero-visual animate-fade-in">
          <div className="visual-glass-card glass pulse-glow">
            <img 
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800" 
              alt="Premium Sound Headphones"
              className="hero-image"
            />
            <div className="visual-badge glass">
              <span className="badge-dot"></span>
              <span>Trending Item: Aether Sound Pro</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Engineered to Perfection</h2>
            <p className="section-subtitle">
              We focus on premium materials, modern ergonomics, and fluid smart integrations.
            </p>
          </div>

          <div className="features-grid grid">
            {features.map((feature, idx) => (
              <div key={idx} className="feature-card glass">
                <div className="feature-icon-container">
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Trending Items Section */}
      <section className="trending-section container">
        <div className="section-header flex-header">
          <div>
            <h2 className="section-title">Trending Curations</h2>
            <p className="section-subtitle">Discover the most sought-after products this season.</p>
          </div>
          <Link href="/items" className="explore-all-link">
            View All Products <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="trending-grid grid">
          {trendingItems.map((item) => (
            <div key={item.id} className="card glass product-card">
              <div className="card-image-wrapper">
                <img src={item.imageUrl} alt={item.title} />
                <span className="card-price-tag">${item.price}</span>
              </div>
              <div className="card-content">
                <span className="badge category-badge">{item.category}</span>
                <h3>{item.title}</h3>
                <p className="card-short-desc">{item.shortDesc}</p>
                <div className="card-footer-cta">
                  <Link href={`/items/${item.id}`} className="btn btn-secondary view-details-btn">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Stats Banner */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-glass-panel glass">
            <div className="stats-grid">
              {stats.map((stat, idx) => (
                <div key={idx} className="stat-item">
                  <span className="stat-value text-gradient-purple">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Testimonials Section */}
      <section className="testimonials-section container">
        <div className="section-header text-center">
          <h2 className="section-title">Loved by Design Enthusiasts</h2>
          <p className="section-subtitle">
            Read stories from creators and professionals who redesigned their spaces with LuxeSpace.
          </p>
        </div>

        <div className="testimonials-grid grid">
          {testimonials.map((t, idx) => (
            <div key={idx} className="testimonial-card glass">
              <div className="testimonial-rating">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>
              <p className="testimonial-quote">"{t.quote}"</p>
              <div className="testimonial-author">
                <div className="avatar">
                  <span>{t.avatar}</span>
                </div>
                <div>
                  <h4>{t.author}</h4>
                  <p>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive CTA Banner */}
      <section className="cta-banner container">
        <div className="cta-glass-panel glass">
          <div className="cta-banner-content">
            <h2>Ready to Upgrade Your Living Space?</h2>
            <p>Sign up now to start curating items, creating custom product spec sheets, and saving setups.</p>
            <div className="cta-buttons">
              <Link href="/register" className="btn btn-primary cta-btn">
                Create Account Now
              </Link>
              <Link href="/items" className="btn btn-secondary cta-btn">
                Browse Items
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .landing-wrapper {
          padding-bottom: 80px;
          position: relative;
        }

        .text-center {
          text-align: center;
        }

        .section-header {
          margin-bottom: 48px;
        }

        .section-title {
          font-size: 2.2rem;
          color: var(--clr-text-main);
          margin-bottom: 12px;
        }

        .section-subtitle {
          font-size: 1rem;
          color: var(--clr-text-muted);
          max-width: 600px;
          margin: 0 auto;
        }

        .flex-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 20px;
        }

        .explore-all-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--clr-primary-light);
          font-weight: 500;
          font-size: 0.95rem;
          border-bottom: 1px solid transparent;
        }

        .explore-all-link:hover {
          color: var(--clr-secondary);
          border-bottom-color: var(--clr-secondary);
        }

        /* Hero styling */
        .hero-section {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 60px;
          align-items: center;
          padding-top: 80px;
          padding-bottom: 100px;
        }

        .hero-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--clr-primary-light);
          background: rgba(124, 58, 237, 0.1);
          padding: 6px 14px;
          border-radius: 50px;
          border: 1px solid rgba(124, 58, 237, 0.2);
          margin-bottom: 24px;
        }

        .hero-title {
          font-size: 3.8rem;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 20px;
          letter-spacing: -0.03em;
        }

        .hero-subtitle {
          font-size: 1.15rem;
          color: var(--clr-text-muted);
          line-height: 1.6;
          margin-bottom: 36px;
          max-width: 540px;
        }

        .hero-ctas {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .hero-btn {
          height: 48px;
          padding: 0 28px !important;
        }

        .hero-visual {
          position: relative;
          display: flex;
          justify-content: center;
        }

        .visual-glass-card {
          border-radius: var(--radius-lg);
          padding: 16px;
          width: 100%;
          max-width: 420px;
          position: relative;
        }

        .hero-image {
          width: 100%;
          height: auto;
          object-fit: cover;
          border-radius: var(--radius-md);
          display: block;
        }

        .visual-badge {
          position: absolute;
          bottom: 32px;
          left: 32px;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .badge-dot {
          width: 8px;
          height: 8px;
          background: #22c55e;
          border-radius: 50%;
          box-shadow: 0 0 10px #22c55e;
        }

        /* Features styling */
        .features-section {
          background: rgba(255, 255, 255, 0.01);
          border-top: 1px solid var(--clr-border);
          border-bottom: 1px solid var(--clr-border);
          padding: 80px 0;
          margin-bottom: 80px;
        }

        .features-grid {
          grid-template-columns: repeat(4, 1fr);
        }

        .feature-card {
          padding: 32px 24px;
          border-radius: var(--radius-md);
          transition: var(--transition-smooth);
        }

        .feature-card:hover {
          transform: translateY(-4px);
          border-color: var(--clr-primary);
        }

        .feature-icon-container {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-sm);
          background: rgba(124, 58, 237, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          color: var(--clr-primary-light);
        }

        .feature-card h3 {
          font-size: 1.15rem;
          color: var(--clr-text-main);
          margin-bottom: 10px;
        }

        .feature-card p {
          font-size: 0.88rem;
          line-height: 1.6;
        }

        /* Product Cards styling */
        .trending-grid {
          grid-template-columns: repeat(3, 1fr);
          margin-bottom: 80px;
        }

        .product-card {
          border-radius: var(--radius-md);
        }

        .card-image-wrapper {
          position: relative;
          aspect-ratio: 4/3;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.02);
        }

        .card-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition-smooth);
        }

        .product-card:hover .card-image-wrapper img {
          transform: scale(1.05);
        }

        .card-price-tag {
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(6, 7, 10, 0.85);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid var(--clr-border);
          color: var(--clr-text-main);
          padding: 4px 12px;
          border-radius: 50px;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .card-content {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex: 1;
        }

        .category-badge {
          align-self: flex-start;
        }

        .card-content h3 {
          font-size: 1.25rem;
          color: var(--clr-text-main);
        }

        .card-short-desc {
          font-size: 0.9rem;
          color: var(--clr-text-muted);
          line-height: 1.5;
          flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card-footer-cta {
          margin-top: 8px;
        }

        .view-details-btn {
          width: 100%;
        }

        /* Stats section */
        .stats-section {
          padding-bottom: 80px;
        }

        .stats-glass-panel {
          border-radius: var(--radius-lg);
          padding: 48px 24px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          text-align: center;
          gap: 24px;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .stat-value {
          font-family: var(--font-title);
          font-size: 3rem;
          font-weight: 800;
          line-height: 1;
        }

        .stat-label {
          font-size: 0.85rem;
          color: var(--clr-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 500;
        }

        /* Testimonials styling */
        .testimonials-section {
          padding-bottom: 80px;
        }

        .testimonials-grid {
          grid-template-columns: repeat(3, 1fr);
        }

        .testimonial-card {
          padding: 32px;
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .testimonial-rating {
          display: flex;
          gap: 4px;
        }

        .testimonial-quote {
          font-style: italic;
          color: var(--clr-text-muted);
          font-size: 0.95rem;
          line-height: 1.6;
          flex: 1;
        }

        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .testimonial-author h4 {
          font-size: 0.95rem;
          color: var(--clr-text-main);
          margin-bottom: 2px;
        }

        .testimonial-author p {
          font-size: 0.75rem;
          color: var(--clr-text-muted);
        }

        /* CTA Banner styling */
        .cta-banner {
          padding-bottom: 40px;
        }

        .cta-glass-panel {
          border-radius: var(--radius-lg);
          padding: 60px 40px;
          text-align: center;
          background: linear-gradient(135deg, rgba(124, 58, 237, 0.07) 0%, rgba(6, 182, 212, 0.03) 100%), var(--clr-bg-card);
          position: relative;
          overflow: hidden;
        }

        .cta-glass-panel::before {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(124, 58, 237, 0.05) 0%, transparent 60%);
          pointer-events: none;
        }

        .cta-banner-content {
          max-width: 600px;
          margin: 0 auto;
          position: relative;
          z-index: 10;
        }

        .cta-banner-content h2 {
          font-size: 2.2rem;
          color: var(--clr-text-main);
          margin-bottom: 16px;
        }

        .cta-banner-content p {
          font-size: 1.05rem;
          margin-bottom: 30px;
        }

        .cta-buttons {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
        }

        .cta-btn {
          height: 46px;
          padding: 0 24px !important;
        }

        /* Responsive breakpoints */
        @media (max-width: 992px) {
          .hero-section {
            grid-template-columns: 1fr;
            gap: 40px;
            padding-top: 40px;
            padding-bottom: 60px;
            text-align: center;
          }
          .hero-content {
            align-items: center;
          }
          .hero-title {
            font-size: 3rem;
          }
          .hero-subtitle {
            max-width: 100%;
          }
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .trending-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 40px;
          }
          .testimonials-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 600px) {
          .hero-title {
            font-size: 2.3rem;
          }
          .features-grid {
            grid-template-columns: 1fr;
          }
          .trending-grid {
            grid-template-columns: 1fr;
          }
          .stats-grid {
            grid-template-columns: 1fr;
          }
          .cta-buttons {
            flex-direction: column;
            gap: 12px;
          }
          .cta-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
