import Image from 'next/image';
import type { Product } from '@/data/products';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white/90 shadow-sm transition hover:-translate-y-1 hover:shadow-[var(--shadow-md)]">
      <div className="relative h-44 overflow-hidden bg-slate-100">
        <Image
          src={product.thumbnailSrc}
          alt={product.thumbnailAlt}
          fill
          className="object-cover object-center"
          sizes="(min-width: 1280px) 22vw, (min-width: 768px) 40vw, 100vw"
        />
      </div>
      <div className="p-5">
        <span className="inline-flex rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-500">
          {product.category}
        </span>
        <h3 className="mt-4 text-lg font-semibold leading-7 text-slate-950">{product.name}</h3>
        <p className="mt-3 text-xl font-semibold text-slate-950">{product.price}</p>
        <a href={product.href} className="mt-4 inline-flex text-sm font-semibold text-blue-600 transition hover:text-blue-700">
          詳細を見る →
        </a>
      </div>
    </article>
  );
}
