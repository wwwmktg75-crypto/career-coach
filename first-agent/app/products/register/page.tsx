import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { ProductRegistrationForm } from '@/components/ui/ProductRegistrationForm';

export default function ProductRegisterPage() {
  return (
    <div className="page-shell">
      <Header />
      <main className="section-space">
        <div className="container">
          <div className="mx-auto max-w-5xl">
            <div className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-8 shadow-[var(--shadow-md)] backdrop-blur md:p-12">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">
                Product Register
              </p>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 md:text-5xl">
                プロダクト登録フォーム
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
                新しく掲載したいプロダクト情報を整理して送信するためのフォームです。価格、納品方法、サポート内容までまとめて登録できます。
              </p>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
              <section className="rounded-[2rem] border border-slate-200/80 bg-slate-950 p-8 text-white shadow-[var(--shadow-lg)]">
                <h2 className="text-xl font-semibold">登録時に入れる内容</h2>
                <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-200">
                  <li>プロダクト名とカテゴリ</li>
                  <li>価格表記と納品方法</li>
                  <li>用途や概要説明</li>
                  <li>サポート内容と補足メモ</li>
                </ul>
                <p className="mt-6 text-sm leading-7 text-slate-300">
                  送信後は `wwwmktg75@gmail.com` に通知されるため、掲載前の整理や確認フローにも使えます。
                </p>
              </section>

              <ProductRegistrationForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
