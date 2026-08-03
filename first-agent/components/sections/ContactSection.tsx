import { SectionTitle } from '@/components/ui/SectionTitle';
import { ContactForm } from '@/components/ui/ContactForm';

export function ContactSection() {
  return (
    <section id="contact" className="section-space">
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-[2rem] border border-slate-200/80 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-900 p-8 text-white shadow-[var(--shadow-lg)] md:p-10">
            <SectionTitle
              align="left"
              eyebrow="Contact"
              title="お問い合わせ"
              description="サービスのご相談、開発のご依頼、商品に関するご質問など、お気軽にお問い合わせください。"
              theme="dark"
            />
            <div className="mt-8 space-y-5 text-sm leading-8 text-slate-200 md:text-base">
              <p>提供サービス、価格、納期、継続課金商品の運用設計まで、事業フェーズに合わせて整理してご提案します。</p>
              <p>
                メールでのご相談:
                <br />
                <a href="mailto:wwwmktg75@gmail.com" className="font-semibold text-white">
                  wwwmktg75@gmail.com
                </a>
              </p>
              <p>営業時間: 平日10:00〜18:00</p>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
