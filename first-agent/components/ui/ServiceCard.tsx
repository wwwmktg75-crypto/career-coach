import type { Service } from '@/data/services';

type ServiceCardProps = {
  service: Service;
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article
      className={`rounded-[2rem] border border-slate-200/80 bg-gradient-to-br ${service.panel} p-8 shadow-[var(--shadow-md)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-lg)]`}
    >
      <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-white/90 text-xl ${service.iconColor}`}>
        {service.icon}
      </div>
      <h3 className="mt-7 text-2xl font-semibold tracking-tight text-slate-950">{service.title}</h3>
      <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">{service.description}</p>
      <ul className="mt-6 space-y-3 text-sm text-slate-700">
        {service.items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className={`mt-1 text-xs font-bold ${service.iconColor}`}>✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <a href="#contact" className={`mt-8 inline-flex text-sm font-semibold ${service.linkColor}`}>
        詳しく見る →
      </a>
    </article>
  );
}
