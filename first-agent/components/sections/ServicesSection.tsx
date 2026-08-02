import { services } from '@/data/services';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ServiceCard } from '@/components/ui/ServiceCard';

export function ServicesSection() {
  return (
    <section id="services" className="section-space">
      <div className="container">
        <SectionTitle
          eyebrow="Services"
          title="サービス"
          description="ビジネスのさまざまなフェーズで役立つ、3つのソリューションを提供します。"
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
