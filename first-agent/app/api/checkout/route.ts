import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';

const products = {
  'web-template': {
    name: 'WEBサイトテンプレート',
    description: 'WEBサイトテンプレートのテスト購入',
    amount: 15000,
    href: '/products/web-template',
  },
  'ai-agent': {
    name: 'AIエージェント',
    description: 'AIエージェントのテスト購入',
    amount: 30000,
    href: '/products/ai-agent',
  },
  'dify-chatbot': {
    name: 'Difyチャットボット',
    description: 'Difyチャットボットのテスト購入',
    amount: 50000,
    href: '/products/dify-chatbot',
  },
  'accounting-saas': {
    name: '経理Saas',
    description: '経理Saasのテスト購入',
    amount: 150000,
    href: '/products/accounting-saas',
  },
} as const;

function getBaseUrl(headerList: Headers) {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) {
    return explicit.replace(/\/$/, '');
  }

  const host =
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL ||
    headerList.get('x-forwarded-host') ||
    headerList.get('host');
  const proto = headerList.get('x-forwarded-proto') || 'https';

  if (!host) {
    throw new Error('Base URL could not be resolved.');
  }

  return `${proto}://${host.replace(/\/$/, '')}`;
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const productKey = String(formData.get('productKey') || '') as keyof typeof products;
  const product = products[productKey];
  const headerList = await headers();
  const baseUrl = getBaseUrl(headerList);

  if (!product) {
    return NextResponse.redirect(`${baseUrl}/#products`, 303);
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.redirect(`${baseUrl}${product.href}?checkout=missing-key`, 303);
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}${product.href}?checkout=cancelled`,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'jpy',
            unit_amount: product.amount,
            product_data: {
              name: product.name,
              description: product.description,
            },
          },
        },
      ],
      metadata: {
        productKey,
      },
    });

    if (!session.url) {
      throw new Error('Stripe Checkout URL was not returned.');
    }

    return NextResponse.redirect(session.url, 303);
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(`${baseUrl}${product.href}?checkout=error`, 303);
  }
}
