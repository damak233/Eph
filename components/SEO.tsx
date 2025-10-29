// components/SEO.tsx
import Head from 'next/head'

type Props = {
  title?: string
  description?: string
  url?: string
  image?: string
}

export default function SEO({ title, description, url, image }: Props) {
  const t = title ?? 'Ephemeral Moments'
  const d = description ?? 'Digital art NFTs.'
  const u = url ?? 'https://ephemeralmoments.org/'
  const i = image ?? `${u}og.jpg`

  return (
    <Head>
      <title>{t}</title>
      <meta name="description" content={d} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={t} />
      <meta property="og:description" content={d} />
      <meta property="og:url" content={u} />
      <meta property="og:image" content={i} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={t} />
      <meta name="twitter:description" content={d} />
      <meta name="twitter:image" content={i} />
    </Head>
  )
}
