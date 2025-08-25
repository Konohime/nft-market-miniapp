"use client";
import { useState } from "react";

type Slide = { title: string; src: string };

const SLIDES: Slide[] = [
  { title: "Average Ownership",        src: "https://dune.com/embeds/4891013/8099149" },
  { title: "USD Volume vs Trade",      src: "https://dune.com/embeds/5451779/8894034" },
  { title: "NFT P&L",                  src: "https://dune.com/embeds/4890581/8098452" },
  { title: "USD Volume by categories", src: "https://dune.com/embeds/4891077/8099346" },
  { title: "Recent NFT activity",      src: "https://dune.com/embeds/5324029/8728044" },
];

export default function Page() {
  const [idx, setIdx] = useState(0);
  const s = SLIDES[idx];

  const prev = () => setIdx(i => (i - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setIdx(i => (i + 1) % SLIDES.length);

  return (
    <div className="min-h-screen w-full max-w-md mx-auto px-4 py-4 flex flex-col gap-3">
      <header className="text-center font-semibold">{s.title}</header>

      <div className="w-full aspect-video rounded-xl overflow-hidden border">
        <iframe
          key={s.src}
          src={s.src}
          title={s.title}
          className="w-full h-full"
          loading="lazy"
          allowFullScreen
          // ❌ PAS de `sandbox` ici pour laisser Dune accéder à ses cookies/localStorage/postMessage
        />
      </div>

      <div className="flex items-center justify-between">
        <button onClick={prev}>← Previous</button>
        <div className="text-sm">{idx + 1} / {SLIDES.length}</div>
        <button onClick={next}>Next →</button>
      </div>
    </div>
  );
}
