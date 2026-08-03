import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

const items = [
  ['販売事業者名', 'First Agent'],
  ['運営責任者', '恒川明子'],
  ['所在地', '福岡県福岡市中央区渡辺通5-16-10-1007'],
  ['電話番号', '090-4433-0930'],
  ['メールアドレス', 'wwwmktg75@gmail.com'],
  ['販売価格', '各商品・サービスページ、または個別見積書に記載'],
  ['商品代金以外の必要料金', 'インターネット接続料金、振込手数料等はお客様負担となります。'],
  ['支払方法', 'クレジットカード、銀行振込、その他別途案内する方法'],
  ['支払時期', '商品購入時または契約締結時に表示・案内する時期'],
  ['商品の引き渡し時期', 'デジタル商品は決済完了後に提供、開発案件は契約内容に基づき納品'],
  ['キャンセル・返品について', 'デジタル商品の性質上、提供後の返品は原則不可。継続課金は次回更新日前までに解約申請が必要です。'],
  ['デジタル商品の動作環境', '各商品ページに記載。未記載の場合は最新の主要ブラウザ環境を想定しています。'],
  ['継続課金の解約方法', 'メールまたはお問い合わせフォームにて解約申請を受け付けます。確認後、次回更新前までに停止します。'],
];

export default function LegalPage() {
  return (
    <div className="page-shell">
      <Header />
      <main className="section-space">
        <div className="container">
          <div className="mx-auto max-w-4xl rounded-[2rem] border border-slate-200/80 bg-white/90 p-8 shadow-[var(--shadow-md)] backdrop-blur md:p-12">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">
              Legal
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-5xl">
              特定商取引法に基づく表記
            </h1>
            <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">
              Stripe審査および購入前の確認に必要な事業情報を掲載しています。
            </p>
            <dl className="mt-10 grid gap-4">
              {items.map(([label, value]) => (
                <div
                  key={label}
                  className="grid gap-2 rounded-3xl border border-slate-200 bg-slate-50/80 p-5 md:grid-cols-[220px_1fr] md:items-start"
                >
                  <dt className="text-sm font-semibold text-slate-900">{label}</dt>
                  <dd className="text-sm leading-7 text-slate-600 md:text-base">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
