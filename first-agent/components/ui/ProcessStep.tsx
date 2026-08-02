import type { ProcessStepItem } from '@/data/process';

type ProcessStepProps = {
  step: ProcessStepItem;
  index: number;
};

export function ProcessStep({ step, index }: ProcessStepProps) {
  return (
    <article className="rounded-[1.75rem] border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur">
      <div className="flex items-center justify-between">
        <span className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${step.tone} text-lg`}>
          {step.icon}
        </span>
        <span className="text-sm font-semibold text-slate-300">0{index}</span>
      </div>
      <h3 className="mt-6 text-lg font-semibold text-slate-950">{step.title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{step.description}</p>
    </article>
  );
}
