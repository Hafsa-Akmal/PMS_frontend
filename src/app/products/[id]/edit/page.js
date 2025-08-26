"use client";
import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import ProductForm from "../../../../../components/ProductForm";
import { BASE_URL } from "../../../../../lib/config";

export default function EditPage({ params }) {
  const { id } = use(params);

  const [product, setProduct] = useState(null);
  const [token, setToken] = useState(null);
  const router = useRouter();


  useEffect(() => {
    const t = localStorage.getItem("token");
    setToken(t);
  }, []);

  useEffect(() => {
    if (!token) return;

    async function load() {
      const res = await fetch(`${BASE_URL}/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Not found");
      const data = await res.json();
      setProduct(data);
    }

    load().catch(console.error);
  }, [id, token]);

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <ProductForm initial={product} />
      <DeleteProductButton id={id} />
    </div>
  );
}

function DeleteProductButton({ id }) {
  const router = useRouter();

  async function del() {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}/api/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      alert("Product deleted!");
      router.push("/products");
    } else {
      alert("Failed to delete product");
    }
  }

  return (
    <button
      onClick={del}
      className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
    >
      Delete
    </button>
  );
}
