"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getProducts, deleteProduct } from "@/utils/storage";
import Toast from "@/components/Toast";
import { Eye, Trash2, ArrowLeft, RefreshCcw, EyeOff, Calendar, DollarSign, Package } from "lucide-react";
import Link from "next/link";

export default function ManageItemsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [toast, setToast] = useState(null);

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  // Load products
  const loadProducts = () => {
    const data = getProducts();
    setProducts(data);
  };

  useEffect(() => {
    if (user) {
      loadProducts();
    }
  }, [user]);

  const handleDelete = (id, title) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${title}"?`);
    if (!confirmDelete) return;

    try {
      const success = deleteProduct(id);
      if (success) {
        setToast({ message: `"${title}" has been successfully deleted.`, type: "success" });
        loadProducts(); // Reload local list
      } else {
        setToast({ message: "Failed to delete product.", type: "error" });
      }
    } catch (err) {
      console.error(err);
      setToast({ message: "An error occurred.", type: "error" });
    }
  };

  const handleResetCatalog = () => {
    const confirmReset = window.confirm("Reset storage? This will restore the 6 default smart gadgets.");
    if (!confirmReset) return;

    localStorage.removeItem("luxespace_products");
    loadProducts();
    setToast({ message: "Catalog restored to default seed products.", type: "success" });
  };

  if (authLoading || !user) {
    return (
      <div className="manage-loader-panel container text-center animate-fade-in">
        <div className="loader-spinner"></div>
        <h2>Checking credentials...</h2>
        <style jsx>{`
          .manage-loader-panel { padding: 120px 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; min-height: 50vh; }
          .loader-spinner { width: 48px; height: 48px; border: 4px solid rgba(255, 255, 255, 0.05); border-top: 4px solid var(--clr-primary); border-radius: 50%; animation: spin 1s linear infinite; }
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        `}</style>
      </div>
    );
  }

  return (
    <div className="manage-page-wrapper">
      <div className="glow-accent" style={{ top: "10%", left: "10%" }}></div>
      <div className="glow-accent" style={{ bottom: "10%", right: "10%" }}></div>

      <div className="container">
        {/* Navigation header */}
        <div className="manage-header-row animate-fade-in">
          <Link href="/items" className="btn btn-secondary back-btn">
            <ArrowLeft size={16} /> Back to Browse
          </Link>

          <button onClick={handleResetCatalog} className="btn btn-secondary reset-catalog-btn">
            <RefreshCcw size={16} /> Restore Defaults
          </button>
        </div>

        {/* Dashboard table */}
        <div className="manage-card-wrapper glass animate-fade-in">
          <div className="manage-header">
            <h2>Manage Products</h2>
            <p>Delete listings, inspect full specifications sheets, or seed catalog entries.</p>
          </div>

          {products.length > 0 ? (
            <div className="table-responsive-container">
              {/* Desktop/Tablet Table */}
              <table className="custom-table manage-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Date Created</th>
                    <th className="actions-header">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((item) => {
                    const formattedDate = new Date(item.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    });

                    return (
                      <tr key={item.id}>
                        {/* Title and Thumbnail */}
                        <td>
                          <div className="table-product-cell">
                            <img src={item.imageUrl} alt={item.title} className="table-thumb" />
                            <div className="product-info-text">
                              <span className="product-title">{item.title}</span>
                              <span className="product-id">ID: {item.id}</span>
                            </div>
                          </div>
                        </td>
                        
                        {/* Category */}
                        <td>
                          <span className="badge table-cat-badge">{item.category}</span>
                        </td>

                        {/* Price */}
                        <td>
                          <span className="table-price-label">${item.price}</span>
                        </td>

                        {/* Date Created */}
                        <td>
                          <span className="table-date-label">{formattedDate}</span>
                        </td>

                        {/* Actions */}
                        <td>
                          <div className="table-actions-cell">
                            <Link href={`/items/${item.id}`} className="btn btn-secondary action-btn view-action" title="View details">
                              <Eye size={15} />
                              <span>Inspect</span>
                            </Link>
                            <button
                              onClick={() => handleDelete(item.id, item.title)}
                              className="btn btn-danger action-btn delete-action"
                              title="Delete product"
                            >
                              <Trash2 size={15} />
                              <span>Delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* Mobile Card Grid (Active via media query) */}
              <div className="mobile-cards-grid">
                {products.map((item) => (
                  <div key={item.id} className="mobile-manage-card glass">
                    <div className="card-top">
                      <img src={item.imageUrl} alt={item.title} />
                      <div className="card-top-info">
                        <span className="badge">{item.category}</span>
                        <h4>{item.title}</h4>
                        <span className="price">${item.price}</span>
                      </div>
                    </div>
                    
                    <div className="card-divider"></div>
                    
                    <div className="card-actions">
                      <Link href={`/items/${item.id}`} className="btn btn-secondary card-action-btn">
                        <Eye size={14} /> Inspect
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id, item.title)}
                        className="btn btn-danger card-action-btn"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ) : (
            <div className="empty-manage-panel text-center">
              <Package size={44} className="empty-icon" />
              <h3>Your Catalog is Empty</h3>
              <p>You have deleted all items. Click below to re-seed the default 6 gadgets.</p>
              <div className="empty-actions">
                <button onClick={handleResetCatalog} className="btn btn-primary">
                  Seed Default Catalog
                </button>
                <Link href="/items/add" className="btn btn-secondary">
                  Add Custom Item
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <style jsx>{`
        .manage-page-wrapper {
          padding: 40px 0 100px;
          position: relative;
          min-height: 100vh;
        }

        .manage-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 30px;
          gap: 16px;
        }

        .back-btn, .reset-catalog-btn {
          height: 40px;
          padding: 0 16px !important;
        }

        .manage-card-wrapper {
          border-radius: var(--radius-lg);
          padding: 40px;
          position: relative;
          z-index: 10;
        }

        .manage-header {
          margin-bottom: 30px;
        }

        .manage-header h2 {
          font-size: 2.2rem;
          color: var(--clr-text-main);
          margin-bottom: 8px;
        }

        .manage-header p {
          font-size: 0.95rem;
          color: var(--clr-text-muted);
        }

        .table-responsive-container {
          width: 100%;
        }

        /* Product cell with image thumbnail */
        .table-product-cell {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .table-thumb {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-sm);
          object-fit: cover;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--clr-border);
        }

        .product-info-text {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .product-title {
          font-weight: 600;
          color: var(--clr-text-main);
          font-size: 0.95rem;
        }

        .product-id {
          font-size: 0.72rem;
          color: var(--clr-text-muted);
          font-family: monospace;
        }

        .table-price-label {
          font-weight: 700;
          color: var(--clr-text-main);
        }

        .table-date-label {
          font-size: 0.88rem;
        }

        /* Actions cells */
        .actions-header {
          text-align: right;
          padding-right: 24px !important;
        }

        .table-actions-cell {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 10px;
        }

        .action-btn {
          height: 34px;
          font-size: 0.78rem !important;
          padding: 0 12px !important;
        }

        .action-btn span {
          margin-left: 4px;
        }

        /* Empty states */
        .empty-manage-panel {
          padding: 60px 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
        }

        .empty-icon {
          color: var(--clr-text-muted);
          opacity: 0.4;
        }

        .empty-manage-panel h3 {
          font-size: 1.4rem;
          color: var(--clr-text-main);
        }

        .empty-manage-panel p {
          font-size: 0.95rem;
          color: var(--clr-text-muted);
          margin-bottom: 8px;
        }

        .empty-actions {
          display: flex;
          gap: 12px;
          justify-content: center;
        }

        /* Mobile specific card structures */
        .mobile-cards-grid {
          display: none;
        }

        @media (max-width: 900px) {
          .manage-table {
            display: none;
          }
          
          .mobile-cards-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }

          .mobile-manage-card {
            border-radius: var(--radius-md);
            padding: 16px;
            display: flex;
            flex-direction: column;
            gap: 16px;
          }

          .card-top {
            display: flex;
            gap: 14px;
            align-items: center;
          }

          .card-top img {
            width: 60px;
            height: 60px;
            border-radius: var(--radius-sm);
            object-fit: cover;
            border: 1px solid var(--clr-border);
          }

          .card-top-info {
            display: flex;
            flex-direction: column;
            gap: 4px;
          }

          .card-top-info h4 {
            font-size: 0.95rem;
            color: var(--clr-text-main);
          }

          .card-top-info .price {
            font-weight: 700;
            color: var(--clr-primary-light);
            font-size: 0.9rem;
          }

          .card-divider {
            height: 1px;
            background: var(--clr-border);
          }

          .card-actions {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }

          .card-action-btn {
            height: 36px;
            font-size: 0.8rem !important;
            padding: 0 !important;
          }
        }

        @media (max-width: 600px) {
          .mobile-cards-grid {
            grid-template-columns: 1fr;
          }
          .manage-card-wrapper {
            padding: 24px 16px;
          }
        }
      `}</style>
    </div>
  );
}
