import type { Product } from '@/data/products';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white/90 shadow-sm transition hover:-translate-y-1 hover:shadow-[var(--shadow-md)]">
      <div className={`relative h-44 overflow-hidden bg-gradient-to-br ${product.thumbnailTone} p-4`}>
        <div className="absolute inset-4 rounded-[1.25rem] border border-white/60 bg-white/70 backdrop-blur">
          <div className="grid h-full grid-cols-[1fr_0.9fr] gap-3 p-4">
            <div className="space-y-2">
              <div className="h-3 w-24 rounded-full bg-slate-200" />
              <div className="h-3 w-20 rounded-full bg-slate-100" />
              <div className="mt-5 h-14 rounded-2xl bg-white shadow-sm" />
            </div>
            <div className="space-y-2">
              <div className="h-20 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-300/30" />
              <div className="grid grid-cols-3 gap-2">
                <div className="h-8 rounded-xl bg-white" />
                <div className="h-8 rounded-xl bg-white/80" />
                <div className="h-8 rounded-xl bg-white/60" />
              </div>
            </div>
          </div>
        </div>
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
