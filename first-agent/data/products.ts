export type Product = {
  name: string;
  category: string;
  price: string;
  href: string;
  thumbnailTone: string;
};

export const products: Product[] = [
  {
    name: 'WEBサイトテンプレート',
    category: 'WEB',
    price: '15,000円〜',
    href: '#contact',
    thumbnailTone: 'from-blue-100 via-white to-cyan-100',
  },
  {
    name: 'AIエージェント',
    category: 'AIソリューション',
    price: '30,000円〜',
    href: '#contact',
    thumbnailTone: 'from-slate-950 via-indigo-950 to-violet-900',
  },
  {
    name: 'Difyチャットボット',
    category: 'チャットボット',
    price: '50,000円〜',
    href: '#contact',
    thumbnailTone: 'from-indigo-100 via-white to-violet-100',
  },
  {
    name: '経理Saas',
    category: '業務システム',
    price: '150,000円〜',
    href: '#contact',
    thumbnailTone: 'from-slate-100 via-white to-emerald-100',
  },
];
