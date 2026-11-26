"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";

/**
 * The frame around every page: app name, main menu with the current page
 * marked, and a consistent content width.
 * Heuristics: 1 and 6 (you can always see where you are),
 * 4 (same layout everywhere), 8 (calm, focused width).
 */
export function AppShell({ children, actions }: { children: ReactNode; actions?: ReactNode }) {
  const pathname = usePathname();
  const isCurrent = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <div className="flex min-h-full flex-col">
      <a
        href="#main"
        className="sr-only z-50 rounded-ui bg-primary px-4 py-2 text-primary-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3">
          <Link href="/" className="font-heading text-lg font-bold text-ink">
            {site.name}
          </Link>
          {site.nav.length > 1 ? (
            <nav aria-label="Main" className="flex flex-wrap gap-1">
              {site.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                  className={cn(
                    "flex min-h-11 items-center rounded-ui px-3 font-semibold text-muted hover:bg-accent hover:text-ink",
                    "aria-[current=page]:bg-accent aria-[current=page]:text-ink",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          ) : null}
          {actions ? <div className="ml-auto flex items-center gap-2">{actions}</div> : null}
        </div>
      </header>
      <main id="main" className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">
        {children}
      </main>
    </div>
  );
}
