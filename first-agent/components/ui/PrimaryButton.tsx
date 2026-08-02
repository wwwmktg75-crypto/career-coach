type PrimaryButtonProps = {
  href: string;
  children: React.ReactNode;
};

export function PrimaryButton({ href, children }: PrimaryButtonProps) {
  return (
    <a
      href={href}
      className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-slate-800"
    >
      {children}
    </a>
  );
}
