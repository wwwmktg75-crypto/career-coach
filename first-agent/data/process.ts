export type ProcessStepItem = {
  title: string;
  description: string;
  icon: string;
  tone: string;
};

export const processSteps: ProcessStepItem[] = [
  {
    title: 'ヒアリング・要件定義',
    description: '課題や目的を確認し、必要な機能や提供内容を整理します。',
    icon: '◔',
    tone: 'from-violet-100 to-white text-violet-600',
  },
  {
    title: '設計・プランニング',
    description: 'デザイン、機能、スケジュール、費用を含む実施内容をご提案します。',
    icon: '✎',
    tone: 'from-blue-100 to-white text-blue-600',
  },
  {
    title: '開発・制作',
    description: '合意した内容をもとに、デザイン制作やシステム開発を行います。',
    icon: '</>',
    tone: 'from-cyan-100 to-white text-cyan-600',
  },
  {
    title: 'テスト・品質確認',
    description: '動作確認や表示確認を行い、必要に応じて調整します。',
    icon: '✓',
    tone: 'from-emerald-100 to-white text-emerald-600',
  },
  {
    title: '納品・サポート',
    description: '納品後も、必要に応じて運用や改善をサポートします。',
    icon: '☏',
    tone: 'from-lime-100 to-white text-lime-600',
  },
];
