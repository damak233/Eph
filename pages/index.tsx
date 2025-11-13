import React, { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import SEO from "../components/SEO";

// Utils
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

// Config
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

  return (
    <div className="bg-black text-white min-h-screen">
      <SEO
        title="Ephemeral Moments — official site"
        description={`${numberFmt(
          SUPPLY_TOTAL
        )} NFTs — Ephemeral + Eternal. Save the Children supported.`}
        url={URL}
        image={OG}
      />

      <Header />

      <main>
        <Hero countdown={countdown} />
        <Concept />
        <MintSection countdown={countdown} />
        <Roadmap />
        <Charity policy="Save the Children UK — monthly 10% donation" />
        <Gallery />
        <FAQ
          magicEden={LINKS.MAGIC_EDEN}
          tensor={LINKS.TENSOR}
        />
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

// HEADER
function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <a href="#home" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white to-white/40" />
          <span className="font-semibold">Ephemeral Moments</span>
        </a>

        <nav className="hidden md:flex gap-6 text-sm text-white/80">
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

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 border border-white/20 rounded"
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 px-4 pb-4">
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
              className="block py-2"
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

// HERO
function Hero({ countdown }: { countdown: string }) {
  const ORIGIN = "https://ephemeralmoments.org";
  const BUST = "?v=2";
  const REL = "/images/Hero.webp" + BUST;
  const ABS = ORIGIN + "/images/Hero.webp" + BUST;

  return (
    <section
      id="home"
      className="relative min-h-[90vh]"
      style={{
        backgroundImage: `url(${REL}), url(${ABS})`,
        backgroundSize: "cover",
        backgroundPosition: "center 85%",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />

      <div className="relative max-w-7xl mx-auto px-4 py-20">
        <p className="tracking-widest text-xs text-white/70">
          Solana • Art • Charity
        </p>
        <h1 className="mt-4 text-4xl md:text-6xl font-semibold">
          The art of fading,<br /> the beauty of what remains.
        </h1>

        <p className="mt-6 max-w-2xl text-white/80">
          Sumi-e inspired monochrome NFTs that fade after 24 hours —
          leaving behind a minimal white quote.  
          100 Eternal NFTs remain visible forever with a Save the Children logo.
        </p>

        <div className="mt-8 flex gap-3">
          <a
            href="#mint"
            className="px-6 py-3 bg-white text-black rounded-xl font-medium"
          >
            Mint – coming soon
          </a>
          <a
            href="https://x.com/EphemeralArtCo"
            className="px-6 py-3 border border-white/30 rounded-xl"
            target="_blank"
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

// CONCEPT
function Concept() {
  return (
    <section id="concept" className="border-t border-white/10 py-16 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-6">
          <div className="aspect-square bg-white/10 rounded-2xl overflow-hidden">
            <PreviewArtwork />
          </div>
        </div>

        <div className="md:col-span-6">
          <h2 className="text-3xl font-semibold">Concept</h2>
          <p className="mt-4 text-white/80">
            Ephemeral NFTs fade after 24 hours. Eternal NFTs remain permanently visible.
          </p>
          <ul className="mt-6 space-y-2 text-white/80">
            <li>• Total supply: {numberFmt(SUPPLY_TOTAL)}</li>
            <li>• Eternal supply: {numberFmt(SUPPLY_ETERNAL)}</li>
            <li>• Founder reserve: {FOUNDER_RESERVED}</li>
            <li>• Format: 1024×1024</li>
            <li>• Blockchain: Solana</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

// MINT (WL removed)
function MintSection({ countdown }: { countdown: string }) {
  return (
    <section id="mint" className="border-t border-white/10 py-16 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-10 items-center">

        <div className="md:col-span-7">
          <h2 className="text-3xl font-semibold">Mint</h2>
          <p className="mt-4 text-white/80">
            Whitelist price: <strong>0.25 SOL</strong> • Public: <strong>0.50 SOL</strong>
          </p>
          <p className="mt-2 text-white/70">
            Starts in: <span className="font-mono text-white">{countdown}</span>
          </p>

          <div className="mt-6 flex gap-3">
            <button
              disabled
              className="px-5 py-3 bg-white/10 border border-white/20 rounded-xl cursor-not-allowed"
            >
              Connect Wallet (soon)
            </button>
            <button
              disabled
              className="px-5 py-3 bg-white text-black rounded-xl opacity-60 cursor-not-allowed"
            >
              Mint (soon)
            </button>
          </div>
        </div>

        <div className="md:col-span-5">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <h3 className="font-semibold">Whitelist</h3>
            <p className="mt-2 text-white/80">
              WL is handled privately with partners & ambassadors.
            </p>
            <p className="text-white/60 text-sm mt-2">
              If you received a WL invite, you will be contacted directly.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

// ROADMAP
function Roadmap() {
  const phases = [
    { title: "Phase I – Creation", detail: "Artwork, metadata, Save the Children approval" },
    { title: "Phase II – Launch", detail: "Mint, Magic Eden, Tensor" },
    { title: "Phase III – Donation", detail: "10% monthly donation" },
    { title: "Phase IV – Secondary", detail: "Royalties for long-term charity" },
    { title: "Phase V – Legacy", detail: "Impact reports" },
  ];

  return (
    <section id="roadmap" className="border-t border-white/10 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold">Roadmap</h2>
        <ol className="grid md:grid-cols-5 gap-5 mt-8">
          {phases.map((p, i) => (
            <li key={i} className="bg-white/5 border border-white/10 p-5 rounded-2xl">
              <div className="text-sm text-white/60">{String(i + 1).padStart(2, "0")}</div>
              <div className="mt-2 font-semibold">{p.title}</div>
              <div className="mt-2 text-white/80 text-sm">{p.detail}</div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// CHARITY
function Charity({ policy }: { policy: string }) {
  return (
    <section id="charity" className="border-t border-white/10 py-16 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-10">
        <div className="md:col-span-7">
          <h2 className="text-3xl font-semibold">Charity – Save the Children UK</h2>
          <p className="mt-4 text-white/80">
            10% of all primary sales donated monthly.
          </p>
          <div className="bg-white/5 border border-white/10 p-4 rounded-xl mt-6">
            <div className="text-white/70 text-sm">Donation policy:</div>
            <code className="block mt-2 text-white/90 text-xs">{policy}</code>
          </div>
        </div>

        <div className="md:col-span-5">
          <div className="aspect-square bg-white/5 rounded-2xl grid place-items-center">
            <div className="text-center text-white/80">
              <div className="text-6xl">❤</div>
              <div className="mt-3 text-sm">
                Eternal {SUPPLY_ETERNAL} — includes logo
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// GALLERY
function Gallery() {
  const images = Array.from({ length: 9 }).map(
    (_, i) => `/images/gallery/Ephemeral-0${i + 1}.webp`
  );

  return (
    <section id="gallery" className="border-t border-white/10 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end">
          <h2 className="text-3xl font-semibold">Gallery</h2>
          <div className="text-sm text-white/60">9 / {numberFmt(SUPPLY_TOTAL)}</div>
        </div>

        <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {images.map((src, i) => (
            <div key={src} className="aspect-square bg-white/5 rounded-2xl overflow-hidden">
              <Image
                src={src}
                alt={`Ephemeral Moment ${i + 1}`}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// FAQ
function FAQ({
  magicEden,
  tensor,
}: {
  magicEden: string;
  tensor: string;
}) {
  const items = [
    {
      q: "What happens after 24 hours?",
      a: "Ephemeral NFTs fade to a black canvas with a white quote.",
    },
    {
      q: "How many pieces?",
      a: `${numberFmt(SUPPLY_TOTAL)} total — ${numberFmt(
        SUPPLY_EPHEMERAL
      )} Ephemeral + ${SUPPLY_ETERNAL} Eternal.`,
    },
    {
      q: "Secondary markets?",
      a: `Magic Eden: ${magicEden} • Tensor: ${tensor}`,
    },
    {
      q: "Donations?",
      a: "10% monthly donation to Save the Children UK.",
    },
  ];

  return (
    <section id="faq" className="border-t border-white/10 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold">FAQ</h2>

        <div className="mt-6 border border-white/10 rounded-2xl divide-y divide-white/10">
          {items.map((f, i) => (
            <details key={i} className="group">
              <summary className="p-5 cursor-pointer flex justify-between">
                <span>{f.q}</span>
                <span className="text-white/50 group-open:rotate-45 transition">+</span>
              </summary>
              <div className="p-5 text-white/80 text-sm">{f.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

// PRESS KIT
function PressKit() {
  return (
    <section id="press" className="border-t border-white/10 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold">Press Kit</h2>
        <p className="mt-4 text-white/80">
          Logos, banners, and brand assets will be available before mint.
        </p>
      </div>
    </section>
  );
}

// FOOTER
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
    <footer className="border-t border-white/10 py-10 px-4">
      <div className="max-w-7xl mx-auto text-center text-white/70 text-sm space-y-3">
        <div className="flex justify-center gap-5 text-white/60">
          <a href={twitter} target="_blank">Twitter</a>
          <a href={discord} target="_blank">Discord</a>
          <a href={magicEden} target="_blank">Magic Eden</a>
          <a href={tensor} target="_blank">Tensor</a>
        </div>
        <div>© {new Date().getFullYear()} Ephemeral Moments</div>
      </div>
    </footer>
  );
}

// Placeholder preview
function PreviewArtwork() {
  return (
    <div className="w-full h-full flex items-center justify-center text-white/40">
      Preview
    </div>
  );
}
