import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

const button = cva(
  "inline-flex items-center gap-2 rounded-[10px] border font-medium transition-all duration-200 disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "border-mint bg-mint text-ground hover:bg-mint-deep hover:border-mint-deep dark:text-[hsl(194_38%_9%)]",
        outline: "border-hair bg-transparent text-ink hover:-translate-y-px hover:border-mint hover:text-mint",
        ghost: "border-transparent bg-transparent text-muted hover:text-mint",
      },
      size: { sm: "px-3 py-1.5 text-[0.82rem]", md: "px-[18px] py-[11px] text-[0.9rem]" },
    },
    defaultVariants: { variant: "outline", size: "md" },
  },
);

type BtnProps = VariantProps<typeof button> & { className?: string };

export function Button({ variant, size, className, ...props }: BtnProps & ComponentProps<"button">) {
  return <button className={cn(button({ variant, size }), className)} {...props} />;
}

export function ButtonLink({
  variant, size, className, href, external, ...props
}: BtnProps & ComponentProps<"a"> & { href: string; external?: boolean }) {
  const cls = cn(button({ variant, size }), className);
  if (external || href.startsWith("http")) {
    return <a className={cls} href={href} target="_blank" rel="noreferrer noopener" {...props} />;
  }
  return <Link className={cls} href={href} {...props} />;
}
