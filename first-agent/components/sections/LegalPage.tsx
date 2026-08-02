type LegalPageProps = {
  title: string;
  description: string;
  sections: Array<{ title: string; body: string }>;
};

export function LegalPage({ title, description, sections }: LegalPageProps) {
  return (
    <main className="section-space">
      <div className="container">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-slate-200/80 bg-white/90 p-8 shadow-[var(--shadow-md)] backdrop-blur md:p-12">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">Legal</p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-5xl">{title}</h1>
          <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">{description}</p>
          <div className="mt-10 space-y-5">
            {sections.map((section) => (
              <section key={section.title} className="rounded-[1.75rem] border border-slate-200 bg-slate-50/80 p-6">
                <h2 className="text-lg font-semibold text-slate-950">{section.title}</h2>
                <p className="mt-3 text-sm leading-8 text-slate-600 md:text-base">{section.body}</p>
              </section>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
