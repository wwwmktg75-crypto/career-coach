type StripeCheckoutButtonProps = {
  productKey: string;
};

export function StripeCheckoutButton({ productKey }: StripeCheckoutButtonProps) {
  return (
    <form action="/api/checkout" method="post">
      <input type="hidden" name="productKey" value={productKey} />
      <button
        type="submit"
        className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-blue-700"
      >
        Stripeで購入テスト
      </button>
    </form>
  );
}
