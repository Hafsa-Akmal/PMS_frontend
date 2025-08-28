"use client";

import "./globals.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RootLayout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkToken();

    window.addEventListener("authChange", checkToken);
    window.addEventListener("storage", checkToken);

    return () => {
      window.removeEventListener("authChange", checkToken);
      window.removeEventListener("storage", checkToken);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("authChange"));
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <html lang="en">
      <body
        style={{
          minHeight: "100vh",
          margin: 0,
          backgroundColor: "#f9fafb",
          fontFamily: "Inter, sans-serif",
          color: "#111827",
        }}
      >
        {/* Navbar */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
            padding: "1rem 2rem",
            backgroundColor: "#ffffff",
            borderBottom: "1px solid #e5e7eb",
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
          }}
        >
          <Link
            href="/"
            style={{
              fontWeight: 600,
              fontSize: "1rem",
              color: "#374151",
              textDecoration: "none",
            }}
          >
            Home
          </Link>
          <Link
            href="/products"
            style={{
              fontWeight: 500,
              fontSize: "1rem",
              color: "#374151",
              textDecoration: "none",
            }}
          >
            Products
          </Link>
          <Link
            href="/products/new"
            style={{
              fontWeight: 500,
              fontSize: "1rem",
              color: "#374151",
              textDecoration: "none",
            }}
          >
            Add Product
          </Link>

          {/* Right Side (Auth) */}
          <div style={{ marginLeft: "auto", display: "flex", gap: "1.25rem" }}>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                style={{
                  color: "#ef4444",
                  fontWeight: 500,
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
                onMouseOver={(e) => (e.currentTarget.style.textDecoration = "underline")}
                onMouseOut={(e) => (e.currentTarget.style.textDecoration = "none")}
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  style={{
                    fontWeight: 500,
                    color: "#2563eb",
                    textDecoration: "none",
                  }}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  style={{
                    fontWeight: 500,
                    color: "#2563eb",
                    textDecoration: "none",
                  }}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </nav>

        {/* Main Content */}
        <main
          style={{
            maxWidth: "960px",
            margin: "2rem auto",
            padding: "1.5rem",
          }}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
