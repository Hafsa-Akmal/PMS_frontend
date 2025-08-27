'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BASE_URL } from '../../../lib/config';
export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errData = await res.json();
        setError(errData.message || 'Login failed');
        return;
      }

      const data = await res.json();
      localStorage.setItem('token', data.token);
      window.dispatchEvent(new Event('authChange'));
      router.push('/products');
    } catch (err) {
      setError('Network error, try again.');
      console.error(err);
    }
  }

  return (
    <form onSubmit={submit} className="max-w-md space-y-3">
      {error && <div className="text-red-600">{error}</div>}
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
      <button type="submit" className="btn">Login</button>

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
