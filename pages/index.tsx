import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import SEO from "../components/SEO";

// ---- Utils -------------------------------------------------

function numberFmt(num: number) {
  return num.toLocaleString("en-US");
}

function formatDuration(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return `${h}h ${m}m ${s}s`;
}

// ---- Config ------------------------------------------------

const URL = "https://ephemeralmoments.org/";
const OG = `${URL}og.jpg`;

const SUPPLY_EPHEMERAL = 10_000;
const SUPPLY_ETERNAL = 100;
const FOUNDER_RESERVED = 1;
const SUPPLY_TOTAL = SUPPLY_EPHEMERAL + SUPPLY_ETERNAL;

const LINKS = {
  TWITTER: "https://x.com/EphemeralArtCo",
  DISCORD: "#",
  MAGIC_EDEN: "#",
  TENSOR: "#",
};

// ---- Page root ---------------------------------------------

export default function Home() {
  // fix launch date or "14 days from now"
  const MINT_DATE = useMemo(
    () => new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
    []
  );

  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const diff = MINT_DATE.getTime() - now;
  const countdown = diff > 0 ? formatDuration(diff) : "Live now";

  const DONATION_POLICY =
    "Monthly transfer – 10% of primary sales donated to a children’s charity.";

  return (
    <div className="min-h-screen bg-black text-white">
      <SEO
        title="Ephemeral Moments — official site"
        description={`${numberFmt(
          SUPPLY_TOTAL
        )} NFTs on Solana: ${numberFmt(
          SUPPLY_EPHEMERAL
        )} Ephemeral + ${SUPPLY_ETERNAL} Eternal (with a children’s charity partner).`}
        url={URL}
        image={OG}
      />

      <Header />

      <main>
        <Hero countdown={countdown} />
        <Concept />
        <MintSection countdown={countdown} />
        <Roadmap />
        <Charity policy={DONATION_POLICY} />
        <Gallery />
        <FAQ magicEden={LINKS.MAGIC_EDEN} tensor={LINKS.TENSOR} />
      </main>

      <Footer
        twitter={LINKS.TWITTER}
        discord={LINKS.DISCORD}
        magicEden={LINKS.MAGIC_EDEN}
        tensor={LINKS.TENSOR}
      />
    </div>
  );
}

// ---- Header ------------------------------------------------

