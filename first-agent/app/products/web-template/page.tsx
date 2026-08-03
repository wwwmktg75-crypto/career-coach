import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SecondaryButton } from '@/components/ui/SecondaryButton';

const includedItems = [
  'トップページと主要セクションの完成デザイン',
  'すぐに差し替えやすいレイアウト構成',
  'サービス紹介・CTA・導線を含むLP想定設計',
  'スマホ表示まで意識したテンプレート構成',
];

const recommendedFor = [
  '事業サイトやLPを短期間で立ち上げたい方',
  '清潔感のある法人向けデザインを探している方',
  '自社サービス紹介を整えて販売導線を作りたい方',
];

const purchaseNotes = [
  ['価格', '15,000円〜'],
  ['提供方法', '決済確認後にダウンロード形式でご案内'],
  ['カスタマイズ', '必要に応じて別途ご相談可能'],
  ['お問い合わせ', 'フォームまたは wwwmktg75@gmail.com から受付'],
];

export default function WebTemplateProductPage() {
  return (
    <div className="page-shell">
      <Header />
      <main className="section-space">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/90 shadow-[var(--shadow-lg)]">
              <img
                src="/products/web-template.png"
                alt="WEBサイトテンプレートのプレビュー"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-8 shadow-[var(--shadow-md)] backdrop-blur md:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">Product Detail</p>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 md:text-5xl">
                WEBサイトテンプレート
              </h1>
              <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">
                事業紹介やサービス販売に使いやすい、清潔感のあるWEBサイトテンプレートです。短期間で立ち上げたい方向けに、情報整理しやすい構成と見やすい導線を備えています。
              </p>
              <p className="mt-6 text-3xl font-semibold text-slate-950">15,000円〜</p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <PrimaryButton href="/#contact">購入について相談する</PrimaryButton>
                <SecondaryButton href="/#products">一覧に戻る</SecondaryButton>
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            <section className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-8 shadow-[var(--shadow-md)]">
              <h2 className="text-xl font-semibold text-slate-950">含まれる内容</h2>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-600">
                {includedItems.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 text-blue-600">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-8 shadow-[var(--shadow-md)]">
              <h2 className="text-xl font-semibold text-slate-950">おすすめの方</h2>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-600">
                {recommendedFor.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 text-violet-600">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-[2rem] border border-slate-200/80 bg-slate-950 p-8 text-white shadow-[var(--shadow-lg)]">
              <h2 className="text-xl font-semibold">ご購入前のご案内</h2>
              <dl className="mt-5 grid gap-4">
                {purchaseNotes.map(([label, value]) => (
                  <div key={label} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                    <dt className="text-sm font-semibold text-white/75">{label}</dt>
                    <dd className="mt-2 text-sm leading-7 text-slate-200">{value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
