import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { LegalPage } from '@/components/sections/LegalPage';

const sections = [
  {
    title: '適用範囲',
    body:
      '本規約は、First Agentが提供するWebサイト、デジタルコンテンツ販売、AIエージェント提供、開発支援サービスに適用されます。',
  },
  {
    title: '禁止事項',
    body:
      '法令違反、公序良俗に反する行為、第三者の権利侵害、当サイトの運営を妨げる行為を禁止します。',
  },
  {
    title: '知的財産権',
    body:
      '本サイトおよび提供コンテンツに関する著作権その他の知的財産権は、First Agentまたは正当な権利者に帰属します。',
  },
  {
    title: 'サービス内容の変更',
    body:
      'サービス内容、価格、提供条件は、必要に応じて予告なく変更される場合があります。',
  },
  {
    title: '免責事項',
    body:
      '本サイトの情報は正確性に努めますが、その完全性や有用性を保証するものではありません。利用により生じた損害について、法令上許される範囲で責任を負いません。',
  },
  {
    title: '利用停止',
    body:
      '不正利用や規約違反が認められた場合、サービス提供の停止または契約解除を行うことがあります。',
  },
  {
    title: '準拠法',
    body: '本規約は日本法に準拠します。',
  },
  {
    title: '管轄裁判所',
    body:
      '本サービスに関して紛争が生じた場合、福岡地方裁判所または福岡簡易裁判所を第一審の専属的合意管轄裁判所とします。',
  },
];

export default function TermsPage() {
  return (
    <div className="page-shell">
      <Header />
      <LegalPage
        title="利用規約"
        description="First Agentのサービス・コンテンツをご利用いただく際の基本条件です。"
        sections={sections}
      />
      <Footer />
    </div>
  );
}