function Header() {
  const [open, setOpen] = useState(false);

  const navItems: Array<[string, string]> = [
    ["#concept", "Concept"],
    ["#mint", "Mint"],
    ["#roadmap", "Roadmap"],
    ["#charity", "Charity"],
    ["#gallery", "Gallery"],
    ["#faq", "FAQ"],
  ];

  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur supports-[backdrop-filter]:bg-black/60 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white/90 to-white/30" />
          <span className="font-semibold tracking-wide text-white group-hover:opacity-90">
            Ephemeral Moments
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
          {navItems.map(([href, label]) => (
            <a key={href} href={href} className="hover:text-white">
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button className="hidden md:inline-flex px-4 py-2 rounded-xl border border-white/20 hover:border-white/40 text-sm">
            Connect Wallet
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg border border-white/20"
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 px-4 pb-4">
          <div className="flex flex-col gap-2 text-white/90">
            {navItems.map(([href, label]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="py-2"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

// ---- Hero --------------------------------------------------

function Hero({ countdown }: { countdown: string }) {
  const ORIGIN = "https://ephemeralmoments.org";
  const BUST = "?v=2";
  const REL = "/images/Hero.webp" + BUST;
  const ABS = ORIGIN + "/images/Hero.webp" + BUST;

  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-72px)] overflow-hidden"
      style={{
        backgroundImage: `url(${REL}), url(${ABS})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-black/70" />

      <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24 flex flex-col justify-end md:justify-center min-h-[calc(100vh-64px)]">
        <p className="uppercase tracking-[0.25em] text-[11px] md:text-xs text-white/70">
          Solana • Art • Charity
        </p>
        <h1 className="mt-4 text-3xl md:text-5xl lg:text-6xl font-semibold leading-tight max-w-3xl">
          The art of <span className="underline decoration-white/30">fading</span>
          ,<br />
          the beauty of what remains.
        </h1>
        <p className="mt-6 max-w-2xl text-white/80 text-sm md:text-base">
          Monochrome, sumi-e inspired NFTs that fade after 24 hours — leaving a
          single white quote as a memory. {numberFmt(SUPPLY_TOTAL)} pieces;{" "}
          {SUPPLY_ETERNAL} Eternal remain visible forever, with a discreet
          charity logo. {FOUNDER_RESERVED} Eternal is reserved as the Founder
          NFT.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <a
            href="#mint"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition"
          >
            Mint — coming soon
          </a>
          <a
            href={LINKS.TWITTER}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-white/20 hover:border-white/40"
          >
            Follow on X
          </a>
        </div>

        <div className="mt-6 text-sm text-white/70">
          Countdown to mint:{" "}
          <span className="font-mono text-white">{countdown}</span>
        </div>
      </div>
    </section>
  );
}

// ---- Concept ------------------------------------------------

function Concept() {
  return (
    <section id="concept" className="relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-6">
          <div className="aspect-square rounded-2xl bg-gradient-to-br from-white/10 to-white/5 overflow-hidden">
            <PreviewArtwork />
          </div>
        </div>

        <div className="md:col-span-6">
          <h2 className="text-2xl md:text-3xl font-semibold">Concept</h2>
          <p className="mt-4 text-white/80">
            Ephemeral NFTs fade to a black canvas with a short white quote after
            24 hours. The <strong>{SUPPLY_ETERNAL}</strong> Eternal pieces stay
            visible forever and include a discreet children’s charity logo in
            the corner.
          </p>
          <ul className="mt-6 space-y-2 text-white/80 text-sm md:text-base">
            <li>
              • Total supply: {numberFmt(SUPPLY_TOTAL)} NFTs (
              {numberFmt(SUPPLY_EPHEMERAL)} Ephemeral, {SUPPLY_ETERNAL} Eternal)
            </li>
            <li>• Founder reserve: {FOUNDER_RESERVED} Eternal (Founder NFT)</li>
            <li>• Format: 1024×1024 PNG / WEBP</li>
            <li>• Blockchain: Solana • Candy Machine v3</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function PreviewArtwork() {
  // egyszerű, stabil kép – ne animáljunk, hogy biztosan megjelenjen
  return (
    <div className="relative w-full h-full">
      <Image
        src="/images/gallery/Ephemeral-01.webp"
        alt="Ephemeral Moments preview"
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        style={{ objectFit: "cover" }}
        priority
      />
    </div>
  );
}

// ---- Mint ---------------------------------------------------

function MintSection({ countdown }: { countdown: string }) {
  return (
    <section id="mint" className="relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <h2 className="text-2xl md:text-3xl font-semibold">Mint</h2>
            <p className="mt-4 text-white/80">
              Whitelist price: <strong>0.25 SOL</strong> • Public price:{" "}
              <strong>0.50 SOL</strong>
            </p>
            <p className="mt-2 text-white/70">
              Starts in:{" "}
              <span className="font-mono text-white">{countdown}</span>
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                disabled
                className="px-5 py-3 rounded-xl bg-white/10 text-white/80 border border-white/20 cursor-not-allowed"
              >
                Connect Wallet (soon)
              </button>
              <button
                disabled
                className="px-5 py-3 rounded-xl bg-white text-black font-medium opacity-70 cursor-not-allowed"
              >
                Mint (soon)
              </button>
              <a
                href="#faq"
                className="px-5 py-3 rounded-xl border border-white/20 hover:border-white/40"
              >
                How it works
              </a>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="rounded-2xl border border-white/10 p-5 bg-white/5">
              <h3 className="font-semibold">Whitelist</h3>
              <p className="mt-2 text-white/80 text-sm md:text-base">
                We are not collecting emails on the site. WL spots are handled
                privately with partners, influencers and collectors. Public mint
                will open after the WL window closes.
              </p>
              <p className="mt-4 text-xs text-white/60">
                Follow us on X for WL updates and exact mint date.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- Roadmap -----------------------------------------------

function Roadmap() {
  const phases = [
    {
      title: "Phase I – Creation",
      detail:
        "Artwork, metadata, IPFS upload, children’s charity partner brand approval.",
    },
    {
      title: "Phase II – Launch",
      detail:
        "Mint on Solana (Candy Machine v3), listing on Magic Eden & Tensor.",
    },
    {
      title: "Phase III – Donation",
      detail:
        "10% of primary sales donated monthly to a children’s charity partner.",
    },
    {
      title: "Phase IV – Secondary",
      detail: "Royalties (5–7%) to support long-term charitable giving.",
    },
    {
      title: "Phase V – Legacy",
      detail: "Impact reports and future thematic drops.",
    },
  ];
  return (
    <section id="roadmap" className="relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold">Roadmap</h2>
        <ol className="mt-8 grid md:grid-cols-5 gap-5">
          {phases.map((p, i) => (
            <li
              key={i}
              className="rounded-2xl border border-white/10 p-5 bg-white/5"
            >
              <div className="text-sm text-white/60">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="mt-2 font-semibold">{p.title}</div>
              <div className="mt-2 text-white/80 text-sm">{p.detail}</div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// ---- Charity -----------------------------------------------

function Charity({ policy }: { policy: string }) {
  return (
    <section id="charity" className="relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-7">
          <h2 className="text-2xl md:text-3xl font-semibold">
            Charity — supporting children in need
          </h2>
          <p className="mt-4 text-white/80">
            We are committed to donating{" "}
            <strong>10% of all primary sales</strong> to a children’s charity,
            via monthly bank transfers, with a transparent public summary. Funds
            are first received in crypto, then converted to fiat and sent via
            bank transfer according to the charity’s requirements.
          </p>
          <div className="mt-6 rounded-xl bg-white/5 border border-white/10 p-4">
            <div className="text-white/70 text-sm">
              Transparent donation wallet / policy:
            </div>
            <code className="block mt-2 font-mono text-xs break-all text-white/90">
              {policy}
            </code>
          </div>
        </div>
        <div className="md:col-span-5">
          <div className="aspect-square rounded-2xl bg-gradient-to-br from-white/10 to-white/5 grid place-items-center">
            <div className="text-center text-white/80">
              <div className="text-6xl">❤</div>
              <div className="mt-3 text-sm">
                Eternal {SUPPLY_ETERNAL} — includes a discreet children’s
                charity logo
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- Gallery -----------------------------------------------

function Gallery() {
  const galleryImages = [
    "/images/gallery/Ephemeral-01.webp",
    "/images/gallery/Ephemeral-02.webp",
    "/images/gallery/Ephemeral-03.webp",
    "/images/gallery/Ephemeral-04.webp",
    "/images/gallery/Ephemeral-05.webp",
    "/images/gallery/Ephemeral-06.png", // one PNG
    "/images/gallery/Ephemeral-07.webp",
    "/images/gallery/Ephemeral-08.webp",
    "/images/gallery/Ephemeral-09.webp",
  ];

  return (
    <section id="gallery" className="relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl md:text-3xl font-semibold">Gallery</h2>
          <div className="text-sm text-white/60">
            9 / {numberFmt(SUPPLY_TOTAL)}
          </div>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {galleryImages.map((src, i) => (
            <figure
              key={src}
              className="group rounded-2xl overflow-hidden border border-white/10 bg-white/5"
            >
              <div className="relative w-full aspect-square">
                <Image
                  src={src}
                  alt={`Ephemeral Moment ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                  priority={i < 3}
                />
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- FAQ ---------------------------------------------------

function FAQ({ magicEden, tensor }: { magicEden: string; tensor: string }) {
  const faqs = [
    {
      q: "What happens after 24 hours?",
      a: "Ephemeral NFTs fade to a black canvas with a short white quote. Eternal pieces do not fade.",
    },
    {
      q: "How many pieces are there?",
      a: `${numberFmt(SUPPLY_TOTAL)} total — ${numberFmt(
        SUPPLY_EPHEMERAL
      )} Ephemeral + ${SUPPLY_ETERNAL} Eternal (with a children’s charity logo). ${
        FOUNDER_RESERVED
      } Eternal is reserved as the Founder NFT.`,
    },
    {
      q: "Where is the secondary market?",
      a: `Magic Eden and Tensor. Official links: ${magicEden} • ${tensor}`,
    },
    {
      q: "How are donations handled?",
      a: "10% of primary sales are donated monthly via bank transfer to a children’s charity, with public on-chain tracking.",
    },
    {
      q: "Which wallets are supported?",
      a: "Phantom + Ledger. The mint button will be activated before launch.",
    },
  ];

  return (
    <section id="faq" className="relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold">FAQ</h2>
        <div className="mt-6 divide-y divide-white/10 border border-white/10 rounded-2xl overflow-hidden">
          {faqs.map((f, i) => (
            <details key={i} className="group open:bg-white/5">
              <summary className="list-none p-5 hover:bg-white/5 cursor-pointer flex items-start justify-between gap-6">
                <span className="font-medium">{f.q}</span>
                <span className="text-white/40 group-open:rotate-45 transition">
                  ＋
                </span>
              </summary>
              <div className="px-5 pb-5 text-white/80 text-sm md:text-base">
                {f.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Footer ------------------------------------------------

function Footer(props: {
  twitter: string;
  discord: string;
  magicEden: string;
  tensor: string;
}) {
  return (
    <footer className="border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between text-sm text-white/70">
        <div>
          <div className="font-semibold text-white">Ephemeral Moments</div>
          <div className="mt-1">
            {new Date().getFullYear()} • Solana • Art • Charity
          </div>
          <div className="mt-1">
            Supporting children in need through a dedicated children’s charity.
          </div>
          <div className="mt-1">
            10% of primary sales donated monthly to a children’s charity.
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <a
            href={props.twitter}
            target="_blank"
            rel="noreferrer"
            className="hover:text-white"
          >
            X (Twitter)
          </a>
          <a
            href={props.discord}
            target="_blank"
            rel="noreferrer"
            className="hover:text-white"
          >
            Discord
          </a>
          <a
            href={props.magicEden}
            target="_blank"
            rel="noreferrer"
            className="hover:text-white"
          >
            Magic Eden
          </a>
          <a
            href={props.tensor}
            target="_blank"
            rel="noreferrer"
            className="hover:text-white"
          >
            Tensor
          </a>
        </div>
      </div>
    </footer>
  );
}
