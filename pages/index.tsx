import React, { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import SEO from "../components/SEO";

// ------------------------------------------------------------
// Utils
// ------------------------------------------------------------
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

// ------------------------------------------------------------
// Config
// ------------------------------------------------------------
const URL = "https://ephemeralmoments.org/";
const OG = `${URL}og.jpg`;

const SUPPLY_EPHEMERAL = 10000;
const SUPPLY_ETERNAL = 100;
const FOUNDER_RESERVED = 1;
const SUPPLY_TOTAL = SUPPLY_EPHEMERAL + SUPPLY_ETERNAL;

const LINKS = {
  TWITTER: "https://x.com/EphemeralArtCo",
  DISCORD: "#",
  MAGIC_EDEN: "#",
  TENSOR: "#",
};

// ------------------------------------------------------------
// Home
// ------------------------------------------------------------
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

  const DONATION_POLICY =
    "Save the Children UK — monthly transfer (10% of primary sales)";

  return (
    <div className="min-h-screen bg-black text-white">
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
        <MintSection countdown={countdown} />
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

// ------------------------------------------------------------
// Header
// ------------------------------------------------------------
function Header() {
  const [open, setOpen] = useState(false);

  const menu = [
    ["#concept", "Concept"],
    ["#mint", "Mint"],
    ["#roadmap", "Roadmap"],
    ["#charity", "Charity"],
    ["#gallery", "Gallery"],
    ["#faq", "FAQ"],
    ["#press", "Press"],
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-black/80 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white/90 to-white/30" />
          <span className="font-semibold text-white">Ephemeral Moments</span>
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
          {menu.map(([href, label]) => (
            <a key={href} href={href} className="hover:text-white">
              {label}
            </a>
          ))}
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden p-2 rounded-lg border border-white/20"
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 px-4 pb-4">
          <div className="flex flex-col text-white/90 gap-3">
            {menu.map(([href, label]) => (
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

// ------------------------------------------------------------
// Hero (WITH YOUR HERO.WEBP IMAGE)
// ------------------------------------------------------------
// HERO SECTION
const HeroSection = ({ countdown }: { countdown: string }) => {
  return (
    <section
      id="hero"
      className="relative h-screen w-full bg-black text-white flex items-center"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/Hero.webp"
          alt="Hero"
          className="w-full h-full object-cover opacity-70"
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8">
        <p className="text-sm tracking-widest mb-4 opacity-80">
          SOLANA • ART • CHARITY
        </p>

        <h1 className="text-3xl md:text-6xl font-bold leading-tight">
          The art of fading,<br />
          the beauty of what remains.
        </h1>

        <p className="mt-6 max-w-xl text-base md:text-lg opacity-90">
          Monochrome, sumi-e inspired NFTs that fade after 24 hours — leaving a single
          white quote as a memory. 10,100 pieces; 100 eternal remain visible forever.
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-4 mt-8">
          <button className="px-6 py-3 rounded bg-white text-black font-medium cursor-not-allowed opacity-60">
            Mint — coming soon
          </button>

          <a
            href="https://x.com/YOUR_USERNAME"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded border border-white/50 text-white hover:bg-white/10 transition"
          >
            Follow on X
          </a>
        </div>

        {/* Countdown */}
        <p className="mt-6 text-sm opacity-80">
          Countdown to mint: <span className="font-semibold">{countdown}</span>
        </p>
      </div>
    </section>
  );
};

// ------------------------------------------------------------
// Concept
// ------------------------------------------------------------
function Concept() {
  return (
    <section id="concept" className="relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-6">
          <div className="aspect-square rounded-2xl bg-white/10 overflow-hidden">
            <PreviewArtwork />
          </div>
        </div>

        <div className="md:col-span-6">
          <h2 className="text-3xl font-semibold">Concept</h2>
          <p className="mt-4 text-white/80">
            Ephemeral NFTs fade to black with a white quote after 24 hours. The{" "}
            {SUPPLY_ETERNAL} Eternal pieces remain visible forever and include a
            discreet Save the Children logo.
          </p>

          <ul className="mt-6 space-y-2 text-white/80">
            <li>• Total supply: {numberFmt(SUPPLY_TOTAL)}</li>
            <li>• Founder reserve: {FOUNDER_RESERVED}</li>
            <li>• Format: 1024×1024 PNG / WEBP</li>
            <li>• Blockchain: Solana — Candy Machine v3</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

// ------------------------------------------------------------
// Mint (WL removed)
// ------------------------------------------------------------
function MintSection({ countdown }: { countdown: string }) {
  return (
    <section id="mint" className="relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-semibold">Mint</h2>

        <p className="mt-4 text-white/80">
          Whitelist price: <strong>0.25 SOL</strong> • Public price:{" "}
          <strong>0.50 SOL</strong>
        </p>

        <p className="mt-2 text-white/70">
          Starts in: <span className="font-mono text-white">{countdown}</span>
        </p>

        <div className="mt-6 flex gap-3">
          <button className="px-5 py-3 rounded-xl bg-white/10 text-white/60 border border-white/20">
            Connect Wallet (soon)
          </button>
          <button className="px-5 py-3 rounded-xl bg-white text-black font-medium opacity-60">
            Mint (soon)
          </button>
        </div>
      </div>
    </section>
  );
}

// ------------------------------------------------------------
// Roadmap
// ------------------------------------------------------------
function Roadmap() {
  const phases = [
    {
      title: "Phase I — Creation",
      detail:
        "Artwork, metadata, IPFS upload. Save the Children UK brand approval.",
    },
    {
      title: "Phase II — Launch",
      detail: "Mint on Solana (Candy Machine v3), Magic Eden + Tensor listings.",
    },
    {
      title: "Phase III — Donation",
      detail: "10% of primary sales donated monthly.",
    },
    {
      title: "Phase IV — Secondary",
      detail: "Royalties (5–7%), long-term sustainable giving.",
    },
    { title: "Phase V — Legacy", detail: "Impact reports & future drops." },
  ];

  return (
    <section id="roadmap" className="relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-semibold">Roadmap</h2>

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

// ------------------------------------------------------------
// Charity
// ------------------------------------------------------------
function Charity({ policy }: { policy: string }) {
  return (
    <section id="charity" className="relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-7">
          <h2 className="text-3xl font-semibold">Charity — Save the Children UK</h2>

          <p className="mt-4 text-white/80">
            We are in official partnership with Save the Children UK. 10% of all
            primary sales are donated monthly via bank transfer.
          </p>

          <div className="mt-6 rounded-xl bg-white/5 p-4 border border-white/10">
            <div className="text-white/70 text-sm">Donation policy:</div>
            <code className="block mt-2 font-mono text-xs text-white/90 break-all">
              {policy}
            </code>
          </div>
        </div>

        <div className="md:col-span-5">
          <div className="aspect-square rounded-2xl bg-white/5 grid place-items-center">
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

// ------------------------------------------------------------
// Gallery (your 9 images)
// ------------------------------------------------------------
function Gallery() {
  const galleryImages = [
    "/images/gallery/Ephemeral-01.webp",
    "/images/gallery/Ephemeral-02.webp",
    "/images/gallery/Ephemeral-03.webp",
    "/images/gallery/Ephemeral-04.webp",
    "/images/gallery/Ephemeral-05.webp",
    "/images/gallery/Ephemeral-06.png",
    "/images/gallery/Ephemeral-07.webp",
    "/images/gallery/Ephemeral-08.webp",
    "/images/gallery/Ephemeral-09.webp",
  ];

  return (
    <section id="gallery" className="relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl font-semibold">Gallery</h2>
          <div className="text-sm text-white/60">
            9 / {numberFmt(SUPPLY_TOTAL)}
          </div>
        </div>

        <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {galleryImages.map((src, i) => (
            <figure
              key={src}
              className="rounded-2xl overflow-hidden border border-white/10 bg-white/5"
            >
              <div className="relative w-full aspect-square">
                <Image
                  src={src}
                  alt={`NFT ${i + 1}`}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

// ------------------------------------------------------------
// FAQ
// ------------------------------------------------------------
function FAQ({ magicEden, tensor }: { magicEden: string; tensor: string }) {
  const faqs = [
    {
      q: "What happens after 24 hours?",
      a: "Ephemeral NFTs fade to a black canvas with a white quote. Eternal NFTs do not fade.",
    },
    {
      q: "How many pieces exist?",
      a: `${numberFmt(SUPPLY_TOTAL)} total — ${numberFmt(
        SUPPLY_EPHEMERAL
      )} Ephemeral + ${SUPPLY_ETERNAL} Eternal.`,
    },
    {
      q: "Where is the secondary market?",
      a: `Magic Eden and Tensor: ${magicEden} • ${tensor}`,
    },
    {
      q: "How are donations handled?",
      a: "10% of primary sales donated monthly to Save the Children UK.",
    },
    {
      q: "Which wallets are supported?",
      a: "Phantom and Ledger. Mint button will activate before launch.",
    },
  ];

  return (
    <section id="faq" className="relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-semibold">FAQ</h2>

        <div className="mt-6 border border-white/10 divide-y divide-white/10 rounded-2xl overflow-hidden">
          {faqs.map((f, i) => (
            <details key={i} className="group open:bg-white/5">
              <summary className="p-5 flex justify-between cursor-pointer hover:bg-white/5">
                <span className="font-medium">{f.q}</span>
                <span className="text-white/40 group-open:rotate-45 transition">
                  +
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

// ------------------------------------------------------------
// PressKit
// ------------------------------------------------------------
function PressKit() {
  return (
    <section id="press" className="relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-7">
          <h2 className="text-3xl font-semibold">Press & Assets</h2>

          <p className="mt-4 text-white/80">
            Download our official press one-pager and brand assets for media
            coverage.
          </p>

          <ul className="mt-6 space-y-2 text-white/80">
            <li>
              • Press PDF:{" "}
              <a
                className="underline hover:text-white"
                href="#"
                target="_blank"
              >
                Coming soon
              </a>
            </li>
            <li>• Logo pack: Coming soon</li>
            <li>• Media images: Coming soon</li>
          </ul>
        </div>

        <div className="md:col-span-5">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-white/70">
            <div className="font-semibold text-white">Embargo note</div>
            <p className="mt-2 text-sm">
              Media may request an embargoed preview. Please credit “Ephemeral
              Moments Art” and “Save the Children UK (official partner)”.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ------------------------------------------------------------
// Footer
// ------------------------------------------------------------
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
              <a href={twitter} target="_blank" className="hover:text-white">
                X (Twitter)
              </a>
            </li>
            <li>
              <a href={discord} target="_blank" className="hover:text-white">
                Discord
              </a>
            </li>
            <li>
              <a href={magicEden} target="_blank" className="hover:text-white">
                Magic Eden
              </a>
            </li>
            <li>
              <a href={tensor} target="_blank" className="hover:text-white">
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
            <li>10% of primary → Save the Children UK (monthly)</li>
            <li>Royalties: 5%</li>
            <li>© {new Date().getFullYear()} Ephemeral Moments Art</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

// ------------------------------------------------------------
// PreviewArtwork (fade animation demo)
// ------------------------------------------------------------
function PreviewArtwork() {
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setExpired(true), 3000); // 3 sec demo fade
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="w-full h-full relative overflow-hidden">
      
      {/* Original artwork image */}
      <div
        className={`absolute inset-0 transition-opacity duration-[2000ms] ${
          expired ? "opacity-0" : "opacity-100"
        }`}
      >
        <Image
          src="/images/gallery/Ephemeral-01.webp"
          alt="Preview artwork"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* Faded black with quote */}
      <div
        className={`absolute inset-0 bg-black flex items-center justify-center transition-opacity duration-[2000ms] ${
          expired ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="text-white text-center px-6 italic text-sm">
          “Everything fades. What remains is the meaning we give it.”
        </p>
      </div>

    </div>
  );
}
