'use client';

import { useState } from 'react';

type MobileMenuProps = {
  items: Array<{ label: string; href: string }>;
};

export function MobileMenu({ items }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label="メニューを開く"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white/90 text-slate-900 shadow-sm backdrop-blur"
      >
        <span className="flex flex-col gap-1.5">
          <span className={`h-0.5 w-5 rounded-full bg-current transition ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`h-0.5 w-5 rounded-full bg-current transition ${open ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-5 rounded-full bg-current transition ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </span>
      </button>

      {open ? (
        <div className="absolute inset-x-4 top-[5.5rem] rounded-[2rem] border border-slate-200 bg-white/95 p-4 shadow-[var(--shadow-lg)] backdrop-blur">
          <nav className="grid gap-2">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-950"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-2xl bg-slate-950 px-4 py-3 text-center text-sm font-semibold text-white"
            >
              お問い合わせ
            </a>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
