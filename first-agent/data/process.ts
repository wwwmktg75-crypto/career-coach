export type ProcessStepItem = {
  title: string;
  description: string;
  icon: string;
  tone: string;
};

export const processSteps: ProcessStepItem[] = [
  {
    title: '商品を選ぶ',
    description: 'プロダクト一覧や詳細ページから、目的に合う商品を選びます。',
    icon: '◌',
    tone: 'from-violet-100 to-white text-violet-600',
  },
  {
    title: '購入連絡をする',
    description: 'お問い合わせフォームまたはメールから、ご購入希望の商品をご連絡ください。',
    icon: '✉',
    tone: 'from-blue-100 to-white text-blue-600',
  },
  {
    title: '決済を行う',
    description: 'ご案内する方法で決済いただき、内容確認後にご提供準備を進めます。',
    icon: '¥',
    tone: 'from-cyan-100 to-white text-cyan-600',
  },
  {
    title: 'ダウンロードする',
    description: '決済確認後、ダウンロード方法または受け取り手順をご案内します。',
    icon: '↓',
    tone: 'from-emerald-100 to-white text-emerald-600',
  },
];
