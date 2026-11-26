import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { SITE } from '@/lib/constants';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingContacts from '@/components/layout/FloatingContacts';
import CookieConsent from '@/components/layout/CookieConsent';
import BackgroundVideo from '@/components/layout/BackgroundVideo';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Ремонт квартир под ключ в Минске и Гомеле за 45 дней — гарантия 3 года | Ремонт Квартир',
    template: '%s | Ремонт Квартир',
  },
  description:
    'Ремонт квартир под ключ в Минске и Гомеле: фиксированная смета, срок от 45 дней, гарантия 3 года. Рассчитайте стоимость онлайн за 2 минуты.',
  applicationName: SITE.name,
  icons: { icon: '/favicon.svg' },
  manifest: undefined,
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0F7B4E',
};

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const YM_ID = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className="scroll-smooth">
      <head>
        {/* Шрифты: Inter/Manrope для текста, Montserrat Bold для заголовков */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&family=Montserrat:wght@700;800;900&display=swap"
          rel="stylesheet"
        />

        {GA_ID && GA_ID.startsWith('G-') && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { anonymize_ip: true });
              `}
            </Script>
          </>
        )}

        {YM_ID && YM_ID !== '00000000' && (
          <Script id="ym" strategy="afterInteractive">
            {`
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
              ym(${YM_ID}, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true });
            `}
          </Script>
        )}
      </head>
      <body>
        <BackgroundVideo />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <FloatingContacts />
        <CookieConsent />
      </body>
    </html>
  );
}