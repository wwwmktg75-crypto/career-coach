import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SecondaryButton } from '@/components/ui/SecondaryButton';

const includedItems = [
  'Difyチャットボットの基本構成',
  'FAQまたは案内用の初期シナリオ設計',
  '運用開始用の設定ガイド',
  '導入時の質問対応',
];

const recommendedFor = [
  'Webサイトにチャット対応を置きたい方',
  '資料請求や問い合わせの一次対応を自動化したい方',
  'Dify を使って早く運用を始めたい事業者',
];

const purchaseNotes = [
  ['価格', '50,000円〜（日本円）'],
  ['提供方法', '決済確認後、設定内容・構成ファイル・導入案内をオンラインで納品'],
  ['カスタマイズ', 'ナレッジ量や導線設計に応じて個別相談可能'],
  ['お問い合わせ', 'フォームまたは wwwmktg75@gmail.com から受付'],
];

const productInfo = [
  ['AIアプリの名称と用途', 'First Agent Difyチャットボット。サイト訪問者への案内、FAQ対応、問い合わせ一次受付を行うAIチャットボットです。'],
  ['購入すると受け取れるファイル', 'ボット構成案、プロンプト設計、設定情報、導入ガイド、必要に応じた補足資料。'],
  ['対応環境', '主要モダンブラウザ、Dify 利用環境、一般的なPC操作環境。'],
  ['納品方法', '決済確認後、共有リンクまたはダウンロード形式で納品します。'],
  ['納品時期', '通常は決済確認後 3〜5営業日以内です。'],
  ['価格が日本円であること', '表示価格はすべて日本円です。要件に応じて変動します。'],
  ['返金・キャンセル条件', 'デジタル商品および構成提供のため、納品後の返金は原則不可です。'],
  ['サポート内容', '初期導入に関する案内、基本的な設定質問への回答、軽微な調整相談を含みます。'],
];

export default function DifyChatbotProductPage() {
  return (
    <div className="page-shell">
      <Header />
      <main className="section-space">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/90 shadow-[var(--shadow-lg)]">
              <img
                src="/products/dify-chatbot.png"
                alt="Difyチャットボットのプレビュー"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-8 shadow-[var(--shadow-md)] backdrop-blur md:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">Product Detail</p>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 md:text-5xl">
                Difyチャットボット
              </h1>
              <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">
                Dify を活用して、問い合わせや案内対応をスムーズに始めるためのチャットボット商品です。最小構成から導入しやすく、用途に応じた調整も可能です。
              </p>
              <p className="mt-6 text-3xl font-semibold text-slate-950">50,000円〜</p>
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
