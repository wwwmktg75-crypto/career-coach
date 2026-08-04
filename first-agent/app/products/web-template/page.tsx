import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SecondaryButton } from '@/components/ui/SecondaryButton';
import { StripeCheckoutButton } from '@/components/ui/StripeCheckoutButton';

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

const productInfo = [
  ['AIアプリの名称と用途', 'First Agent WEBサイトテンプレート。AI・SaaS・デジタルサービス事業の紹介サイトを短期間で公開するためのデジタル商品です。'],
  ['購入すると受け取れるファイル', 'HTML / CSS / JavaScript または Next.js ベースのテンプレート一式、画像差し替え用素材案内、利用ガイド。提供内容は商品仕様に応じてご案内します。'],
  ['対応環境', '最新版の Google Chrome、Safari、Microsoft Edge など主要モダンブラウザ。編集時は一般的なPC環境を推奨します。'],
  ['納品方法', '決済確認後、ダウンロードURLまたはオンラインストレージ経由で納品します。'],
  ['納品時期', '通常は決済確認後 1〜3営業日以内にご案内します。'],
  ['価格について', '表示価格はすべて日本円（税込または別途案内）です。'],
  ['返金・キャンセル条件', 'デジタル商品のため、納品後の返金・返品は原則お受けしていません。納品前のキャンセルは対応可否を個別確認します。'],
  ['サポート内容', '受け取り方法の案内、初期確認、軽微な不明点への回答をメールでサポートします。追加カスタマイズは別途ご相談となります。'],
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
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <PrimaryButton href="/#contact">購入について相談する</PrimaryButton>
                <StripeCheckoutButton productKey="web-template" />
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

          <section className="mt-12 rounded-[2rem] border border-slate-200/80 bg-white/90 p-8 shadow-[var(--shadow-md)] backdrop-blur md:p-10">
            <h2 className="text-2xl font-semibold text-slate-950">商品情報</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">
              ご購入前に確認いただきたい提供条件と納品情報をまとめています。
            </p>
            <dl className="mt-8 grid gap-4">
              {productInfo.map(([label, value]) => (
                <div
                  key={label}
                  className="grid gap-2 rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-5 md:grid-cols-[220px_1fr] md:items-start"
                >
                  <dt className="text-sm font-semibold text-slate-950">{label}</dt>
                  <dd className="text-sm leading-7 text-slate-600 md:text-base">{value}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
