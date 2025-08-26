import './globals.css';
import Link from 'next/link';
export default function RootLayout({ children }) {
return (
<html lang="en">
<body className="min-h-screen bg-gray-50">
<nav className="px-6 py-4 bg-white text-black flex gap-4">
<Link href="/">Home</Link>
<Link href="/products">Products</Link>
<Link href="/products/new">Add Product</Link>
<div className="ml-auto flex gap-4">
<Link href="/login">Login</Link>
<Link href="/register">Register</Link>
</div>
</nav>
<main className="p-6 max-w-5xl mx-auto">{children}</main>
</body>
</html>
);
}