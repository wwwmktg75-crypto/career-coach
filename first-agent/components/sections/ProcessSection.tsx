import { processSteps } from '@/data/process';
import { ProcessStep } from '@/components/ui/ProcessStep';
import { SectionTitle } from '@/components/ui/SectionTitle';

export function ProcessSection() {
  return (
    <section id="process" className="section-space">
      <div className="container">
        <SectionTitle
          eyebrow="Workflow"
          title="購入・ダウンロードの流れ"
          description="商品を選んでから受け取りまで、迷わず進められるシンプルな流れでご案内します。"
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
