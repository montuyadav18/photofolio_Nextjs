import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sajjat Mujawar | Senior Creative Designer",
  description: "Portfolio of Sajjat Mujawar, showcasing UI/UX, branding, and creative projects.",
  keywords: "Sajjat Mujawar, Creative Designer, Portfolio, UI UX, Branding, Web Design, Graphic Design",
  authors: [{ name: "Sajjat Mujawar", url: "https://www.yourwebsite.com" }],
  creator: "Sajjat Mujawar",
  publisher: "Sajjat Mujawar",
  openGraph: {
    title: "Sajjat Mujawar | Senior Creative Designer",
    description: "Portfolio of Sajjat Mujawar, showcasing UI/UX, branding, and creative projects.",
    url: "https://www.yourwebsite.com",
    siteName: "Sajjat Mujawar Portfolio",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sajjat Mujawar Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sajjat Mujawar | Senior Creative Designer",
    description: "Portfolio of Sajjat Mujawar, showcasing UI/UX, branding, and creative projects.",
    creator: "@sajjat_design",
    images: ["/images/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="shortcut icon" href="/images/favicon.png" type="image/x-icon" />

        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Inter:wght@400;500;700&family=Poppins:wght@400;500;700&family=Syne:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />

        {/* Vendor CSS */}
        <link rel="stylesheet" href="/css/vendor/bootstrap.min.css" />
        <link rel="stylesheet" href="/css/plugins/aos.css" />
        <link rel="stylesheet" href="/css/plugins/swiper-bundle.min.css" />
        <link rel="stylesheet" href="/css/pages/home.css" />

        {/* Meta Tags for SEO */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Sajjat Mujawar" />
        <meta name="theme-color" content="#000000" />
        <link rel="canonical" href="https://www.yourwebsite.com" />
        <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}

        {/* Vendor JS */}
        <Script src="/js/vendor/modernizr-3.11.7.min.js" />
        <Script src="/js/vendor/jquery-3.6.0.min.js" />
        <Script src="/js/vendor/jquery-migrate-3.3.2.min.js" />
        <Script src="/js/vendor/bootstrap.bundle.min.js" />

        {/* Plugin JS */}
        <Script src="/js/plugins/aos.js" />
        <Script src="/js/plugins/swiper-bundle.min.js" />
        <Script src="/js/plugins/jquery.waypoints.js" />
        <Script src="/js/plugins/jquery.counterup.min.js" />

        {/* Activation JS */}
        <Script src="/js/main.js" />

        {/* Fix scroll/backdrop issues */}
        <Script id="fix-scroll-backdrop" strategy="afterInteractive">
          {`(function(){
            try{
              document.querySelectorAll('.modal-backdrop, .offcanvas-backdrop, .mfp-bg').forEach(function(el){
                el.parentNode && el.parentNode.removeChild(el);
              });
              document.body.classList.remove('modal-open');
              if(document.body.style.overflow) document.body.style.overflow = '';
              if(document.documentElement.style.overflow) document.documentElement.style.overflow = '';
            }catch(e){ console.warn('fix-scroll-backdrop error', e); }
          })();`}
        </Script>
      </body>
    </html>
  );
}
