"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { addProduct } from "@/utils/storage";
import Toast from "@/components/Toast";
import { PlusCircle, ArrowLeft, Image, DollarSign, ListCollapse, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function AddItemPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  // Form states
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [fullDesc, setFullDesc] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Audio & Sound");
  const [priority, setPriority] = useState("Medium");
  const [imageUrl, setImageUrl] = useState("");

  // Validation states
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const categories = [
    "Audio & Sound",
    "Smart Wearables",
    "Minimalist Workspace",
    "Ambient Lighting"
  ];

  const validateForm = () => {
    const tempErrors = {};
    if (!title.trim() || title.length < 3) {
      tempErrors.title = "Title must be at least 3 characters.";
    }
    if (!shortDesc.trim() || shortDesc.length < 10 || shortDesc.length > 150) {
      tempErrors.shortDesc = "Short description must be between 10 and 150 characters.";
    }
    if (!fullDesc.trim() || fullDesc.length < 30) {
      tempErrors.fullDesc = "Full description must be at least 30 characters.";
    }
    if (!price || Number(price) <= 0) {
      tempErrors.price = "Price must be a positive number.";
    }
    if (imageUrl && !imageUrl.startsWith("http://") && !imageUrl.startsWith("https://")) {
      tempErrors.imageUrl = "Please enter a valid absolute URL (http/https).";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    
    // Simulate API delay for polished loading feel
    setTimeout(() => {
      const defaultImages = {
        "Audio & Sound": "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800",
        "Smart Wearables": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
        "Minimalist Workspace": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800",
        "Ambient Lighting": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800"
      };

      const finalProduct = {
        title,
        shortDesc,
        fullDesc,
        price: Number(price),
        category,
        priority,
        imageUrl: imageUrl.trim() || defaultImages[category] || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
        specs: [
          { label: "Listed By", value: user.displayName || user.email },
          { label: "Display Priority", value: priority },
          { label: "Acquisition", value: "Curator Added" }
        ],
        authorId: user.uid
      };

      try {
        addProduct(finalProduct);
        setToast({ message: "Product added successfully! Redirecting...", type: "success" });
        setSubmitting(false);
        setTimeout(() => {
          router.push("/items");
        }, 1500);
      } catch (err) {
        console.error(err);
        setToast({ message: "Failed to add product. Please try again.", type: "error" });
        setSubmitting(false);
      }
    }, 1000);
  };

  if (authLoading || !user) {
    return (
      <div className="add-loader-panel container text-center animate-fade-in">
        <div className="loader-spinner"></div>
        <h2>Checking authentication...</h2>
        <style jsx>{`
          .add-loader-panel { padding: 120px 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; min-height: 50vh; }
          .loader-spinner { width: 48px; height: 48px; border: 4px solid rgba(255, 255, 255, 0.05); border-top: 4px solid var(--clr-primary); border-radius: 50%; animation: spin 1s linear infinite; }
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        `}</style>
      </div>
    );
  }

  return (
    <div className="add-page-wrapper">
      <div className="glow-accent" style={{ top: "10%", right: "10%" }}></div>
      <div className="glow-accent" style={{ bottom: "10%", left: "10%" }}></div>

      <div className="container">
        {/* Navigation header */}
        <div className="add-header-nav animate-fade-in">
          <Link href="/items" className="btn btn-secondary back-btn">
            <ArrowLeft size={16} /> Back to Catalog
          </Link>
        </div>

        <div className="form-container glass animate-fade-in">
          <div className="form-header">
            <h2>Add New Luxury Product</h2>
            <p>Publish an item into the LuxeSpace catalog database. All fields support standard specifications validation.</p>
          </div>

          <form onSubmit={handleSubmit} className="product-form">
            {/* Title */}
            <div className="form-group">
              <label className="form-label" htmlFor="title">Product Name</label>
              <input
                type="text"
                id="title"
                className={`form-input ${errors.title ? "invalid" : ""}`}
                placeholder="e.g. Horizon Smart Mirror"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              {errors.title && <span className="form-error">{errors.title}</span>}
            </div>

            {/* Category & Price Split */}
            <div className="form-split-row">
              <div className="form-group">
                <label className="form-label" htmlFor="category">Category</label>
                <select
                  id="category"
                  className="form-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="price">Price ($ USD)</label>
                <div className="input-wrapper">
                  <DollarSign className="input-icon" size={16} />
                  <input
                    type="number"
                    id="price"
                    className={`form-input with-icon ${errors.price ? "invalid" : ""}`}
                    placeholder="399"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
                {errors.price && <span className="form-error">{errors.price}</span>}
              </div>
            </div>

            {/* Display Priority & Optional Image URL */}
            <div className="form-split-row">
              <div className="form-group">
                <label className="form-label" htmlFor="priority">Display Priority</label>
                <select
                  id="priority"
                  className="form-select"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="Low">Low (Standard listings)</option>
                  <option value="Medium">Medium (Regular catalog prominence)</option>
                  <option value="High">High (Trending landing showcases)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="imageUrl">Optional Image URL</label>
                <div className="input-wrapper">
                  <Image className="input-icon" size={16} />
                  <input
                    type="text"
                    id="imageUrl"
                    className={`form-input with-icon ${errors.imageUrl ? "invalid" : ""}`}
                    placeholder="https://images.unsplash.com/..."
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                  />
                </div>
                {errors.imageUrl ? (
                  <span className="form-error">{errors.imageUrl}</span>
                ) : (
                  <span className="form-helper-note">Leave blank to use a category-based default mockup.</span>
                )}
              </div>
            </div>

            {/* Short Description */}
            <div className="form-group">
              <label className="form-label" htmlFor="shortDesc">Short Description (Summary)</label>
              <input
                type="text"
                id="shortDesc"
                className={`form-input ${errors.shortDesc ? "invalid" : ""}`}
                placeholder="A brief summary (10 to 150 characters) displayed on product directory cards."
                value={shortDesc}
                onChange={(e) => setShortDesc(e.target.value)}
                required
              />
              {errors.shortDesc && <span className="form-error">{errors.shortDesc}</span>}
            </div>

            {/* Full Description */}
            <div className="form-group">
              <label className="form-label" htmlFor="fullDesc">Full Specifications & Description</label>
              <textarea
                id="fullDesc"
                rows="5"
                className={`form-textarea ${errors.fullDesc ? "invalid" : ""}`}
                placeholder="Write detailed descriptive paragraphs regarding materials, functions, build aesthetics, and shipping packages (min 30 characters)."
                value={fullDesc}
                onChange={(e) => setFullDesc(e.target.value)}
                required
              ></textarea>
              {errors.fullDesc && <span className="form-error">{errors.fullDesc}</span>}
            </div>

            {/* Form actions */}
            <button
              type="submit"
              className="btn btn-primary submit-btn"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <div className="spinner-small"></div>
                  Adding Product Specifications...
                </>
              ) : (
                <>
                  <PlusCircle size={18} />
                  Publish Product
                </>
              )}
            </button>
          </form>
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
        .add-page-wrapper {
          padding: 40px 0 100px;
          position: relative;
          min-height: 100vh;
        }

        .add-header-nav {
          margin-bottom: 30px;
        }

        .back-btn {
          height: 40px;
          padding: 0 16px !important;
        }

        .form-container {
          max-width: 760px;
          margin: 0 auto;
          padding: 48px;
          border-radius: var(--radius-lg);
          position: relative;
          z-index: 10;
        }

        .form-header {
          margin-bottom: 36px;
        }

        .form-header h2 {
          font-size: 2.2rem;
          color: var(--clr-text-main);
          margin-bottom: 8px;
        }

        .form-header p {
          font-size: 0.95rem;
          color: var(--clr-text-muted);
          line-height: 1.5;
        }

        .product-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .form-split-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 14px;
          color: var(--clr-text-muted);
          pointer-events: none;
        }

        .form-input.with-icon {
          padding-left: 40px;
        }

        .form-input.invalid, .form-textarea.invalid {
          border-color: var(--clr-error);
          background: rgba(239, 68, 68, 0.02);
        }

        .form-helper-note {
          font-size: 0.8rem;
          color: var(--clr-text-muted);
          margin-top: 4px;
        }

        .submit-btn {
          height: 48px;
          width: 100%;
          font-size: 1rem !important;
          margin-top: 10px;
        }

        /* Spinner for loading state */
        .spinner-small {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-top: 2px solid #fff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .form-container {
            padding: 32px 20px;
          }
          .form-split-row {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }
      `}</style>
    </div>
  );
}
