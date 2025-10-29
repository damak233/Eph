// components/SEO.tsx
import Head from "next/head";

type SEOProps = {
  title?: string;
  description?: string;
  url?: string;        // abszolút URL (https://...)
  image?: string;      // abszolút URL a megosztási képhez
};

export default function SEO({
  title = "Ephemeral Moments",
  description = "Digitális fotóművészet – limitált kiadások, kurált kollekciók.",
  url = "https://ephemeralmoments.org/",
  image = "https://ephemeralmoments.org/og.jpg",
}: SEOProps) {
  const siteName = "Ephemeral Moments";
  const twitterHandle = "@EphemeralArtCo";

  return (
    <Head>
      {/* Primary */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta name="theme-color" content="#000000" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Favicon (opcionális, tehetsz /public alá egyet) */}
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
