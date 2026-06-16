"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getProducts } from "@/utils/storage";
import { Search, SlidersHorizontal, RefreshCw, X, ShoppingBag } from "lucide-react";

export default function ItemsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(1000);

  // Load products from storage on mount
  useEffect(() => {
    const data = getProducts();
    setProducts(data);
    setFilteredProducts(data);
  }, []);

  // Update filtered list when search, category, or price change
  useEffect(() => {
    let result = products;

    // Search query filter
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.shortDesc.toLowerCase().includes(q) ||
          p.fullDesc.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Price filter
    result = result.filter((p) => p.price <= maxPrice);

    setFilteredProducts(result);
  }, [searchQuery, selectedCategory, maxPrice, products]);

  const categories = [
    "All",
    "Audio & Sound",
    "Smart Wearables",
    "Minimalist Workspace",
    "Ambient Lighting"
  ];

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setMaxPrice(1000);
  };

  return (
    <div className="catalog-page-wrapper">
      <div className="glow-accent" style={{ top: "15%", right: "5%" }}></div>
      <div className="glow-accent" style={{ bottom: "25%", left: "5%" }}></div>

      <div className="container">
        {/* Page Header */}
        <div className="catalog-header animate-fade-in">
          <span className="badge">Luxe Directory</span>
          <h1 className="text-gradient">Explore Premium Curations</h1>
          <p>Search, filter, and discover state-of-the-art smart accessories and furniture.</p>
        </div>

        {/* Filter Controls Bar */}
        <div className="filter-controls-panel glass animate-fade-in">
          {/* Search Input */}
          <div className="search-bar-wrapper">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              className="form-input search-input"
              placeholder="Search by name, description, keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")} 
                className="clear-search-btn"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Core Multi-Field Filters */}
          <div className="filters-row">
            {/* Category selection */}
            <div className="filter-field">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Price slider */}
            <div className="filter-field price-filter-field">
              <div className="price-label-row">
                <label className="form-label">Max Price</label>
                <span className="price-value">${maxPrice}</span>
              </div>
              <input
                type="range"
                className="price-range-slider"
                min="50"
                max="1000"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
              <div className="price-slider-limits">
                <span>$50</span>
                <span>$1000</span>
              </div>
            </div>

            {/* Reset button */}
            <button
              onClick={handleResetFilters}
              className="btn btn-secondary reset-filters-btn"
              title="Reset Filters"
            >
              <RefreshCw size={16} />
              Reset
            </button>
          </div>
        </div>

        {/* Catalog Grid */}
        <div className="catalog-grid-wrapper animate-fade-in">
          <div className="catalog-results-summary">
            <p>Showing <strong>{filteredProducts.length}</strong> of {products.length} products</p>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="catalog-grid">
              {filteredProducts.map((product) => (
                <div key={product.id} className="card glass product-card">
                  <div className="card-image-wrapper">
                    <img src={product.imageUrl} alt={product.title} />
                    <span className="card-price-tag">${product.price}</span>
                  </div>
                  <div className="card-content">
                    <span className="badge category-badge">{product.category}</span>
                    <h3>{product.title}</h3>
                    <p className="card-short-desc">{product.shortDesc}</p>
                    <div className="card-footer-cta">
                      <Link href={`/items/${product.id}`} className="btn btn-secondary view-details-btn">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-results-panel glass text-center">
              <ShoppingBag size={48} className="empty-results-icon" />
              <h3>No Products Match Your Criteria</h3>
              <p>Try resetting your filters or adjusting your search keywords to find items.</p>
              <button onClick={handleResetFilters} className="btn btn-primary">
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .catalog-page-wrapper {
          min-height: 100vh;
          padding: 60px 0 100px;
          position: relative;
        }

        .text-center {
          text-align: center;
        }

        .catalog-header {
          margin-bottom: 40px;
          text-align: center;
        }

        .catalog-header h1 {
          font-size: 2.8rem;
          margin-top: 10px;
          margin-bottom: 12px;
        }

        .catalog-header p {
          font-size: 1.05rem;
          color: var(--clr-text-muted);
        }

        /* Filter Controls Panel */
        .filter-controls-panel {
          padding: 24px;
          border-radius: var(--radius-md);
          margin-bottom: 40px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          position: relative;
          z-index: 10;
        }

        .search-bar-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
        }

        .search-icon {
          position: absolute;
          left: 16px;
          color: var(--clr-text-muted);
        }

        .search-input {
          padding-left: 48px;
          height: 48px;
          border-radius: var(--radius-sm);
        }

        .clear-search-btn {
          position: absolute;
          right: 16px;
          background: transparent;
          border: none;
          color: var(--clr-text-muted);
          cursor: pointer;
          padding: 4px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition-smooth);
        }

        .clear-search-btn:hover {
          background: rgba(255, 255, 255, 0.05);
          color: var(--clr-text-main);
        }

        .filters-row {
          display: grid;
          grid-template-columns: 1fr 1.5fr auto;
          gap: 24px;
          align-items: flex-end;
        }

        .filter-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .price-label-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .price-value {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--clr-primary-light);
        }

        .price-range-slider {
          -webkit-appearance: none;
          width: 100%;
          height: 6px;
          border-radius: 5px;
          background: rgba(255, 255, 255, 0.1);
          outline: none;
          transition: var(--transition-smooth);
        }

        .price-range-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--clr-primary);
          cursor: pointer;
          border: 2px solid var(--clr-text-main);
          box-shadow: 0 0 10px rgba(124, 58, 237, 0.5);
          transition: var(--transition-smooth);
        }

        .price-range-slider::-webkit-slider-thumb:hover {
          transform: scale(1.15);
          background: var(--clr-primary-light);
        }

        .price-slider-limits {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: var(--clr-text-muted);
          margin-top: 2px;
        }

        .reset-filters-btn {
          height: 44px;
          padding: 0 20px !important;
        }

        /* Catalog Grid Styling */
        .catalog-results-summary {
          margin-bottom: 20px;
          color: var(--clr-text-muted);
          font-size: 0.9rem;
        }

        .catalog-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
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

        /* Empty states */
        .empty-results-panel {
          padding: 60px 40px;
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          max-width: 500px;
          margin: 40px auto;
        }

        .empty-results-icon {
          color: var(--clr-text-muted);
          opacity: 0.4;
          margin-bottom: 8px;
        }

        .empty-results-panel h3 {
          font-size: 1.4rem;
          color: var(--clr-text-main);
        }

        .empty-results-panel p {
          font-size: 0.95rem;
          margin-bottom: 8px;
        }

        /* Responsive Layouts */
        @media (max-width: 992px) {
          .catalog-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .filters-row {
            grid-template-columns: 1fr 1fr;
          }
          .reset-filters-btn {
            grid-column: span 2;
            width: 100%;
          }
        }

        @media (max-width: 650px) {
          .catalog-grid {
            grid-template-columns: 1fr;
          }
          .filters-row {
            grid-template-columns: 1fr;
          }
          .reset-filters-btn {
            grid-column: span 1;
          }
          .catalog-header h1 {
            font-size: 2.2rem;
          }
        }
      `}</style>
    </div>
  );
}
