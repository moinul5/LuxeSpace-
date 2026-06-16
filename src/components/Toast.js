"use client";

import { useEffect } from "react";
import { CheckCircle, AlertCircle, X } from "lucide-react";

export default function Toast({ message, type = "success", onClose, duration = 4000 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className={`toast-container glass animate-slide-in ${type}`}>
      <div className="toast-content">
        {type === "success" ? (
          <CheckCircle size={18} className="toast-icon success-icon" />
        ) : (
          <AlertCircle size={18} className="toast-icon error-icon" />
        )}
        <p className="toast-message">{message}</p>
      </div>
      <button onClick={onClose} className="toast-close" aria-label="Close notification">
        <X size={14} />
      </button>

      <style jsx>{`
        .toast-container {
          position: fixed;
          bottom: 24px;
          right: 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          min-width: 320px;
          max-width: 450px;
          padding: 14px 18px;
          border-radius: var(--radius-sm);
          z-index: 1000;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        }

        .toast-container.success {
          border-left: 4px solid var(--clr-success);
        }

        .toast-container.error {
          border-left: 4px solid var(--clr-error);
        }

        .toast-content {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
        }

        .toast-icon {
          flex-shrink: 0;
        }

        .success-icon {
          color: var(--clr-success);
        }

        .error-icon {
          color: var(--clr-error);
        }

        .toast-message {
          font-size: 0.88rem;
          color: var(--clr-text-main);
          font-weight: 500;
        }

        .toast-close {
          background: transparent;
          border: none;
          color: var(--clr-text-muted);
          cursor: pointer;
          transition: var(--transition-smooth);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
          border-radius: 50%;
        }

        .toast-close:hover {
          color: var(--clr-text-main);
          background: rgba(255, 255, 255, 0.05);
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-slide-in {
          animation: slideIn 0.30s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}
