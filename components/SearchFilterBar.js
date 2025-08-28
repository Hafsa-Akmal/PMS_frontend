'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './styles/SearchFilterBar.module.css';

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
    <div className={styles.filterBar}>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
        className={styles.input}
      />
      <input
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category ID"
        className={styles.input}
      />
      <input
        value={priceMin}
        onChange={(e) => setPriceMin(e.target.value)}
        placeholder="Min Price"
        className={styles.input}
      />
      <input
        value={priceMax}
        onChange={(e) => setPriceMax(e.target.value)}
        placeholder="Max Price"
        className={styles.input}
      />
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className={styles.input}
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>
      <button onClick={update} className={styles.btn}>
        Apply
      </button>
    </div>
  );
}
