export type Service = {
  title: string;
  description: string;
  items: string[];
  icon: string;
  panel: string;
  iconColor: string;
  linkColor: string;
};

export const services: Service[] = [
  {
    title: 'デザインテンプレート販売',
    description:
      '高品質で使いやすいデザインテンプレートを提供します。Webサイト、プレゼンテーション、SNS投稿など、さまざまな用途に対応します。',
    items: [
      'Webサイトテンプレート',
      'LPデザインテンプレート',
      'プレゼンテーションテンプレート',
      'SNS・マーケティング素材',
    ],
    icon: '✦',
    panel: 'from-violet-50 via-white to-slate-50',
    iconColor: 'text-violet-600',
    linkColor: 'text-violet-600',
  },
  {
    title: 'AIエージェント販売・開発',
    description:
      '業務効率化を実現するAIエージェントを提供します。既製のエージェント販売から、業務に合わせた個別開発まで対応します。',
    items: ['カスタマーサポートAI', '営業・マーケティングAI', 'データ分析・レポートAI', '社内業務自動化AI'],
    icon: '◌',
    panel: 'from-teal-50 via-white to-slate-50',
    iconColor: 'text-teal-600',
    linkColor: 'text-teal-600',
  },
  {
    title: 'SaaSカスタマイズ開発',
    description:
      '既存SaaSのカスタマイズや、新規Webサービスの開発を行います。課題に合わせて必要な機能を設計・実装します。',
    items: ['既存SaaSのカスタマイズ', '業務システム開発', '新規Webサービス開発', 'API連携・システム統合'],
    icon: '</>',
    panel: 'from-blue-50 via-white to-slate-50',
    iconColor: 'text-blue-600',
    linkColor: 'text-blue-600',
  },
];
