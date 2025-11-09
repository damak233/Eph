import React, { useMemo, useState, useEffect } from "react";
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

// ---- Site / Config ----------------------------------------
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

export default function Home() {
  // TEMP: 14 nap múlva indul
  const MINT_DATE = useMemo(
    () => new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
    []
  );
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const countdown = formatDuration(MINT_DATE.getTime() - now);

  const [wlOpen, setWlOpen] = useState(true);
  const DONATION_POLICY =
    "Save the Children UK — monthly transfer (10% of primary sales)";

  return (
    <div className="min-h-screen bg-black text-white">
      {/* SEO */}
      <SEO
        title="Ephemeral Moments — official site"
        description={`${numberFmt(
          SUPPLY_TOTAL
        )} NFT: ${numberFmt(SUPPLY_EPHEMERAL)} Ephemeral + ${
          SUPPLY_ETERNAL
        } Eternal (Save the Children). ${FOUNDER_RESERVED} Eternal reserved as Founder NFT.`}
        url={URL}
        image={OG}
      />

      <Header />

      <main>
        <Hero countdown={countdown} />
        <Concept />
        <MintSection
          countdown={countdown}
          wlOpen={wlOpen}
          setWlOpen={setWlOpen}
        />
        <Roadmap />
        <Charity policy={DONATION_POLICY} />
        <Gallery />
        <FAQ magicEden={LINKS.MAGIC_EDEN} tensor={LINKS.TENSOR} />
        <PressKit />
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
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/60 bg-black/80 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white/90 to-white/30" />
          <span className="font-semibold tracking-wide text-white group-hover:opacity-90">
            Ephemeral Moments
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
          {[
            ["#concept", "Concept"],
            ["#mint", "Mint"],
            ["#roadmap", "Roadmap"],
            ["#charity", "Charity"],
            ["#gallery", "Gallery"],
            ["#faq", "FAQ"],
            ["#press", "Press"],
          ].map(([href, label]) => (
            <a key={href} href={href} className="hover:text-white">
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button className="hidden md:inline-block px-4 py-2 rounded-xl border border-white/20 hover:border-white/40 transition text-sm">
            Connect Wallet
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg border border-white/20"
            aria-label="Open menu"
          >
            ☰
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 px-4 pb-4">
          <div className="flex flex-col gap-3 text-white/90">
            {[
              ["#concept", "Concept"],
              ["#mint", "Mint"],
              ["#roadmap", "Roadmap"],
              ["#charity", "Charity"],
              ["#gallery", "Gallery"],
              ["#faq", "FAQ"],
              ["#press", "Press"],
            ].map(([href, label]) => (
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

// ---- Hero (Hero.webp a háttér) ------------------------------------------
type HeroProps = { countdown: string; twitter?: string };

function Hero({ countdown, twitter }: HeroProps) {
  const twitterUrl = twitter ?? 'https://x.com/EphemeralArtCo';

  return (
    <section
      id="home"
      className="
        relative overflow-hidden
        min-h-[calc(100vh-64px)]
        md:min-h-[calc(100vh-72px)]
      "
    >
      {/* Háttérkép – desktopon lejjebb fókusz (hogy a gyerekek látszódjanak) */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/images/Hero.webp"
          alt="Ephemeral Moments – hero"
          className="
            w-full h-full object-cover
            object-[center_60%]
            md:object-[center_83%]
            lg:object-[center_92%]
          "
          decoding="async"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
      </div>

      {/* Tartalom */}
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <p className="uppercase tracking-[0.25em] text-[11px] md:text-xs text-white/70">
          Solana • Art • Charity
        </p>

        <h1 className="mt-4 text-3xl md:text-5xl lg:text-6xl font-semibold leading-tight text-white">
          The art of <span className="underline decoration-white/30 underline-offset-8">fading</span>,<br />
          the beauty of what remains.
        </h1>

        <p className="mt-6 max-w-2xl text-white/80">
          Monochrome, sumi-e inspired NFTs that fade after 24 hours — leaving a single white quote as a
          memory. 10,100 pieces; <em>100 Eternal</em> remain visible forever (with a discreet Save the Children logo).
          1 Eternal reserved as the Founder NFT.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <a
            href="#mint"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition"
          >
            Mint – coming soon
          </a>
          <a
            href={twitterUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-white/20 hover:border-white/40 text-white"
          >
            Follow on X
          </a>
        </div>

        <div className="mt-6 text-sm text-white/70">
          Countdown to mint: <span className="font-mono text-white">{countdown}</span>
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
            24 hours. The <strong>{SUPPLY_ETERNAL}</strong> Eternal pieces
            remain visible forever and include a discreet Save the Children logo
            (bottom-left).
          </p>
          <ul className="mt-6 space-y-2 text-white/80">
            <li>
              • Total supply: {numberFmt(SUPPLY_TOTAL)} NFTs (
              {numberFmt(SUPPLY_EPHEMERAL)} Ephemeral, {SUPPLY_ETERNAL} Eternal)
            </li>
            <li>• Founder reserve: {FOUNDER_RESERVED} Eternal (Founder NFT)</li>
            <li>• Format: 1024×1024</li>
            <li>• Blockchain: Solana • Candy Machine v3</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

// ---- Mint ---------------------------------------------------
function MintSection({
  countdown,
  wlOpen,
  setWlOpen,
}: {
  countdown: string;
  wlOpen: boolean;
  setWlOpen: (b: boolean) => void;
}) {
  return (
    <section id="mint" className="relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-12 gap-10 items-start">
        <div className="md:col-span-7">
          <h2 className="text-2xl md:text-3xl font-semibold">Mint</h2>
          <p className="mt-4 text-white/80">
            Whitelist price: <strong>0.25 SOL</strong> • Public price:{" "}
            <strong>0.50 SOL</strong>
          </p>
          <p className="mt-2 text-white/70">
            Starts in: <span className="font-mono text-white">{countdown}</span>
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
            <p className="mt-2 text-white/80">
              Join the WL for early access and a discounted mint.
            </p>

            {wlOpen ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setWlOpen(false);
                }}
                className="mt-4 grid gap-3"
              >
                <input
                  required
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-3 rounded-xl bg-black border border-white/20 focus:outline-none focus:border-white/40"
                />
                <input
                  type="text"
                  placeholder="Phantom wallet (optional)"
                  className="px-4 py-3 rounded-xl bg-black border border-white/20 focus:outline-none focus:border-white/40"
                />
                <button className="px-5 py-3 rounded-xl bg-white text-black font-medium">
                  Apply for WL
                </button>
                <p className="text-xs text-white/60">
                  By submitting, you consent to being contacted about the WL
                  only.
                </p>
              </form>
            ) : (
              <div className="mt-4 text-sm text-white/80">
                Thank you! We’ll notify you about your WL status soon.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- Roadmap ------------------------------------------------
function Roadmap() {
  const phases = [
    {
      title: "Phase I – Creation",
      detail:
        "Artwork completion, metadata & IPFS, Save the Children UK brand approval",
    },
    {
      title: "Phase II – Launch",
      detail:
        "Mint on Solana (Candy Machine v3), listing on Magic Eden & Tensor",
    },
    {
      title: "Phase III – Donation",
      detail:
        "10% of primary sales donated monthly via bank transfer, with transparent reporting",
    },
    {
      title: "Phase IV – Secondary",
      detail: "Secondary markets + royalties (5–7%) for sustainable giving",
    },
    { title: "Phase V – Legacy", detail: "Impact updates, future thematic drops" },
  ];
  return (
    <section id="roadmap" className="relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold">Roadmap</h2>
        <ol className="mt-8 grid md:grid-cols-5 gap-5">
          {phases.map((p, i) => (
            <li key={i} className="rounded-2xl border border-white/10 p-5 bg-white/5">
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

// ---- Charity ------------------------------------------------
function Charity({ policy }: { policy: string }) {
  return (
    <section id="charity" className="relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-7">
          <h2 className="text-2xl md:text-3xl font-semibold">
            Charity – Save the Children UK
          </h2>
          <p className="mt-4 text-white/80">
            We are in official partnership with Save the Children UK.{" "}
            <strong>10%</strong> of all primary sales are donated monthly via
            bank transfer, with a transparent public summary.
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
                Eternal {SUPPLY_ETERNAL} — includes Save the Children logo
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- Gallery (9 kép) ---------------------------------------
function Gallery() {
  const galleryImages = [
    "/images/gallery/Ephemeral-01.webp",
    "/images/gallery/Ephemeral-02.webp",
    "/images/gallery/Ephemeral-03.webp",
    "/images/gallery/Ephemeral-04.webp",
    "/images/gallery/Ephemeral-05.webp",
    "/images/gallery/Ephemeral-06.png", // ez PNG maradt
    "/images/gallery/Ephemeral-07.webp",
    "/images/gallery/Ephemeral-08.webp",
    "/images/gallery/Ephemeral-09.webp",
  ];

  return (
    <section id="gallery" className="relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl md:text-3xl font-semibold">Gallery</h2>
          <div className="text-sm text-white/60">9 / {numberFmt(SUPPLY_TOTAL)}</div>
        </div>

        <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 gap-5">
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

// ---- FAQ ----------------------------------------------------
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
      )} Ephemeral + ${SUPPLY_ETERNAL} Eternal (Save the Children). ${FOUNDER_RESERVED} Eternal is reserved as the Founder NFT.`,
    },
    {
      q: "Where is the secondary market?",
      a: `Magic Eden and Tensor. Official links: ${magicEden} • ${tensor}`,
    },
    {
      q: "How are donations handled?",
      a: "10% of primary sales are donated monthly via bank transfer to Save the Children UK, with public on-chain tracking.",
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
              <div className="px-5 pb-5 text-white/80">{f.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Press Kit ---------------------------------------------
function PressKit() {
  return (
    <section id="press" className="relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-7">
          <h2 className="text-2xl md:text-3xl font-semibold">Press & Assets</h2>
          <p className="mt-4 text-white/80">
            Download our official press one-pager and brand assets for coverage.
            For media inquiries, please contact{" "}
            <span className="underline">ephemeralartco@gmail.com</span>.
          </p>
          <ul className="mt-6 space-y-2 text-white/80">
            <li>
              • Press PDF:{" "}
              <a className="underline hover:text-white" href="#" target="_blank" rel="noreferrer">
                Ephemeral Moments × Save the Children (PDF)
              </a>
            </li>
            <li>
              • Logo pack:{" "}
              <a className="underline hover:text-white" href="#" target="_blank" rel="noreferrer">
                ZIP (coming soon)
              </a>
            </li>
            <li>
              • Media images:{" "}
              <a className="underline hover:text-white" href="#" target="_blank" rel="noreferrer">
                Folder (coming soon)
              </a>
            </li>
          </ul>
        </div>
        <div className="md:col-span-5">
          <div className="rounded-2xl border border-white/10 p-5 bg-white/5 text-sm text-white/70">
            <div className="font-semibold text-white">Embargo note</div>
            <p className="mt-2">
              Media may request a preview under embargo prior to public
              announcement. Please credit “Ephemeral Moments Art” and “Save the
              Children UK (official partner)”.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- Footer -------------------------------------------------
function Footer({
  twitter,
  discord,
  magicEden,
  tensor,
}: {
  twitter: string;
  discord: string;
  magicEden: string;
  tensor: string;
}) {
  return (
    <footer className="border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-4 gap-8 text-sm">
        <div>
          <div className="font-semibold">Ephemeral Moments</div>
          <p className="mt-3 text-white/70">
            In official partnership with Save the Children UK.
          </p>
        </div>

        <div>
          <div className="font-semibold">Links</div>
          <ul className="mt-3 space-y-2 text-white/80">
            <li>
              <a href={twitter} target="_blank" className="hover:text-white" rel="noreferrer">
                X (Twitter)
              </a>
            </li>
            <li>
              <a href={discord} target="_blank" className="hover:text-white" rel="noreferrer">
                Discord
              </a>
            </li>
            <li>
              <a href={magicEden} target="_blank" className="hover:text-white" rel="noreferrer">
                Magic Eden
              </a>
            </li>
            <li>
              <a href={tensor} target="_blank" className="hover:text-white" rel="noreferrer">
                Tensor
              </a>
            </li>
          </ul>
        </div>

        <div>
          <div className="font-semibold">Contact</div>
          <ul className="mt-3 space-y-2 text-white/80">
            <li>ephemeralartco@gmail.com</li>
            <li>@EphemeralArtCo</li>
          </ul>
        </div>

        <div>
          <div className="font-semibold">Legal / Transparency</div>
          <ul className="mt-3 space-y-2 text-white/80">
            <li>10% of primary → Save the Children UK (monthly transfer)</li>
            <li>Royalties: 5%</li>
            <li>© {new Date().getFullYear()} Ephemeral Moments Art</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

// ---- Small preview: fade effect -----------------------------
function PreviewArtwork() {
  const [expired, setExpired] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setExpired(true), 5000);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="w-full h-full relative">
      {/* háttérbemutató – bármelyik galéria kép jó ide */}
      <Image
        src="/images/gallery/Ephemeral-01.webp"
        alt="Preview artwork"
        fill
        sizes="50vw"
        style={{ objectFit: "cover" }}
      />
      {/* fekete lefade-elt overlay */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-700 ${
          expired ? "opacity-100" : "opacity-0"
        }`}
      />
      {/* idézet, amikor „elfakult” */}
      <div
        className={`absolute inset-0 flex items-center justify-center p-6 text-center transition-opacity duration-700 ${
          expired ? "opacity-100" : "opacity-0"
        }`}
      >
        <blockquote className="text-white/90 text-sm md:text-base max-w-sm italic">
          “We remember not days, but moments.”
        </blockquote>
      </div>
    </div>
  );
}
