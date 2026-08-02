type SectionTitleProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: 'left' | 'center';
  theme?: 'light' | 'dark';
};

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = 'center',
  theme = 'light',
}: SectionTitleProps) {
  const isDark = theme === 'dark';

  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'}>
      <p
        className={`text-sm font-semibold uppercase tracking-[0.24em] ${
          isDark ? 'text-blue-200' : 'text-blue-600'
        }`}
      >
        {eyebrow}
      </p>
      <h2 className={`mt-4 text-3xl font-semibold tracking-tight md:text-5xl ${isDark ? 'text-white' : 'text-slate-950'}`}>
        {title}
      </h2>
      <p className={`mt-5 text-base leading-8 md:text-lg ${isDark ? 'text-slate-200' : 'text-slate-600'}`}>
        {description}
      </p>
    </div>
  );
}
