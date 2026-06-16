"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Toast from "@/components/Toast";
import { Mail, Lock, LogIn, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const { user, login, loginWithGoogle, loading } = useAuth();
  const router = useRouter();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [toast, setToast] = useState(null);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      await login(email, password);
      setToast({ message: "Successfully logged in! Redirecting...", type: "success" });
      setTimeout(() => router.push("/"), 1500);
    } catch (err) {
      console.error(err);
      if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password" || err.code === "auth/user-not-found") {
        setError("Invalid email or password.");
      } else {
        setError("An error occurred during log in. Please try again.");
      }
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      await loginWithGoogle();
      setToast({ message: "Google Sign-In successful! Redirecting...", type: "success" });
      setTimeout(() => router.push("/"), 1500);
    } catch (err) {
      console.error(err);
      setError("Google authentication failed. Please try again.");
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="glow-accent" style={{ top: "10%", left: "10%" }}></div>
      <div className="glow-accent" style={{ bottom: "10%", right: "10%" }}></div>
      
      <div className="auth-card glass animate-fade-in">
        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p>Access your LuxeSpace dashboard and exclusive catalog</p>
        </div>

        {error && (
          <div className="auth-error-alert">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={18} />
              <input
                type="email"
                id="email"
                className="form-input with-icon"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" size={18} />
              <input
                type="password"
                id="password"
                className="form-input with-icon"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary auth-submit-btn"
            disabled={loading}
          >
            {loading ? "Authenticating..." : (
              <>
                <LogIn size={18} />
                Sign In with Email
              </>
            )}
          </button>
        </form>

        <div className="auth-divider">
          <span>or continue with</span>
        </div>

        <button
          onClick={handleGoogleLogin}
          type="button"
          className="btn btn-secondary google-auth-btn"
          disabled={loading}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: 6 }}>
            <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.137 4.114-3.555 0-6.445-2.89-6.445-6.445s2.89-6.445 6.445-6.445c1.614 0 3.09.594 4.225 1.574l3.14-3.14C19.307 2.228 15.98 1 12.24 1c-6.077 0-11 4.923-11 11s4.923 11 11 11c5.83 0 10.74-4.22 10.74-11 0-.7-.08-1.385-.24-2.07H12.24z"/>
          </svg>
          Sign In with Google
        </button>

        <div className="auth-footer">
          <p>
            Don't have an account? <Link href="/register" className="auth-link">Create one here</Link>
          </p>
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
        .auth-page-wrapper {
          min-height: calc(100vh - 70px - 250px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          position: relative;
        }

        .auth-card {
          width: 100%;
          max-width: 440px;
          padding: 40px 32px;
          border-radius: var(--radius-lg);
          position: relative;
          z-index: 10;
        }

        .auth-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .auth-header h2 {
          font-size: 2rem;
          color: var(--clr-text-main);
          margin-bottom: 8px;
        }

        .auth-header p {
          font-size: 0.9rem;
          color: var(--clr-text-muted);
        }

        .auth-error-alert {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          color: var(--clr-error);
          padding: 12px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.88rem;
          margin-bottom: 20px;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
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
          padding-left: 44px;
        }

        .auth-submit-btn {
          width: 100%;
          height: 46px;
          margin-top: 10px;
        }

        .auth-divider {
          display: flex;
          align-items: center;
          text-align: center;
          margin: 24px 0;
          color: var(--clr-text-muted);
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .auth-divider::before,
        .auth-divider::after {
          content: "";
          flex: 1;
          border-bottom: 1px solid var(--clr-border);
        }

        .auth-divider span {
          padding: 0 12px;
        }

        .google-auth-btn {
          width: 100%;
          height: 46px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .auth-footer {
          text-align: center;
          margin-top: 30px;
          font-size: 0.9rem;
        }

        .auth-link {
          color: var(--clr-primary-light);
          font-weight: 500;
        }

        .auth-link:hover {
          color: var(--clr-primary);
          text-decoration: underline;
        }

        @media (max-width: 480px) {
          .auth-card {
            padding: 32px 20px;
          }
        }
      `}</style>
    </div>
  );
}
