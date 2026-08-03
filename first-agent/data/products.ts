export type Product = {
  name: string;
  category: string;
  price: string;
  href: string;
  thumbnailSrc: string;
  thumbnailAlt: string;
};

export const products: Product[] = [
  {
    name: 'WEBサイトテンプレート',
    category: 'WEB',
    price: '15,000円〜',
    href: '/products/web-template',
    thumbnailSrc: '/products/web-template.png',
    thumbnailAlt: 'WEBサイトテンプレートのサムネイル',
  },
  {
    name: 'AIエージェント',
    category: 'AIソリューション',
    price: '30,000円〜',
    href: '#contact',
    thumbnailSrc: '/products/ai-agent.png',
    thumbnailAlt: 'AIエージェントのサムネイル',
  },
  {
    name: 'Difyチャットボット',
    category: 'チャットボット',
    price: '50,000円〜',
    href: '#contact',
    thumbnailSrc: '/products/dify-chatbot.png',
    thumbnailAlt: 'Difyチャットボットのサムネイル',
  },
  {
    name: '経理Saas',
    category: '業務システム',
    price: '150,000円〜',
    href: '#contact',
    thumbnailSrc: '/products/accounting-saas.png',
    thumbnailAlt: '経理Saasのサムネイル',
  },
];
