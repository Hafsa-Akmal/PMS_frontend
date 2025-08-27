'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { BASE_URL } from '../lib/config';

export default function ProductForm({ initial }) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    categoryId: '',
    stock: '0',
  });
  const [files, setFiles] = useState([]);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingImages, setExistingImages] = useState([]);
const [deletedImageIds, setDeletedImageIds] = useState([]);

  useEffect(() => {
    if (initial) {
      setForm({
        name: initial.name || '',
        description: initial.description || '',
        price: initial.price || '',
        categoryId: initial.categoryId || '',
        stock: initial.stock?.toString() || '0',
      });
        if (initial.images && Array.isArray(initial.images)) {
      setExistingImages(initial.images);
    }
    }
  }, [initial]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
setIsSubmitting(true); 
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login first');
      return;
    }

    const fd = new FormData();
    for (let key in form) fd.append(key, form[key]);
    files.forEach((file) => fd.append('images', file));

 const url = initial
  ? `${BASE_URL}/api/products/${initial.id}`
  : `${BASE_URL}/api/products`;


    const method = initial ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: fd,
    });

    if (!res.ok) {
      alert('please fill all required fields and try again');
       setIsSubmitting(false);
      return;
    }

    router.push('/products');
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: '400px',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />
      <input
        name="price"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
      />
      <input
        name="categoryId"
        placeholder="Category ID"
        value={form.categoryId}
        onChange={handleChange}
      />
      <input
        name="stock"
        placeholder="Stock"
        value={form.stock}
        onChange={handleChange}
      />
      <input
        type="file"
        multiple
        onChange={(e) => setFiles(Array.from(e.target.files))}
      />
      <button type="submit"disabled={isSubmitting}style={{ backgroundColor: isSubmitting ? '#ccc' : '#111', color: '#fff', borderRadius: '0.5rem', padding: '0.6rem 1rem', cursor: isSubmitting ? 'not-allowed' : 'pointer' } }>
        {initial ? 'Update Product' : 'Create Product'}
      </button>
    </form>
  );
}
