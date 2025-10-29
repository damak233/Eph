import Head from "next/head";

export default function SEO({
  title = "Ephemeral Moments – official site",
  description = "10,000 Ephemeral NFTs that fade after 24 hours, and 100 Eternal ones that remain forever – supporting Save the Children.",
  url = "https://ephemeralmoments.org",
  image = "https://ephemeralmoments.org/og.jpg",
}: {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
}) {
  return (
    <Head>
      {/* --- Basic Meta --- */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* --- Open Graph / Facebook --- */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />

      {/* --- Twitter / X --- */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@EphemeralArtCo" />
    </Head>
  );
}
