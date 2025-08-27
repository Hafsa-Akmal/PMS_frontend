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
  
    window.addEventListener("storage", checkToken);

    return () => {
      window.removeEventListener("storage", checkToken);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <nav className="px-6 py-4 bg-white text-black flex gap-4">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/products/new">Add Product</Link>

          <div className="ml-auto flex gap-4">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="text-red-500 hover:underline"
              >
                Logout
              </button>
            ) : (
              <>
                <Link href="/login">Login</Link>
                <Link href="/register">Register</Link>
              </>
            )}
          </div>
        </nav>

        <main className="p-6 max-w-5xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
