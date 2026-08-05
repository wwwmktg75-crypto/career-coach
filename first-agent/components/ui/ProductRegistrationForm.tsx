'use client';

import { useActionState } from 'react';
import { submitProductRegistration, type ProductRegistrationState } from '@/app/actions';

const initialState: ProductRegistrationState = {
  success: false,
  message: '',
};

export function ProductRegistrationForm() {
  const [state, action, pending] = useActionState(submitProductRegistration, initialState);

  return (
    <div className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-8 shadow-[var(--shadow-md)] backdrop-blur md:p-10">
      <form action={action} className="grid gap-5">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="grid gap-2">
            <label htmlFor="applicantName" className="text-sm font-semibold text-slate-900">
              ご担当者名
            </label>
            <input
              id="applicantName"
              name="applicantName"
              className="min-h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
              placeholder="山田 太郎"
            />
            {state.errors?.applicantName ? <p className="text-sm text-rose-500">{state.errors.applicantName}</p> : null}
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
        </div>

        <div className="grid gap-5 md:grid-cols-2">
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
            <label htmlFor="productName" className="text-sm font-semibold text-slate-900">
              プロダクト名
            </label>
            <input
              id="productName"
              name="productName"
              className="min-h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
              placeholder="例: AIチャットアシスタント"
            />
            {state.errors?.productName ? <p className="text-sm text-rose-500">{state.errors.productName}</p> : null}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <div className="grid gap-2">
            <label htmlFor="category" className="text-sm font-semibold text-slate-900">
              カテゴリ
            </label>
            <input
              id="category"
              name="category"
              className="min-h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
              placeholder="例: AIエージェント"
            />
            {state.errors?.category ? <p className="text-sm text-rose-500">{state.errors.category}</p> : null}
          </div>

          <div className="grid gap-2">
            <label htmlFor="price" className="text-sm font-semibold text-slate-900">
              価格
            </label>
            <input
              id="price"
              name="price"
              className="min-h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
              placeholder="例: 50,000円〜"
            />
            {state.errors?.price ? <p className="text-sm text-rose-500">{state.errors.price}</p> : null}
          </div>

          <div className="grid gap-2">
            <label htmlFor="deliveryMethod" className="text-sm font-semibold text-slate-900">
              納品方法
            </label>
            <input
              id="deliveryMethod"
              name="deliveryMethod"
              className="min-h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
              placeholder="例: ダウンロードURL"
            />
            {state.errors?.deliveryMethod ? <p className="text-sm text-rose-500">{state.errors.deliveryMethod}</p> : null}
          </div>
        </div>

        <div className="grid gap-2">
          <label htmlFor="summary" className="text-sm font-semibold text-slate-900">
            プロダクト概要
          </label>
          <textarea
            id="summary"
            name="summary"
            rows={5}
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
            placeholder="何ができる商品か、どんな用途なのかをご記入ください。"
          />
          {state.errors?.summary ? <p className="text-sm text-rose-500">{state.errors.summary}</p> : null}
        </div>

        <div className="grid gap-2">
          <label htmlFor="support" className="text-sm font-semibold text-slate-900">
            サポート内容
          </label>
          <textarea
            id="support"
            name="support"
            rows={3}
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
            placeholder="例: 初期設定案内、メールサポート、軽微な修正相談"
          />
          {state.errors?.support ? <p className="text-sm text-rose-500">{state.errors.support}</p> : null}
        </div>

        <div className="grid gap-2">
          <label htmlFor="notes" className="text-sm font-semibold text-slate-900">
            補足メモ
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
            placeholder="公開時期、購入方法、特記事項などがあればご記入ください。"
          />
        </div>

        <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
          <input type="checkbox" name="consent" className="mt-1 h-4 w-4 rounded border-slate-300" />
          <span className="text-sm leading-7 text-slate-600">登録内容の確認と個人情報の取り扱いに同意します。</span>
        </label>
        {state.errors?.consent ? <p className="-mt-3 text-sm text-rose-500">{state.errors.consent}</p> : null}

        <button
          type="submit"
          disabled={pending}
          className="mt-2 inline-flex min-h-12 items-center justify-center rounded-2xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? '送信中...' : '登録内容を送信する'}
        </button>

        {state.message ? (
          <p
            className={`rounded-2xl px-4 py-3 text-sm leading-7 ${
              state.success ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-600'
            }`}
          >
            {state.message}
          </p>
        ) : null}
      </form>
    </div>
  );
}
