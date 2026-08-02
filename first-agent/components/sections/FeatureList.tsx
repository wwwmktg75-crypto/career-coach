const features = [
  {
    title: 'AIネイティブ',
    body: '最新のAI技術を活用し、効率的で実用的なサービスを提供します。',
    accent: 'text-blue-600',
  },
  {
    title: '高品質なデザイン',
    body: '見た目だけでなく、使いやすさと成果につながる設計を重視します。',
    accent: 'text-violet-600',
  },
  {
    title: '柔軟な開発力',
    body: '既存サービスのカスタマイズから新規開発まで、課題に合わせて対応します。',
    accent: 'text-teal-600',
  },
];

export function FeatureList() {
  return (
    <section className="pb-8 md:pb-12">
      <div className="container">
        <div className="grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-[1.75rem] border border-slate-200/80 bg-white/80 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-[var(--shadow-md)]"
            >
              <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-50 ${feature.accent}`}>
                <span className="text-lg">✦</span>
              </div>
              <h2 className="text-lg font-semibold text-slate-950">{feature.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{feature.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
