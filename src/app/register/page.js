'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BASE_URL } from '../../../lib/config';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const router = useRouter();

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  async function submit(e) {
    e.preventDefault();

    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      throw new Error('Registration failed');
    }

    const data = await res.json();
    localStorage.setItem('token', data.token);
    router.push('/products');
  }

  return (
    <form onSubmit={submit} className="max-w-md space-y-3">
      <input
        name="name"
        placeholder="Name"
        className="input"
        onChange={onChange}
      />
      <input
        name="email"
        placeholder="Email"
        className="input"
        onChange={onChange}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        className="input"
        onChange={onChange}
      />
      <button className="btn">Register</button>

      <style jsx>{`
        .input {
          width: 100%;
          padding: 0.6rem;
          border: 1px solid #ddd;
          border-radius: 0.5rem;
        }
        .btn {
          padding: 0.6rem 1rem;
          background: #111;
          color: #fff;
          border-radius: 0.5rem;
        }
      `}</style>
    </form>
  );
}
