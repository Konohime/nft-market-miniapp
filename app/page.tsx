"use client";

import {
  useMiniKit,
  useAddFrame,
  useOpenUrl,
} from "@coinbase/onchainkit/minikit";
import {
  Name,
  Identity,
  Address,
  Avatar,
  EthBalance,
} from "@coinbase/onchainkit/identity";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import { useEffect, useMemo, useState, useCallback } from "react";
import { Button } from "./components/DemoComponents";
import { Icon } from "./components/DemoComponents";
// Si tu veux garder Home/Features, tu peux les réafficher ailleurs
// import { Home, Features } from "./components/DemoComponents";

type Slide = { title: string; src: string };

const SLIDES: Slide[] = [
  { title: "Average Ownership", src: "https://dune.com/embeds/4891013/8099149" },
  { title: "USD Volume vs Trade", src: "https://dune.com/embeds/5451779/8894034" },
  { title: "NFT P&L", src: "https://dune.com/embeds/4890581/8098452" },
  { title: "USD Volume by categories", src: "https://dune.com/embeds/4891077/8099346" },
  { title: "Recent NFT activity", src: "https://dune.com/embeds/5324029/8728044" },
];

export default function App() {
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const [frameAdded, setFrameAdded] = useState(false);
  const [idx, setIdx] = useState(0);

  const addFrame = useAddFrame();
  const openUrl = useOpenUrl();

  useEffect(() => {
    if (!isFrameReady) setFrameReady();
  }, [setFrameReady, isFrameReady]);

  const handleAddFrame = useCallback(async () => {
    const added = await addFrame();
    setFrameAdded(Boolean(added));
  }, [addFrame]);

  const saveFrameButton = useMemo(() => {
    if (context && !context.client.added) {
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleAddFrame}
          className="text-[var(--app-accent)] p-4"
          icon={<Icon name="plus" size="sm" />}
        >
          Save Frame
        </Button>
      );
    }
    if (frameAdded) {
      return (
        <div className="flex items-center space-x-1 text-sm font-medium text-[#0052FF] animate-fade-out">
          <Icon name="check" size="sm" className="text-[#0052FF]" />
          <span>Saved</span>
        </div>
      );
    }
    return null;
  }, [context, frameAdded, handleAddFrame]);

  const goPrev = () => setIdx((i) => (i - 1 + SLIDES.length) % SLIDES.length);
  const goNext = () => setIdx((i) => (i + 1) % SLIDES.length);

  const current = SLIDES[idx];

  return (
    <div className="flex flex-col min-h-screen font-sans text-[var(--app-foreground)] mini-app-theme from-[var(--app-background)] to-[var(--app-gray)]">
      <div className="w-full max-w-md mx-auto px-4 py-3">
        <header className="flex justify-between items-center mb-3 h-11">
          <div className="flex items-center space-x-2">
            <Wallet className="z-10">
              <ConnectWallet>
                <Name className="text-inherit" />
              </ConnectWallet>
              <WalletDropdown>
                <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                  <Avatar />
                  <Name />
                  <Address />
                  <EthBalance />
                </Identity>
                <WalletDropdownDisconnect />
              </WalletDropdown>
            </Wallet>
          </div>
          <div>{saveFrameButton}</div>
        </header>

        {/* PAGER DUNE */}
        <main className="flex-1 flex flex-col gap-3">
          <div className="text-sm font-medium text-center">{current.title}</div>

          {/* Wrapper responsive 16/9 */}
          <div className="w-full aspect-video rounded-xl overflow-hidden border">
            <iframe
              key={current.src} // reset le contenu à chaque changement
              src={current.src}
              title={current.title}
              className="w-full h-full"
              allowFullScreen
              // Optionnel: renforcer la sécurité de l'iframe.
              // 'allow-scripts' est souvent requis par les embeds; retire 'allow-same-origin'
              // si tu veux isoler davantage le contexte de l'iframe.
              sandbox="allow-scripts allow-forms allow-popups allow-pointer-lock allow-modals"
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={goPrev}>
              ← Previous
            </Button>
            <div className="text-xs text-[var(--ock-text-foreground-muted)]">
              {idx + 1} / {SLIDES.length}
            </div>
            <Button variant="ghost" size="sm" onClick={goNext}>
              Next →
            </Button>
          </div>
        </main>

        <footer className="mt-2 pt-4 flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            className="text-[var(--ock-text-foreground-muted)] text-xs"
            onClick={() => openUrl("https://base.org/builders/minikit")}
          >
            Built on Base with MiniKit
          </Button>
        </footer>
      </div>
    </div>
  );
}
