"use client";
import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import ProductForm from "../../../../../components/ProductForm";
import { BASE_URL } from "../../../../../lib/config";

export default function EditPage({ params }) {
  const { id } = use(params);

  const [product, setProduct] = useState(null);
  const [token, setToken] = useState(null);


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
  const [isDeleting, setIsDeleting] = useState(false);

  async function del() {
      if (isDeleting) return; 

    setIsDeleting(true);

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
      setIsDeleting(false);
    }
  }

  return (
    <button
      onClick={del}
       disabled={isDeleting}style={{ backgroundColor: isDeleting ? '#ccc' : '#e00', color: '#fff', borderRadius: '0.5rem', padding: '0.6rem 1rem', cursor: isDeleting ? 'not-allowed' : 'pointer', marginTop: '1rem' } }
    >
      Delete
    </button>
  );
}
