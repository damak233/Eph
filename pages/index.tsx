import { useEffect, useState } from "react";

// ------------------------------------------------------
// HERO COMPONENT
// ------------------------------------------------------
const Hero = ({ countdown }: { countdown: string }) => {
  return (
    <section
      id="hero"
      className="relative h-screen w-full bg-black text-white flex items-center"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/images/Hero.webp"
          alt="Ephemeral Moments Hero"
          className="w-full h-full object-cover opacity-70"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-10">
        <p className="text-xs md:text-sm tracking-widest mb-4 opacity-80">
          SOLANA • ART • CHARITY
        </p>

        <h1 className="text-3xl md:text-6xl font-bold leading-tight">
          The art of fading,<br /> the beauty of what remains.
        </h1>

        <p className="mt-6 max-w-xl text-base md:text-lg opacity-90">
          Monochrome, sumi-e inspired NFTs that fade after 24 hours —
          leaving a single white quote as a memory.
          10,100 pieces; 100 eternal remain visible forever.
        </p>

        <div className="flex items-center gap-4 mt-8">
          <button className="px-6 py-3 rounded bg-white text-black font-medium cursor-not-allowed opacity-60">
            Mint — coming soon
          </button>

          <a
            href="https://x.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded border border-white/50 text-white hover:bg-white/10 transition"
          >
            Follow on X
          </a>
        </div>

        <p className="mt-6 text-sm opacity-80">
          Countdown to mint: <span className="font-semibold">{countdown}</span>
        </p>
      </div>
    </section>
  );
};

// ------------------------------------------------------
// CONCEPT SECTION
// ------------------------------------------------------
const Concept = () => {
  return (
    <section id="concept" className="py-20 bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 md:px-10 grid md:grid-cols-2 gap-10">
        <div>
          <img
            src="/images/gallery/Ephemeral-03.webp"
            alt="Concept Art"
            className="rounded-lg shadow-lg"
          />
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-6">Concept</h2>
          <p className="leading-relaxed opacity-90">
            Ephemeral NFTs fade to black with a white quote after 24 hours.
            The 100 Eternal pieces never fade and include a discreet
            Save the Children logo.
          </p>

          <ul className="mt-6 space-y-2 opacity-80 text-sm">
            <li>• Total supply: 10,100</li>
            <li>• Founder reserve: 1</li>
            <li>• Eternal supply: 100</li>
            <li>• Format: 1024×1024 PNG / WEBP</li>
            <li>• Blockchain: Solana — Candy Machine v3</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

// ------------------------------------------------------
// MINT SECTION
// ------------------------------------------------------
const MintSection = ({ countdown }: { countdown: string }) => {
  return (
    <section id="mint" className="py-20 bg-black text-white border-t border-white/10">
      <div className="max-w-5xl mx-auto px-4 md:px-10">
        <h2 className="text-3xl font-bold">Mint</h2>

        <p className="mt-4 opacity-80">
          Whitelist price: <strong>0.25 SOL</strong> &nbsp;·&nbsp; Public price:{" "}
          <strong>0.50 SOL</strong>
        </p>

        <p className="mt-2 opacity-80">Starts in: {countdown}</p>

        <div className="mt-6 flex gap-4">
          <button className="px-6 py-3 rounded bg-gray-600 text-white cursor-not-allowed">
            Connect Wallet (soon)
          </button>

          <button className="px-6 py-3 rounded bg-gray-600 text-white cursor-not-allowed">
            Mint (soon)
          </button>
        </div>
      </div>
    </section>
  );
};

// ------------------------------------------------------
// ROADMAP SECTION
// ------------------------------------------------------
const Roadmap = () => {
  return (
    <section id="roadmap" className="py-20 bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 md:px-10">
        <h2 className="text-3xl font-bold mb-10">Roadmap</h2>

        <div className="grid md:grid-cols-5 gap-6">
          {[
            ["Phase I — Creation", "Artwork, metadata, IPFS upload. Save the Children UK approval."],
            ["Phase II — Launch", "Mint on Solana (Candy Machine v3). Listings on Magic Eden + Tensor."],
            ["Phase III — Donation", "10% of primary sales donated monthly."],
            ["Phase IV — Secondary", "Royalties (5–7%), long-term sustainable giving."],
            ["Phase V — Legacy", "Impact reports & future drops."]
          ].map(([title, text], i) => (
            <div key={i} className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-2 text-sm opacity-80">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ------------------------------------------------------
// CHARITY SECTION
// ------------------------------------------------------
const Charity = () => {
  return (
    <section id="charity" className="py-20 bg-black text-white border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 md:px-10 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-3xl font-bold mb-6">Charity — Save the Children UK</h2>

          <p className="leading-relaxed opacity-90">
            We are in an official partnership with Save the Children UK.
            10% of all primary sales are donated monthly via bank transfer.
          </p>

          <p className="mt-4 opacity-75 text-sm">
            Direct, transparent, impact-focused giving.
          </p>
        </div>

        <div>
          <img
            src="/images/gallery/Ephemeral-07.webp"
            alt="Charity"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

// ------------------------------------------------------
// MAIN PAGE
// ------------------------------------------------------
export default function Home() {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const target = new Date("2025-03-01T18:00:00Z").getTime();

    const update = () => {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setCountdown("Mint is live!");
        return;
      }

      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setCountdown(`${h}h ${m}m ${s}s`);
    };

    update();
    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="bg-black text-white">
      <Hero countdown={countdown} />
      <Concept />
      <MintSection countdown={countdown} />
      <Roadmap />
      <Charity />
    </main>
  );
}
