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

export default function App() {
  const [idx, setIdx] = useState(0);
  const current = SLIDES[idx];
  const goPrev = () => setIdx((i) => (i - 1 + SLIDES.length) % SLIDES.length);
  const goNext = () => setIdx((i) => (i + 1) % SLIDES.length);

  return (
    <div className="min-h-screen w-full max-w-md mx-auto px-4 py-4 flex flex-col gap-3">
      <header className="text-center font-semibold">{current.title}</header>

      <div className="w-full aspect-video rounded-xl overflow-hidden border">
        <iframe
          key={current.src}
          src={current.src}
          title={current.title}
          className="w-full h-full"
          allowFullScreen
          // le sandbox est optionnel; si tu le gardes, évite d’être trop restrictif
          sandbox="allow-scripts allow-forms allow-popups allow-pointer-lock allow-modals"
        />
      </div>

      <div className="flex items-center justify-between">
        <button onClick={goPrev}>← Previous</button>
        <div className="text-sm">{idx + 1} / {SLIDES.length}</div>
        <button onClick={goNext}>Next →</button>
      </div>
    </div>
  );
}
