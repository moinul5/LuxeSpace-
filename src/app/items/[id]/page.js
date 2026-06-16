"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { getProductById, getRelatedProducts } from "@/utils/storage";
import { ArrowLeft, Tag, Calendar, ShieldCheck, CornerDownLeft, Star } from "lucide-react";

export default function ItemDetailsPage({ params }) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    const item = getProductById(productId);
    setProduct(item);
    if (item) {
      const relatedItems = getRelatedProducts(productId, item.category);
      setRelated(relatedItems);
    }
  }, [productId]);

  if (!product) {
    return (
      <div className="details-loader-panel container text-center animate-fade-in">
        <div className="loader-spinner"></div>
        <h2>Loading product details...</h2>
        <p>Curating space specifications for you.</p>
        <Link href="/items" className="btn btn-secondary mt-20">
          <ArrowLeft size={16} /> Back to Catalog
        </Link>
        <style jsx>{`
          .details-loader-panel {
            padding: 100px 20px;
            min-height: 50vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 16px;
          }
          .loader-spinner {
            width: 48px;
            height: 48px;
            border: 4px solid rgba(255, 255, 255, 0.05);
            border-top: 4px solid var(--clr-primary);
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .mt-20 { margin-top: 20px; }
        `}</style>
      </div>
    );
  }

  // Format creation date
  const formattedDate = new Date(product.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return (
    <div className="details-page-wrapper">
      <div className="glow-accent" style={{ top: "10%", left: "10%" }}></div>
      <div className="glow-accent" style={{ bottom: "10%", right: "10%" }}></div>

      <div className="container">
        {/* Back navigation */}
        <div className="back-nav-bar animate-fade-in">
          <Link href="/items" className="btn btn-secondary back-btn">
            <ArrowLeft size={16} />
            Back to Browse
          </Link>
        </div>

        {/* Core details structure */}
        <div className="details-grid animate-fade-in">
          {/* Left image column */}
          <div className="image-column">
            <div className="image-glass-card glass">
              <img src={product.imageUrl} alt={product.title} className="details-main-img" />
              <div className="image-glass-accent"></div>
            </div>
          </div>

          {/* Right text details column */}
          <div className="content-column glass">
            <div className="details-header">
              <span className="badge category-badge">{product.category}</span>
              <h1 className="details-title">{product.title}</h1>
              
              <div className="details-rating-row">
                <div className="rating-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      fill={i < Math.floor(product.rating) ? "#f59e0b" : "none"} 
                      color={i < Math.floor(product.rating) ? "#f59e0b" : "var(--clr-text-muted)"} 
                    />
                  ))}
                  <span className="rating-value">{product.rating} / 5.0</span>
                </div>
              </div>

              <div className="details-price-banner">
                <span className="price-label">Price Tag</span>
                <span className="price-value">${product.price}</span>
              </div>
            </div>

            <div className="details-divider"></div>

            <div className="details-body">
              <h3>Description</h3>
              <p className="full-desc">{product.fullDesc}</p>

              <div className="additional-meta-row">
                <div className="meta-item">
                  <Tag size={16} />
                  <span>Category: <strong>{product.category}</strong></span>
                </div>
                <div className="meta-item">
                  <Calendar size={16} />
                  <span>Listed: <strong>{formattedDate}</strong></span>
                </div>
                <div className="meta-item">
                  <ShieldCheck size={16} />
                  <span>Auth Owner: <strong>{product.authorId === "admin" ? "LuxeSpace Curator" : "Registered User"}</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications Section */}
        {product.specs && product.specs.length > 0 && (
          <div className="specs-section glass animate-fade-in">
            <h2>Technical Specifications</h2>
            <p className="specs-subtitle">Material composition, connectivity standards, and dimensions.</p>
            <div className="specs-table-container">
              <table className="specs-table">
                <tbody>
                  {product.specs.map((spec, idx) => (
                    <tr key={idx}>
                      <td className="spec-label">{spec.label}</td>
                      <td className="spec-value">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Related items Section */}
        {related.length > 0 && (
          <div className="related-section animate-fade-in">
            <h2 className="related-title">You May Also Appreciate</h2>
            <div className="related-grid grid">
              {related.map((item) => (
                <div key={item.id} className="card glass related-card">
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
          </div>
        )}
      </div>

      <style jsx>{`
        .details-page-wrapper {
          padding: 40px 0 100px;
          position: relative;
          min-height: 100vh;
        }

        .back-nav-bar {
          margin-bottom: 30px;
        }

        .back-btn {
          height: 40px;
          padding: 0 16px !important;
        }

        /* Grid configuration */
        .details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          margin-bottom: 60px;
        }

        .image-column {
          display: flex;
          flex-direction: column;
        }

        .image-glass-card {
          border-radius: var(--radius-lg);
          padding: 16px;
          position: relative;
          overflow: hidden;
          aspect-ratio: 4/3;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--clr-bg-card);
        }

        .details-main-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: var(--radius-md);
          display: block;
        }

        .image-glass-accent {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, transparent 100%);
          pointer-events: none;
        }

        /* Right column content card */
        .content-column {
          padding: 40px;
          border-radius: var(--radius-lg);
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .details-title {
          font-size: 2.5rem;
          color: var(--clr-text-main);
          margin-top: 12px;
          margin-bottom: 12px;
        }

        .details-rating-row {
          margin-bottom: 20px;
        }

        .rating-stars {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .rating-value {
          font-size: 0.85rem;
          color: var(--clr-text-muted);
          font-weight: 600;
          margin-left: 6px;
        }

        .details-price-banner {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--clr-border);
          border-radius: var(--radius-sm);
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .price-label {
          font-size: 0.9rem;
          color: var(--clr-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 500;
        }

        .price-value {
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--clr-primary-light);
          font-family: var(--font-title);
        }

        .details-divider {
          height: 1px;
          background: var(--clr-border);
        }

        .details-body h3 {
          font-size: 1.15rem;
          margin-bottom: 12px;
          color: var(--clr-text-main);
        }

        .full-desc {
          font-size: 0.95rem;
          line-height: 1.7;
          margin-bottom: 30px;
        }

        .additional-meta-row {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--clr-text-muted);
          font-size: 0.88rem;
        }

        .meta-item svg {
          color: var(--clr-primary-light);
        }

        /* Specifications layout */
        .specs-section {
          padding: 40px;
          border-radius: var(--radius-lg);
          margin-bottom: 60px;
        }

        .specs-section h2 {
          font-size: 1.7rem;
          color: var(--clr-text-main);
          margin-bottom: 6px;
        }

        .specs-subtitle {
          font-size: 0.9rem;
          color: var(--clr-text-muted);
          margin-bottom: 24px;
        }

        .specs-table-container {
          border: 1px solid var(--clr-border);
          border-radius: var(--radius-sm);
          overflow: hidden;
        }

        .specs-table {
          width: 100%;
          border-collapse: collapse;
        }

        .specs-table td {
          padding: 14px 20px;
          font-size: 0.92rem;
          border-bottom: 1px solid var(--clr-border);
        }

        .specs-table tr:last-child td {
          border-bottom: none;
        }

        .spec-label {
          background: rgba(255, 255, 255, 0.01);
          color: var(--clr-text-main);
          font-weight: 600;
          font-family: var(--font-title);
          width: 250px;
          border-right: 1px solid var(--clr-border);
        }

        .spec-value {
          color: var(--clr-text-muted);
        }

        /* Related items layout */
        .related-section {
          margin-top: 40px;
        }

        .related-title {
          font-size: 1.8rem;
          color: var(--clr-text-main);
          margin-bottom: 24px;
        }

        .related-grid {
          grid-template-columns: repeat(3, 1fr);
        }

        .related-card {
          border-radius: var(--radius-md);
        }

        .card-image-wrapper {
          position: relative;
          aspect-ratio: 4/3;
          overflow: hidden;
        }

        .card-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition-smooth);
        }

        .related-card:hover .card-image-wrapper img {
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

        /* Responsive breakpoints */
        @media (max-width: 992px) {
          .details-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .image-glass-card {
            aspect-ratio: 16/9;
          }
          .related-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .content-column, .specs-section {
            padding: 24px 16px;
          }
          .spec-label {
            width: 120px;
          }
          .related-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
