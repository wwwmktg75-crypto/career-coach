import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { LegalPage } from '@/components/sections/LegalPage';

const sections = [
  {
    title: '取得する情報',
    body:
      'お問い合わせフォームを通じて、お名前、会社名・屋号、メールアドレス、お問い合わせ種別、お問い合わせ内容を取得します。',
  },
  {
    title: '利用目的',
    body:
      '取得した情報は、お問い合わせ対応、サービス提供、商品案内、運営改善のために利用します。',
  },
  {
    title: '第三者提供',
    body:
      '法令に基づく場合を除き、ご本人の同意なく第三者へ提供しません。ただし、お問い合わせ送信に外部フォームサービスを利用する場合があります。',
  },
  {
    title: 'Cookieの利用',
    body:
      'サイトの利便性向上や利用状況把握のため、Cookieまたは類似技術を使用する場合があります。',
  },
  {
    title: 'アクセス解析',
    body:
      '今後、アクセス解析ツールを導入する場合があります。導入時は本ページにて利用状況を明示します。',
  },
  {
    title: '個人情報の管理',
    body:
      '取得した情報は適切に管理し、不正アクセス、紛失、改ざん、漏えいの防止に努めます。',
  },
  {
    title: 'お問い合わせ窓口',
    body:
      '個人情報に関するお問い合わせは、代表 恒川明子、メールアドレス wwwmktg75@gmail.com、電話番号 090-4433-0930、所在地 福岡県福岡市中央区渡辺通5-16-10-1007 まで、またはお問い合わせフォームよりご連絡ください。',
  },
  {
    title: '改定について',
    body:
      '本ポリシーは、必要に応じて改定することがあります。重要な変更がある場合は本サイト上でお知らせします。',
  },
];

export default function PrivacyPage() {
  return (
    <div className="page-shell">
      <Header />
      <LegalPage
        title="プライバシーポリシー"
        description="First Agentにおける個人情報の取り扱いについてご案内します。"
        sections={sections}
      />
      <Footer />
    </div>
  );
}
