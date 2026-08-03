import { SectionTitle } from '@/components/ui/SectionTitle';

const businessInfo = [
  ['屋号', 'First Agent'],
  ['代表', '恒川明子'],
  ['事業形態', '個人事業'],
  ['所在地', '福岡県福岡市中央区渡辺通5-16-10-1007'],
  ['事業内容', 'デジタルコンテンツ販売、AIシステム開発、Webサービス開発'],
  ['電話番号', '090-4433-0930'],
  ['メール連絡先', 'wwwmktg75@gmail.com'],
  ['営業時間', '平日10:00〜18:00'],
  ['お問い合わせ', 'メールフォームまたはメールにて受付'],
];

export function AboutSection() {
  return (
    <section id="about" className="section-space pt-0">
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2rem] border border-slate-200/80 bg-white/85 p-8 shadow-[var(--shadow-md)] backdrop-blur md:p-10">
            <SectionTitle
              align="left"
              eyebrow="About"
              title="About First Agent"
              description="Stripe審査や取引先の確認でも事業内容が伝わるよう、提供範囲と運営情報を明示しています。"
            />
            <div className="mt-8 space-y-5 text-sm leading-8 text-slate-600 md:text-base">
              <p>
                First Agentは、AI、デザイン、Web開発を組み合わせ、個人事業主や中小企業のデジタル活用を支援するクリエイティブ事業です。
              </p>
              <p>
                デザインテンプレートやAIエージェントなどのデジタル商品の販売、Webサービスの企画・開発、既存SaaSのカスタマイズ開発を行っています。
              </p>
            </div>
          </div>
          <div className="rounded-[2rem] border border-slate-200/80 bg-slate-950 p-8 text-white shadow-[var(--shadow-lg)] md:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-200">Business Info</p>
            <dl className="mt-8 grid gap-4">
              {businessInfo.map(([label, value]) => (
                <div
                  key={label}
                  className="grid gap-2 rounded-[1.5rem] border border-white/10 bg-white/5 p-4 md:grid-cols-[120px_1fr]"
                >
                  <dt className="text-sm font-semibold text-white/80">{label}</dt>
                  <dd className="text-sm leading-7 text-slate-200">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
