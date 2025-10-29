// components/SEO.tsx
import Head from "next/head";

type SEOProps = {
  title?: string;
  description?: string;
  url?: string;       // abszolút URL
  image?: string;     // abszolút URL (pl. https://.../og.jpg)
};

const SITE_NAME = "Ephemeral Moments";
const DEFAULT_URL = "https://ephemeralmoments.org";
const DEFAULT_DESC =
  "Ephemeral Moments – digitális fotóművészet, limitált kiadások.";
const DEFAULT_IMAGE = `${DEFAULT_URL}/og.jpg`;

export default function SEO({
  title = SITE_NAME,
  description = DEFAULT_DESC,
  url = DEFAULT_URL,
  image = DEFAULT_IMAGE,
}: SEOProps) {
  const fullTitle = title === SITE_NAME ? title : `${title} · ${SITE_NAME}`;

  return (
    <Head>
      {/* Alap meta */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index,follow" />

      {/* Canonical */}
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Favicon (ha van a /public alatt) */}
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
