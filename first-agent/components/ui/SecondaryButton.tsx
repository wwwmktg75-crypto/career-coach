type SecondaryButtonProps = {
  href: string;
  children: React.ReactNode;
};

export function SecondaryButton({ href, children }: SecondaryButtonProps) {
  return (
    <a
      href={href}
      className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-slate-200 bg-white/90 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white"
    >
      {children}
    </a>
  );
}
