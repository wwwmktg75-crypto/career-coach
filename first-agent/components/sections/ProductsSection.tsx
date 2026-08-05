import { products } from '@/data/products';
import { ProductCard } from '@/components/ui/ProductCard';
import { SectionTitle } from '@/components/ui/SectionTitle';

export function ProductsSection() {
  return (
    <section id="products" className="section-space pt-0">
      <div className="container">
        <SectionTitle
          eyebrow="Products"
          title="プロダクト"
          description="提供中およびご相談可能なデジタルプロダクトの一部をご紹介します。"
        />
        <div className="mt-6 text-center">
          <a
            href="/products/register"
            className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-slate-200 bg-white/90 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-slate-300"
          >
            プロダクト登録フォーム
          </a>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <a href="#contact" className="text-sm font-semibold text-blue-600 transition hover:text-blue-700">
            すべてのプロダクトを見る →
          </a>
        </div>
      </div>
    </section>
  );
}
