import Image from "next/image";

export default function Home() {
  // ---- Hero image ----
  const heroImage = "/images/Hero.webp";

  // ---- Gallery képek ----
  const galleryImages = [
    "Ephemeral-01.webp",
    "Ephemeral-02.webp",
    "Ephemeral-03.webp",
    "Ephemeral-04.webp",
    "Ephemeral-05.webp",
    "Ephemeral-06.png",   // PNG is támogatott
    "Ephemeral-07.webp",
    "Ephemeral-08.webp",
    "Ephemeral-09.webp",
  ];

  return (
    <main className="bg-black text-white">
      {/* ---------------- HERO ---------------- */}
      <section className="relative py-20 border-b border-white/10" id="home">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-10">
            Ephemeral Moments
          </h1>

          <div className="flex justify-center">
            <Image
              src={heroImage}
              alt="Hero"
              width={800}
              height={800}
              className="rounded-xl shadow-xl"
            />
          </div>

          <p className="mt-8 text-lg text-gray-300 max-w-2xl mx-auto">
            A 10,100 darabból álló NFT kollekció, amely a pillanat törékeny
            szépségét örökíti meg.  
            A whitelist privát meghívással történik — influencereknek fenntartva.
          </p>
        </div>
      </section>

      {/* ---------------- MINT INFO ---------------- */}
      <section
        id="mint"
        className="relative border-b border-white/10 py-16 mt-10"
      >
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">Mint Information</h2>

          <p className="mt-6 text-gray-300">
            <strong>Whitelist price:</strong> 0.06 ETH  
          </p>

          <p className="mt-3 text-gray-300">
            <strong>Public mint price:</strong> 0.08 ETH
          </p>

          <p className="mt-6 text-gray-400">
            A whitelist nem weboldalon keresztül működik.  
            Meghívás kizárólag partnereken és influencereken keresztül.
          </p>
        </div>
      </section>

      {/* ---------------- GALLERY ---------------- */}
      <section
        id="gallery"
        className="relative border-b border-white/10 py-16"
      >
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-10">Gallery</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {galleryImages.map((img, i) => (
              <img
                key={i}
                src={`/images/gallery/${img}`}
                alt={`Gallery image ${i + 1}`}
                className="rounded-lg shadow-lg w-full"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- ROADMAP ---------------- */}
      <section
        id="roadmap"
        className="relative border-b border-white/10 py-16"
      >
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-10">Roadmap</h2>

          <div className="space-y-8 text-gray-300">

            <div>
              <h3 className="text-xl font-semibold">Phase 1 — Launch</h3>
              <p className="mt-2">
                A projekt bejelentése, együttműködés influencerekkel, whitelist kiosztása.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold">Phase 2 — Mint</h3>
              <p className="mt-2">
                Whitelist mint → Public mint. 10,100 NFT kibocsátása.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold">Phase 3 — Charity</h3>
              <p className="mt-2">
                A bevételek egy része átutalásra kerül a Save The Children részére.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold">Phase 4 — Expansion</h3>
              <p className="mt-2">
                Kiterjesztett utility, holder rewards, IRL események.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="py-10 text-center text-gray-500">
        © {new Date().getFullYear()} Ephemeral Moments — All rights reserved.
      </footer>
    </main>
  );
}
