import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SecondaryButton } from '@/components/ui/SecondaryButton';

const stats = [
  { label: 'Total Revenue', value: '$24.8K', delta: '+12.3%' },
  { label: 'Active Users', value: '1,428', delta: '+8.2%' },
  { label: 'Conversion Rate', value: '3.24%', delta: '+15.3%' },
];

const chips = [
  {
    title: 'Design Template',
    body: 'ブランドらしさが伝わる販売用テンプレート',
    tone: 'from-purple-500/20 to-white',
  },
  {
    title: 'AI Agent',
    body: '24/7 自動対応の業務エージェント',
    tone: 'from-blue-500/20 to-white',
  },
  {
    title: 'SaaS Customization',
    body: 'あなたの業務に最適化した実装支援',
    tone: 'from-emerald-500/20 to-white',
  },
];

export function HeroSection() {
  return (
    <section id="home" className="section-space pt-8 md:pt-12">
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
          <div>
            <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
              AI × Design × Development
            </span>
            <h1 className="mt-8 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-slate-950 md:text-6xl">
              AIとデザインで、
              <br />
              ビジネスの未来を加速する。
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
              デザインテンプレートの販売からAIエージェントの開発、SaaSのカスタマイズ開発まで。ビジネスの成長を支援するソリューションをワンストップで提供します。
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <PrimaryButton href="#services">サービスを見る</PrimaryButton>
              <SecondaryButton href="#products">ポートフォリオを見る</SecondaryButton>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-[2rem] border border-slate-200/80 bg-white/85 p-4 shadow-[var(--shadow-lg)] backdrop-blur md:p-6">
              <div className="rounded-[1.6rem] border border-slate-200 bg-slate-50 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                      Dashboard
                    </p>
                    <p className="mt-1 text-2xl font-semibold text-slate-950">Welcome back, Alex</p>
                  </div>
                  <div className="rounded-2xl bg-white px-4 py-2 text-sm font-medium text-slate-500 shadow-sm">
                    Overview
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-3">
                  {stats.map((stat) => (
                    <div key={stat.label} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                      <p className="text-xs font-medium text-slate-400">{stat.label}</p>
                      <div className="mt-3 flex items-end justify-between gap-3">
                        <p className="text-2xl font-semibold text-slate-950">{stat.value}</p>
                        <span className="text-xs font-semibold text-emerald-500">{stat.delta}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Revenue Overview</p>
                      <p className="text-sm text-slate-500">Monthly performance snapshot</p>
                    </div>
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                      +18% this quarter
                    </span>
                  </div>
                  <div className="flex h-48 items-end gap-3 rounded-[1.25rem] bg-[linear-gradient(180deg,rgba(219,234,254,0.5),rgba(255,255,255,1))] px-2 pb-3 pt-8">
                    {[42, 54, 48, 69, 61, 72, 81].map((height, index) => (
                      <div key={height} className="flex flex-1 flex-col items-center gap-3">
                        <div
                          className={`w-full rounded-full bg-gradient-to-t ${
                            index % 2 === 0 ? 'from-blue-600 to-cyan-300' : 'from-indigo-500 to-violet-300'
                          }`}
                          style={{ height: `${height}%` }}
                        />
                        <span className="text-xs text-slate-400">
                          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'][index]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute -left-4 top-[4.5rem] hidden w-56 rounded-[1.6rem] border border-slate-200/90 bg-white/95 p-4 shadow-[var(--shadow-md)] md:block">
              <p className="text-sm font-semibold text-slate-900">{chips[0].title}</p>
              <p className="mt-1 text-xs leading-6 text-slate-500">{chips[0].body}</p>
            </div>
            <div className="pointer-events-none absolute -right-4 top-6 hidden w-56 rounded-[1.6rem] border border-slate-200/90 bg-white/95 p-4 shadow-[var(--shadow-md)] md:block">
              <p className="text-sm font-semibold text-slate-900">{chips[1].title}</p>
              <p className="mt-1 text-xs leading-6 text-slate-500">{chips[1].body}</p>
            </div>
            <div className="pointer-events-none absolute -right-5 bottom-12 hidden w-60 rounded-[1.6rem] border border-slate-200/90 bg-white/95 p-4 shadow-[var(--shadow-md)] md:block">
              <p className="text-sm font-semibold text-slate-900">{chips[2].title}</p>
              <p className="mt-1 text-xs leading-6 text-slate-500">{chips[2].body}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
