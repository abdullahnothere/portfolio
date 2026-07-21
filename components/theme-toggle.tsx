"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="grid h-[34px] w-[34px] place-items-center rounded-[9px] border border-hair text-muted transition-colors hover:border-mint hover:text-mint"
    >
      {/* Rendered after mount so the icon never disagrees with the stored theme. */}
      {mounted ? (isDark ? <Sun size={15} /> : <Moon size={15} />) : <span className="h-[15px] w-[15px]" />}
    </button>
  );
}
