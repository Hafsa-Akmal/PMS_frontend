'use client';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Pagination({ page, totalPages }) {
  const router = useRouter();
  const params = useSearchParams();

  function go(to) {
    const q = new URLSearchParams(params.toString());
    q.set('page', String(to));
    router.push(`/products?${q.toString()}`);
  }

  return (
    <div className="flex items-center gap-2 mt-4">
      <button
        disabled={page <= 1}
        onClick={() => go(page - 1)}
        className="btn"
      >
        Prev
      </button>

      <span>Page {page} / {totalPages}</span>

      <button
        disabled={page >= totalPages}
        onClick={() => go(page + 1)}
        className="btn"
      >
        Next
      </button>

      <style jsx>{`
        .btn {
          padding: .4rem .8rem;
          border: 1px solid #ddd;
          border-radius: .5rem;
          color: #333;
          background: #fff;
        }
      `}</style>
    </div>
  );
}
