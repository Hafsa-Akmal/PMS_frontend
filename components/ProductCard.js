'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './styles/ProductCard.module.css';

export default function ProductCard({ p }) {
  const router = useRouter();
  const [current, setCurrent] = useState(0);

  const images = p.ProductImages || [];

  const nextSlide = (e) => {
    e.stopPropagation();
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = (e) => {
    e.stopPropagation();
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div
      onClick={() => router.push(`/products/${p.id}/edit`)}
      className={styles.card}
    >
      <div className={styles.imageWrapper}>
        {images.length > 0 ? (
          <img
            src={images[current]?.url}
            alt={p.name}
            className={styles.image}
          />
        ) : (
          <div className={styles.noImage}>No Image</div>
        )}

        {images.length > 1 && (
          <>
            <button onClick={prevSlide} className={`${styles.arrow} ${styles.left}`}>
              ‹
            </button>
            <button onClick={nextSlide} className={`${styles.arrow} ${styles.right}`}>
              ›
            </button>
          </>
        )}
      </div>

      {/* Product Info */}
      <div className={styles.info}>
        <h3 className={styles.name}>{p.name}</h3>
        <p className={styles.desc}>{p.description}</p>
        <div className={styles.meta}>
          <span className={styles.price}>Rs {p.price}</span>
          <span
            className={`${styles.stock} ${p.stock > 0 ? styles.inStock : styles.outStock}`}
          >
            {p.stock > 0 ? `In Stock (${p.stock})` : 'Out of Stock'}
          </span>
        </div>
      </div>
    </div>
  );
}
