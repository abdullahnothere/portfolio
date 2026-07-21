/**
 * Generated card artwork: a raking grid whose angle and node position derive
 * from the card's index, so every card is distinct without any image assets.
 * Cheap, themeable, and it never looks like stock photography.
 */
export function ProjectArt({ seed }: { seed: number }) {
  const lines = Array.from({ length: 9 }, (_, n) => ({
    x1: -40 + n * 40 + seed * 7,
    x2: 20 + n * 40 + seed * 7,
    o: ((n % 4) + 1) * 0.14,
  }));

  return (
    <svg viewBox="0 0 300 132" preserveAspectRatio="none" className="h-full w-full" aria-hidden focusable="false">
      <defs>
        <linearGradient id={`grad-${seed}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="hsl(var(--mint))" stopOpacity="0.20" />
          <stop offset="1" stopColor="hsl(var(--mint))" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="300" height="132" fill={`url(#grad-${seed})`} />
      {lines.map((l, i) => (
        <line key={i} x1={l.x1} y1="132" x2={l.x2} y2="0" stroke="hsl(var(--mint))" strokeOpacity={l.o} strokeWidth="1" />
      ))}
      <circle cx={40 + seed * 33} cy={40 + (seed % 3) * 24} r="5" fill="hsl(var(--mint))" />
    </svg>
  );
}
