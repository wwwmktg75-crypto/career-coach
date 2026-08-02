import { processSteps } from '@/data/process';
import { ProcessStep } from '@/components/ui/ProcessStep';
import { SectionTitle } from '@/components/ui/SectionTitle';

export function ProcessSection() {
  return (
    <section id="process" className="section-space">
      <div className="container">
        <SectionTitle
          eyebrow="Workflow"
          title="開発・提供のプロセス"
          description="スムーズな進行と丁寧なコミュニケーションで、ビジネスを支援します。"
        />
        <div className="mt-12 grid gap-4 xl:grid-cols-5">
          {processSteps.map((step, index) => (
            <ProcessStep key={step.title} step={step} index={index + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
