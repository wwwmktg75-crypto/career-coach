import { products } from '@/data/products';
import { ProductCard } from '@/components/ui/ProductCard';
import { SectionTitle } from '@/components/ui/SectionTitle';

export function ProductsSection() {
  return (
    <section id="products" className="section-space pt-0">
      <div className="container">
        <SectionTitle
          eyebrow="Products"
          title="プロダクト・ポートフォリオ"
          description="提供中および開発予定のプロダクト・テンプレートの一部をご紹介します。"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
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
