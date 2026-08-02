export function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-white/80 py-10 backdrop-blur">
      <div className="container">
        <div className="grid gap-10 rounded-[2rem] border border-slate-200/80 bg-white/90 p-8 shadow-[var(--shadow-md)] md:grid-cols-2 xl:grid-cols-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-950">About First Agent</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              AIとデザイン、テクノロジーの力で、ビジネスの可能性を広げるサービスを提供します。
            </p>
            <a
              href="#about"
              className="mt-6 inline-flex items-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
            >
              私たちについて
            </a>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-950">Contact</h2>
            <div className="mt-4 grid gap-3 text-sm text-slate-600">
              <a href="mailto:contact@firstagent.dev">contact@firstagent.dev</a>
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                @first_agent_official
              </a>
              <a
                href="#contact"
                className="inline-flex w-fit items-center rounded-2xl border border-slate-200 px-5 py-3 font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-slate-300"
              >
                お問い合わせ
              </a>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-950">Links</h2>
            <div className="mt-4 grid gap-3 text-sm text-slate-600">
              <a href="#services">サービス</a>
              <a href="#products">プロダクト</a>
              <a href="#process">制作実績</a>
              <a href="#about">事業者情報</a>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-950">Legal</h2>
            <div className="mt-4 grid gap-3 text-sm text-slate-600">
              <a href="/privacy">プライバシーポリシー</a>
              <a href="/terms">利用規約</a>
              <a href="/legal">特定商取引法に基づく表記</a>
            </div>
          </div>
        </div>
        <p className="mt-8 text-center text-sm text-slate-500">© 2026 First Agent. All rights reserved.</p>
      </div>
    </footer>
  );
}
