import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SecondaryButton } from '@/components/ui/SecondaryButton';
import { StripeCheckoutButton } from '@/components/ui/StripeCheckoutButton';

const includedItems = [
  'AIエージェント本体の初期構成',
  '想定業務に合わせた基本プロンプト設計',
  '導入時の利用ガイド',
  '運用開始に必要な初期設定案内',
];

const recommendedFor = [
  '問い合わせ対応を効率化したい事業者',
  '社内の定型業務をAIに任せたい方',
  '小さくAI導入を始めたい中小企業',
];

const purchaseNotes = [
  ['価格', '30,000円〜（日本円）'],
  ['提供方法', '決済確認後、設定ファイル一式または導入用ドキュメントをオンラインで納品'],
  ['カスタマイズ', '業務内容に応じて別途お見積もり可能'],
  ['お問い合わせ', 'フォームまたは wwwmktg75@gmail.com から受付'],
];

const productInfo = [
  ['AIアプリの名称と用途', 'First Agent AIエージェント。問い合わせ対応、社内業務補助、情報整理などの定型タスクを効率化するためのAIアプリです。'],
  ['購入すると受け取れるファイル', '設定ファイル、プロンプト設計書、導入ガイド、必要に応じた補足ドキュメント。'],
  ['対応環境', '最新版の主要ブラウザ、一般的なPC環境、利用先サービスの仕様に準拠したクラウド環境。'],
  ['納品方法', '決済確認後、ダウンロードURLまたは共有リンク経由で納品します。'],
  ['納品時期', '通常は決済確認後 3〜5営業日以内にご案内します。'],
  ['価格について', '表示価格はすべて日本円です。仕様に応じて個別見積もりとなる場合があります。'],
  ['返金・キャンセル条件', 'デジタル商品のため、納品後の返金は原則不可です。着手前のキャンセルは個別確認となります。'],
  ['サポート内容', '初期設定に関する案内、軽微な操作案内、受け取り後の基本的な質問対応をメールで行います。'],
];

export default function AiAgentProductPage() {
  return (
    <div className="page-shell">
      <Header />
      <main className="section-space">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/90 shadow-[var(--shadow-lg)]">
              <img
                src="/products/dify-chatbot.png"
                alt="AIエージェントのプレビュー"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-8 shadow-[var(--shadow-md)] backdrop-blur md:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">Product Detail</p>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 md:text-5xl">
                AIエージェント
              </h1>
              <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">
                業務の一部をAIに任せたい方向けの導入しやすいエージェント商品です。用途に応じて、問い合わせ対応、案内、社内補助などの役割を持たせられます。
              </p>
              <p className="mt-6 text-3xl font-semibold text-slate-950">30,000円〜</p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <PrimaryButton href="/#contact">購入について相談する</PrimaryButton>
                <StripeCheckoutButton productKey="ai-agent" />
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
