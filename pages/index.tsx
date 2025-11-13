import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const target = new Date("2025-01-30T18:00:00Z").getTime();

    const timer = setInterval(() => {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setCountdown("Live now");
        return;
      }

      const h = Math.floor(diff / 1000 / 60 / 60);
      const m = Math.floor((diff / 1000 / 60) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setCountdown(`${h}h ${m}m ${s}s`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="bg-black text-white min-h-screen">
      {/* ---------------- HERO ---------------- */}
      <section className="relative w-full h-[90vh]">
        <Image
          src="/images/Hero.webp"
          alt="Ephemeral Art"
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/90"></div>

        <div className="absolute bottom-24 left-6 md:left-20 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            The art of fading,  
            <br />
            the beauty of what remains.
          </h1>

          <p className="mt-4 text-lg opacity-90 max-w-lg">
            Monochrome, sumi-e inspired NFTs that fade after 24 hours — leaving a
            single white quote as a memory. 10,100 pieces; 100 eternal remain visible
            forever.
          </p>

          <div className="flex gap-4 mt-6">
            <button className="px-6 py-3 bg-white text-black rounded-lg font-semibold cursor-not-allowed opacity-50">
              Mint – coming soon
            </button>

            <Link
              href="https://x.com/EphemeralMoments"
              className="px-6 py-3 border border-white rounded-lg font-semibold"
            >
              Follow on X
            </Link>
          </div>

          <p className="mt-4 text-sm opacity-70">Countdown: {countdown}</p>
        </div>
      </section>

      {/* ---------------- CONCEPT ---------------- */}
      <section id="concept" className="py-24 px-6 md:px-20 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <Image
              src="/images/gallery/Ephemeral-01.webp"
              alt="Concept Art"
              width={600}
              height={600}
              className="rounded-lg"
            />
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4">Concept</h2>
            <p className="opacity-80 leading-relaxed">
              Ephemeral NFTs fade to black within 24 hours, leaving a single white
              quote behind — symbolizing how memories remain even when moments fade.
              The 100 Eternal works never fade and include a discreet Save the
              Children logo.
            </p>

            <ul className="mt-6 space-y-2 opacity-80">
              <li>• Total supply: 10,100</li>
              <li>• Founder reserve: 1</li>
              <li>• Format: 1024×1024 PNG / WEBP</li>
              <li>• Blockchain: Solana — Candy Machine v3</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------- MINT ---------------- */}
      <section id="mint" className="py-24 px-6 md:px-20 border-t border-white/10">
        <h2 className="text-3xl font-bold">Mint</h2>

        <p className="mt-4 opacity-80">
          Whitelist price: <strong>0.25 SOL</strong> · Public price:{" "}
          <strong>0.50 SOL</strong>
        </p>

        <p className="mt-2 opacity-80">Starts in: {countdown}</p>

        <button className="mt-6 px-6 py-3 bg-white text-black rounded-lg font-semibold cursor-not-allowed opacity-50">
          Connect Wallet (soon)
        </button>
      </section>

      {/* ---------------- ROADMAP ---------------- */}
      <section id="roadmap" className="py-24 px-6 md:px-20 border-t border-white/10">
        <h2 className="text-3xl font-bold mb-10">Roadmap</h2>

        <div className="grid md:grid-cols-5 gap-6">
          <div>
            <h3 className="font-bold mb-2">01 — Creation</h3>
            <p className="opacity-70 text-sm">
              Artwork, metadata, IPFS upload. Save the Children UK brand approval.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-2">02 — Launch</h3>
            <p className="opacity-70 text-sm">
              Mint on Solana (Candy Machine v3). Magic Eden + Tensor listings.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-2">03 — Donation</h3>
            <p className="opacity-70 text-sm">10% of primary sales donated monthly.</p>
          </div>

          <div>
            <h3 className="font-bold mb-2">04 — Secondary</h3>
            <p className="opacity-70 text-sm">
              Royalties (5–7%), long-term sustainable giving.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-2">05 — Legacy</h3>
            <p className="opacity-70 text-sm">
              Impact reports & future drops.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- CHARITY ---------------- */}
      <section id="charity" className="py-24 px-6 md:px-20 border-t border-white/10">
        <h2 className="text-3xl font-bold">Charity — Save the Children UK</h2>

        <p className="mt-4 opacity-80 max-w-2xl">
          We are in official partnership with Save the Children UK.  
          10% of all primary sales are donated monthly via bank transfer.
        </p>

        <div className="mt-10">
          <Image
            src="/images/gallery/Ephemeral-09.webp"
            alt="Charity Eternal"
            width={600}
            height={600}
            className="rounded-lg"
          />
        </div>
      </section>
    </main>
  );
}
