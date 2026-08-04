import Link from 'next/link';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

export default function CheckoutSuccessPage() {
  return (
    <div className="page-shell">
      <Header />
      <main className="section-space">
        <div className="container">
          <div className="mx-auto max-w-3xl rounded-[2rem] border border-slate-200/80 bg-white/90 p-8 text-center shadow-[var(--shadow-lg)] backdrop-blur md:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">Checkout Success</p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 md:text-5xl">
              購入テストが完了しました
            </h1>
            <p className="mt-6 text-base leading-8 text-slate-600 md:text-lg">
              Stripe Checkout でのテスト購入が完了しました。実運用では、この後の納品案内や確認メール導線を追加できます。
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/#products"
                className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                プロダクト一覧に戻る
              </Link>
              <Link
                href="/#contact"
                className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-slate-300"
              >
                お問い合わせへ
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
