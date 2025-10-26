// components/Meta.tsx
import Head from "next/head";

interface MetaProps {
    title?: string;
    description?: string;
    keywords?: string;
    url?: string;
    image?: string;
}

const defaultMeta = {
    title: "Sajjat Mujawar | Senior Creative Designer",
    description: "Portfolio of Sajjat Mujawar, showcasing UI/UX, branding, and creative projects.",
    keywords: "Sajjat Mujawar, Creative Designer, Portfolio, UI UX, Branding, Web Design, Graphic Design",
    url: "https://www.yourwebsite.com",
    image: "/images/og-image.png",
};

export default function Meta(props: MetaProps) {
    const meta = { ...defaultMeta, ...props };

    return (
        <Head>
            <title>{meta.title}</title>
            <meta name="description" content={meta.description} />
            <meta name="keywords" content={meta.keywords} />
            <meta name="author" content="Sajjat Mujawar" />
            <meta name="robots" content="index, follow" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="canonical" href={meta.url} />
            <link rel="shortcut icon" href="/images/favicon.png" type="image/x-icon" />
            <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />
            <meta name="theme-color" content="#000000" />

            {/* Open Graph */}
            <meta property="og:title" content={meta.title} />
            <meta property="og:description" content={meta.description} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={meta.url} />
            <meta property="og:image" content={meta.image} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:creator" content="@sajjat_design" />
            <meta name="twitter:title" content={meta.title} />
            <meta name="twitter:description" content={meta.description} />
            <meta name="twitter:image" content={meta.image} />
        </Head>
    );
}
