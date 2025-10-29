import React, { useMemo, useState, useEffect } from 'react'
import SEO from '../components/SEO'   // 🆕 SEO komponens

export default function Home() {
  // TEMP countdown (később betesszük a pontos mint időzítést)
  const MINT_DATE = useMemo(() => new Date(Date.now() + 1000 * 60 * 60 * 24 * 14), [])
  const DONATION_POLICY = 'Save the Children UK — monthly transfer (10% of primary sales)'
  const TWITTER = 'https://x.com/EphemeralArtCo'
  const DISCORD = '#'
  const MAGIC_EDEN = '#'
  const TENSOR = '#'

  // 🆕 SEO-hoz használt URL/OG kép
  const URL = 'https://ephemeralmoments.org/'
  const OG = `${URL}og.jpg`

  const [now, setNow] = useState(Date.now())
  const [wlOpen, setWlOpen] = useState(true)
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t) }, [])
  const diff = MINT_DATE.getTime() - now
  const countdown = formatDuration(diff)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 🆕 SEO blokk – legyen az első gyermek */}
      <SEO
        title="Ephemeral Moments"
        description="Digitális fotóművészet – limitált kiadások, kurált kollekciók."
        url={URL}
        image={OG}
      />

      <Header />
      <main>
        <Hero countdown={countdown} twitter={TWITTER} />
        <Concept />
        <MintSection countdown={countdown} wlOpen={wlOpen} setWlOpen={setWlOpen} />
        <Roadmap />
        <Charity policy={DONATION_POLICY} />
        <Gallery />
        <FAQ magicEden={MAGIC_EDEN} tensor={TENSOR} />
        <PressKit />
      </main>
      <Footer twitter={TWITTER} discord={DISCORD} magicEden={MAGIC_EDEN} tensor={TENSOR} />
    </div>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/60 bg-black/80 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white/90 to-white/30"/>
          <span className="font-semibold tracking-wide text-white group-hover:opacity-90">Ephemeral Moments</span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
          <a href="#concept" className="hover:text-white">Concept</a>
          <a href="#mint" className="hover:text-white">Mint</a>
          <a href="#roadmap" className="hover:text-white">Roadmap</a>
          <a href="#charity" className="hover:text-white">Charity</a>
          <a href="#gallery" className="hover:text-white">Gallery</a>
          <a href="#faq" className="hover:text-white">FAQ</a>
          <a href="#press" className="hover:text-white">Press</a>
        </nav>
        <div className="flex items-center gap-3">
          <button className="hidden md:inline-block px-4 py-2 rounded-xl border border-white/20 hover:border-white/40 transition text-sm">Connect Wallet</button>
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-lg border border-white/20">☰</button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/10 px-4 pb-4">
          <div className="flex flex-col gap-3 text-white/90">
            <a href="#concept" onClick={() => setOpen(false)} className="py-2">Concept</a>
            <a href="#mint" onClick={() => setOpen(false)} className="py-2">Mint</a>
            <a href="#roadmap" onClick={() => setOpen(false)} className="py-2">Roadmap</a>
            <a href="#charity" onClick={() => setOpen(false)} className="py-2">Charity</a>
            <a href="#gallery" onClick={() => setOpen(false)} className="py-2">Gallery</a>
            <a href="#faq" onClick={() => setOpen(false)} className="py-2">FAQ</a>
            <a href="#press" onClick={() => setOpen(false)} className="py-2">Press</a>
          </div>
        </div>
      )}
    </header>
  )
}

function Hero({ countdown, twitter }: { countdown: string, twitter: string }) {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-24 -left-24 w-[38rem] h-[38rem] rounded-full bg-white/5 blur-3xl"/>
        <div className="absolute -bottom-24 -right-24 w-[42rem] h-[42rem] rounded-full bg-white/10 blur-3xl"/>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-20 md:py-28">
        <p className="uppercase tracking-[0.2em] text-xs text-white/60">Solana • Art • Charity</p>
        <h1 className="mt-4 text-4xl md:text-6xl font-semibold leading-tight">
          The art of <span className="underline decoration-white/30 underline-offset-8">fading</span>,<br/> the beauty of what remains.
        </h1>
        <p className="mt-6 text-white/80 max-w-2xl">
          Monochrome, sumi-e inspired NFTs that fade after 24 hours — leaving a single white quote as a memory. 9,999 pieces; among them, 100 <em>Eternal</em> remain visible forever (with a discreet Save the Children logo).
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <a href="#mint" className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition">Mint – coming soon</a>
          <a href={twitter} target="_blank" className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-white/20 hover:border-white/40 transition">Follow on X</a>
        </div>
        <div className="mt-10 text-sm text-white/70">Countdown to mint: <span className="font-mono text-white">{countdown}</span></div>
      </div>
    </section>
  )
}

function Concept() {
  return (
    <section id="concept" className="relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-6">
          <div className="aspect-square rounded-2xl bg-gradient-to-br from-white/10 to-white/5 grid place-items-center text-white/70">
            <PreviewArtwork />
          </div>
        </div>
        <div className="md:col-span-6">
          <h2 className="text-2xl md:text-3xl font-semibold">Concept</h2>
          <p className="mt-4 text-white/80">
            Each Ephemeral NFT fades to black after 24 hours, leaving only a white quote — the imprint of memory. The 100 <strong>Eternal</strong> pieces remain visible forever (with a discreet Save the Children logo in the bottom-left corner).
          </p>
          <ul className="mt-6 space-y-2 text-white/80">
            <li>• Total supply: 9,999 NFTs (9,899 Ephemeral, 100 Eternal)</li>
            <li>• Format: 1024×1024 PNG, monochrome
