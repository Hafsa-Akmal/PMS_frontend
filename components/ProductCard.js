'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ProductCard({ p }) {
  const router = useRouter();
  const [current, setCurrent] = useState(0);

  const images = p.ProductImages || [];

  const nextSlide = (e) => {
    e.stopPropagation(); // prevent routing on button click
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = (e) => {
    e.stopPropagation();
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div
      onClick={() => router.push(`/products/${p.id}/edit`)}
      className="border rounded-lg p-3 bg-white cursor-pointer hover:shadow-md transition"
    >
      <div className="flex gap-3">
    
        <div className="relative w-24 h-24 overflow-hidden rounded">
          {images.length > 0 ? (
            <img
              src={images[current]?.url}
              alt={p.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
              No Image
            </div>
          )}

          {images.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-1 top-1/2 -translate-y-1/2 bg-black/70 rounded-full px-1 text-xs"
              >
                ‹
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-1 top-1/2 -translate-y-1/2 bg-black/70 rounded-full px-1 text-xs"
              >
                ›
              </button>
            </>
          )}
        </div>

        {/* Product Info */}
        <div>
          <div className="text-gray-600 font-semibold">{p.name}</div>
          <div className="text-sm text-gray-600">{p.description}</div>
          <div className="mt-1 text-gray-600">
            Rs-{p.price} • Stock: {p.stock}
          </div>
        </div>
      </div>
    </div>
  );
}
