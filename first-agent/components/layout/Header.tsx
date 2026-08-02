'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { PrimaryButton } from '@/components/ui/PrimaryButton';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Products', href: '#products' },
  { label: 'Works', href: '#process' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        scrolled ? 'border-b border-slate-200/80 bg-white/85 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <div className="container">
        <div className="flex h-20 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 shadow-lg shadow-blue-500/15">
              <span className="relative block h-5 w-5 rounded-full border-2 border-white">
                <span className="absolute left-1 top-1 block h-1.5 w-1.5 rounded-full bg-white" />
                <span className="absolute -right-1 top-1/2 h-0.5 w-2 -translate-y-1/2 rounded-full bg-white" />
              </span>
            </span>
            <span className="text-lg font-semibold tracking-tight text-slate-950">First Agent</span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 lg:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-slate-950">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <PrimaryButton href="#contact">お問い合わせ</PrimaryButton>
          </div>

          <MobileMenu items={navItems} />
        </div>
      </div>
    </header>
  );
}
