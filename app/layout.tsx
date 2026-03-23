import type { Metadata, Viewport } from "next";
import { Geist, Sora, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geist    = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const sora     = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });
const dmSerif  = DM_Serif_Display({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-dm-serif", display: "swap" });

export const metadata: Metadata = {
  title: "IA Fala Brasil",
  description: "Aprenda Inteligência Artificial do jeito brasileiro — prático, acessível e sem enrolação.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "IA Fala Brasil",
  },
  openGraph: {
    title: "IA Fala Brasil",
    description: "Alfabetização em IA para todos os brasileiros",
    locale: "pt_BR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#009C3B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${geist.variable} ${sora.variable} ${dmSerif.variable} h-full`}>
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
        {/* Tawk.to */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/69c19ef3cde9401c36446528/1jke59pnb';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-gray-200 bg-white py-6 text-center text-gray-500 text-sm">
          © 2026 IA Fala Brasil · Educação · Tecnologia · Futuro 🇧🇷
        </footer>
      </body>
    </html>
  );
}
