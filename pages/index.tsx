import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const target = new Date("2025-02-01T00:00:00Z").getTime();

    const timer = setInterval(() => {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setCountdown("Live now");
        clearInterval(timer);
        return;
      }

      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown(`${h}h ${m}m ${s}s`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="bg-black text-white">
      {/* ---------------- HERO SECTION ---------------- */}
      <section className="relative h-screen w-full flex items-center justify-center text-center overflow-hidden">
        <Image
          src="/images/Hero.webp"
          alt="Hero"
          fill
          className="object-cover opacity-70"
          priority
        />

        <div className="relative z-10 max-w-2xl px-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            The art of fading,<br /> the beauty of what remains.
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Monochrome, sumi-e inspired NFTs that fade after 24 hours —
            leaving a single white quote as a memory.
            10,100 pieces; 100 eternal remain visible forever.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <button className="px-6 py-3 bg-white text-black rounded-lg font-semibold">
              Mint – coming soon
            </button>

            <Link
              href="https://x.com"
              target="_blank"
              className="px-6 py-3 border border-white rounded-lg font-semibold"
            >
              Follow on X
            </Link>
          </div>

          <p className="mt-4 text-gray-400 text-sm">
            Countdown: {countdown}
          </p>
        </div>
      </section>

      {/* ---------------- CONCEPT SECTION ---------------- */}
      <section id="concept" className="py-24 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        <div className="w-full">
          <Image
            src="/images/gallery/Ephemeral-01.webp"
            width={800}
            height={600}
            alt="Concept art"
            className="rounded-lg object-cover w-full h-auto"
          />
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-6">Concept</h2>

          <p className="text-gray-300 leading-relaxed mb-6">
            Ephemeral NFTs fade to black with a white quote after 24 hours.
            The 100 Eternal pieces remain visible forever and include a discreet
            Save the Children logo.
          </p>

          <ul className="text-gray-400 space-y-2">
            <li>• Total supply: 10,100</li>
            <li>• Founder reserve: 1</li>
            <li>• Format: 1024×1024 PNG / WEBP</li>
            <li>• Blockchain: Solana — Candy Machine v3</li>
          </ul>
        </div>
      </section>

      {/* ---------------- MINT SECTION ---------------- */}
      <section id="mint" className="py-24 px-6 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Mint</h2>

        <p className="text-gray-300 mb-4">
          Whitelist price: <strong>0.25 SOL</strong> · Public price:{" "}
          <strong>0.50 SOL</strong>
        </p>

        <p className="text-gray-400 mb-8">Starts in: {countdown}</p>

        <button className="px-6 py-3 bg-gray-700 text-white rounded-lg cursor-not-allowed">
          Connect Wallet (soon)
        </button>
      </section>

      {/* ---------------- ROADMAP SECTION ---------------- */}
      <section id="roadmap" className="py-24 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Roadmap</h2>

        <div className="grid md:grid-cols-5 gap-8 text-center">
          <div>
            <h3 className="font-bold mb-2">01 — Creation</h3>
            <p className="text-gray-400 text-sm">
              Artwork, metadata, IPFS upload. Save the Children UK approval.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-2">02 — Launch</h3>
            <p className="text-gray-400 text-sm">
              Mint on Solana. Magic Eden + Tensor listings.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-2">03 — Donation</h3>
            <p className="text-gray-400 text-sm">
              10% of primary sales donated monthly.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-2">04 — Secondary</h3>
            <p className="text-gray-400 text-sm">
              Royalties (5–7%), long-term sustainable giving.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-2">05 — Legacy</h3>
            <p className="text-gray-400 text-sm">
              Impact reports & future drops.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- CHARITY SECTION ---------------- */}
      <section id="charity" className="py-24 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl font-bold mb-6">Charity — Save the Children UK</h2>

          <p className="text-gray-300 leading-relaxed mb-6">
            We are in official partnership with Save the Children UK.
            10% of all primary sales are donated monthly via bank transfer.
          </p>
        </div>

        <div>
          <Image
            src="/images/gallery/Ephemeral-06.png"
            width={800}
            height={600}
            alt="Charity art"
            className="rounded-lg object-cover w-full h-auto"
          />
        </div>
      </section>
    </main>
  );
}
