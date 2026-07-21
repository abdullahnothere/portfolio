"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
      className={cn(
        "no-print fixed bottom-6 right-6 z-50 grid h-10 w-10 place-items-center rounded-[10px] border border-hair bg-surface text-muted shadow-lift transition-all duration-300 hover:border-mint hover:text-mint",
        show ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <ArrowUp size={16} />
    </button>
  );
}
