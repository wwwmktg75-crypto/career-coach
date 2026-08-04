import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SecondaryButton } from '@/components/ui/SecondaryButton';
import { StripeCheckoutButton } from '@/components/ui/StripeCheckoutButton';

const includedItems = [
  '経理SaaSの基本設計またはテンプレート構成',
  '必要画面の設計方針',
  '導入・引き渡し用の案内資料',
  '初期確認サポート',
];

const recommendedFor = [
  '小規模事業の経理管理を整理したい方',
  '請求・入出金・売上管理の見える化を進めたい方',
  '自社向けの簡易業務システムを検討している方',
];

const purchaseNotes = [
  ['価格', '150,000円〜（日本円）'],
  ['提供方法', '決済確認後、仕様に応じてデータ一式または構成ファイルをオンライン納品'],
  ['カスタマイズ', '要件に応じて個別見積もりで対応'],
  ['お問い合わせ', 'フォームまたは wwwmktg75@gmail.com から受付'],
];

const productInfo = [
  ['AIアプリの名称と用途', 'First Agent 経理SaaS。売上、請求、入出金、レポート管理などの経理業務を整理するための業務向けデジタル商品です。'],
  ['購入すると受け取れるファイル', '画面構成案、仕様資料、テンプレートデータ、導入ガイド、必要に応じた補足ドキュメント。'],
  ['対応環境', '主要モダンブラウザ、一般的なPC環境、要件に応じたクラウド利用環境。'],
  ['納品方法', '決済確認後、ダウンロードURLまたは共有ストレージ経由で納品します。'],
  ['納品時期', '通常は決済確認後 5〜10営業日以内を目安にご案内します。'],
  ['価格について', '表示価格はすべて日本円です。機能要件に応じて変動します。'],
  ['返金・キャンセル条件', '設計・構成提供を含むデジタル商品のため、納品後の返金は原則不可です。'],
  ['サポート内容', '受け取り後の基本確認、初期導入に関する案内、軽微な質疑対応をメールで行います。'],
];

export default function AccountingSaasProductPage() {
  return (
    <div className="page-shell">
      <Header />
      <main className="section-space">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/90 shadow-[var(--shadow-lg)]">
              <img
                src="/products/accounting-saas.png"
                alt="経理Saasのプレビュー"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-8 shadow-[var(--shadow-md)] backdrop-blur md:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">Product Detail</p>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 md:text-5xl">
                経理Saas
              </h1>
              <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">
                経理管理を整理しやすくするためのSaaS構成商品です。業務の見える化や整理に役立つ基本設計をもとに、必要に応じて個別調整にもつなげられます。
              </p>
              <p className="mt-6 text-3xl font-semibold text-slate-950">150,000円〜</p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <PrimaryButton href="/#contact">購入について相談する</PrimaryButton>
                <StripeCheckoutButton productKey="accounting-saas" />
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
