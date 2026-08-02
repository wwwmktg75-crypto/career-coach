export type Product = {
  name: string;
  category: string;
  price: string;
  href: string;
  thumbnailTone: string;
};

export const products: Product[] = [
  {
    name: 'SaaSランディングページテンプレート',
    category: 'Webサイトテンプレート',
    price: '¥12,800',
    href: '#contact',
    thumbnailTone: 'from-blue-100 via-white to-cyan-100',
  },
  {
    name: 'ビジネスプレゼンテーションテンプレート',
    category: 'プレゼンテーション',
    price: '¥8,900',
    href: '#contact',
    thumbnailTone: 'from-slate-100 via-white to-indigo-100',
  },
  {
    name: 'カスタマーサポートAIエージェント',
    category: 'AIエージェント',
    price: '¥49,800 / 月',
    href: '#contact',
    thumbnailTone: 'from-slate-950 via-indigo-950 to-violet-900',
  },
  {
    name: '分析ダッシュボードテンプレート',
    category: 'ダッシュボード',
    price: '¥15,800',
    href: '#contact',
    thumbnailTone: 'from-sky-100 via-white to-blue-100',
  },
  {
    name: 'ECプラットフォームカスタマイズ',
    category: 'SaaSカスタマイズ',
    price: '¥298,000〜',
    href: '#contact',
    thumbnailTone: 'from-slate-100 via-white to-emerald-100',
  },
];
