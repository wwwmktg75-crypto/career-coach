import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const notoSansJP = localFont({
  src: './fonts/NotoSansJP-Regular.woff',
  variable: '--font-jp',
  display: 'swap',
});

const siteName = 'First Agent';
const description =
  'デザインテンプレート販売、AIエージェント開発、SaaSカスタマイズ開発を提供するFirst Agentの公式サイトです。';
const siteUrl = 'https://firstagent.dev';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'First Agent｜AI・デザイン・SaaS開発',
  description,
  openGraph: {
    title: 'First Agent｜AI・デザイン・SaaS開発',
    description,
    type: 'website',
    url: siteUrl,
    siteName,
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'First Agent',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'First Agent｜AI・デザイン・SaaS開発',
    description,
    images: ['/og-image.svg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={notoSansJP.variable}>
      <body>{children}</body>
    </html>
  );
}
