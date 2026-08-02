'use client';

import { useActionState } from 'react';
import { defaultState, submitContact } from '@/app/actions';

const inquiryTypes = [
  'デザインテンプレートについて',
  'AIエージェントについて',
  'SaaS・システム開発について',
  '協業・パートナーについて',
  'その他',
];

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, defaultState);

  return (
    <div className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-8 shadow-[var(--shadow-md)] backdrop-blur md:p-10">
      <form action={action} className="grid gap-5">
        <div className="grid gap-2">
          <label htmlFor="name" className="text-sm font-semibold text-slate-900">
            お名前
          </label>
          <input
            id="name"
            name="name"
            className="min-h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
            placeholder="山田 太郎"
          />
          {state.errors?.name ? <p className="text-sm text-rose-500">{state.errors.name}</p> : null}
        </div>

        <div className="grid gap-2">
          <label htmlFor="company" className="text-sm font-semibold text-slate-900">
            会社名・屋号
          </label>
          <input
            id="company"
            name="company"
            className="min-h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
            placeholder="First Agent"
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="email" className="text-sm font-semibold text-slate-900">
            メールアドレス
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="min-h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
            placeholder="contact@example.com"
          />
          {state.errors?.email ? <p className="text-sm text-rose-500">{state.errors.email}</p> : null}
        </div>

        <div className="grid gap-2">
          <label htmlFor="type" className="text-sm font-semibold text-slate-900">
            お問い合わせ種別
          </label>
          <select
            id="type"
            name="type"
            defaultValue=""
            className="min-h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
          >
            <option value="" disabled>
              選択してください
            </option>
            {inquiryTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {state.errors?.type ? <p className="text-sm text-rose-500">{state.errors.type}</p> : null}
        </div>

        <div className="grid gap-2">
          <label htmlFor="message" className="text-sm font-semibold text-slate-900">
            お問い合わせ内容
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
            placeholder="ご相談内容やご希望の進め方をご記入ください。"
          />
          {state.errors?.message ? <p className="text-sm text-rose-500">{state.errors.message}</p> : null}
        </div>

        <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
          <input type="checkbox" name="consent" className="mt-1 h-4 w-4 rounded border-slate-300" />
          <span className="text-sm leading-7 text-slate-600">個人情報の取り扱いに同意します。</span>
        </label>
        {state.errors?.consent ? <p className="-mt-3 text-sm text-rose-500">{state.errors.consent}</p> : null}

        <button
          type="submit"
          disabled={pending}
          className="mt-2 inline-flex min-h-12 items-center justify-center rounded-2xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? '送信中...' : '送信する'}
        </button>

        {state.message ? (
          <p className={`rounded-2xl px-4 py-3 text-sm leading-7 ${state.success ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-600'}`}>
            {state.message}
          </p>
        ) : null}
      </form>
    </div>
  );
}
