'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchFilterBar() {
  const router = useRouter();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [sort, setSort] = useState('newest');

  function update() {
    const q = new URLSearchParams({
      ...(search && { search }),
      ...(category && { category }),
      ...(priceMin && { priceMin }),
      ...(priceMax && { priceMax }),
      ...(sort && { sort }),
      page: '1',
    });

    router.push(`/products?${q.toString()}`);
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-2 mb-4">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
        className="input"
      />
      <input
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category ID"
        className="input"
      />
      <input
        value={priceMin}
        onChange={(e) => setPriceMin(e.target.value)}
        placeholder="Min Price"
        className="input"
      />
      <input
        value={priceMax}
        onChange={(e) => setPriceMax(e.target.value)}
        placeholder="Max Price"
        className="input"
      />
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="input"
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>
      <button onClick={update} className="btn">Apply</button>

      <style jsx>{`
        .input { padding:.5rem; border:1px solid #ddd; border-radius:.5rem }
        .btn { padding:.5rem; background:#111; color:#fff; border-radius:.5rem }
      `}</style>
    </div>
  );
}
