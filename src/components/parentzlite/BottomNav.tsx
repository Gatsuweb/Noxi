"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import styles from "./BottomNav.module.css";

type NavIcon = "home" | "mission" | "path" | "book" | "journal";

const items = [
  { href: "/home", label: "Accueil", icon: "home" },
  { href: "/missions", label: "Missions", icon: "mission" },
  { href: "/parcours", label: "Parcours", icon: "path" },
  { href: "/lecture", label: "Comprendre", icon: "book" },
  { href: "/taniere", label: "Journal", icon: "journal" },
] satisfies Array<{ href: string; label: string; icon: NavIcon }>;

const iconPaths: Record<NavIcon, ReactNode> = {
  home: (
    <>
      <path d="M4 10.5 12 4l8 6.5" />
      <path d="M6.5 10v8.5h11V10" />
      <path d="M10 18.5v-5h4v5" />
    </>
  ),
  path: (
    <>
      <path d="M7 5.5h.01" />
      <path d="M17 18.5h.01" />
      <path d="M7 5.5c4 0 4 4 0 4s-4 4 0 4h10c4 0 4 5 0 5" />
    </>
  ),
  mission: (
    <>
      <path d="M8 5.5h8" />
      <path d="M7 9.5h10" />
      <path d="M7 13.5h6" />
      <path d="M6 3.5h12a1.5 1.5 0 0 1 1.5 1.5v14A1.5 1.5 0 0 1 18 20.5H6A1.5 1.5 0 0 1 4.5 19V5A1.5 1.5 0 0 1 6 3.5Z" />
      <path d="m14 17 1.5 1.5L19 15" />
    </>
  ),
  book: (
    <>
      <path d="M5 5.5h5a2 2 0 0 1 2 2v11a2 2 0 0 0-2-2H5z" />
      <path d="M19 5.5h-5a2 2 0 0 0-2 2v11a2 2 0 0 1 2-2h5z" />
    </>
  ),
  journal: (
    <>
      <path d="M6.5 4.5h9a2 2 0 0 1 2 2v13l-3-1.5-3 1.5-3-1.5-3 1.5v-13a2 2 0 0 1 2-2Z" />
      <path d="M9 8.5h6" />
      <path d="M9 12h5" />
    </>
  ),
};

function NavIcon({ name }: { name: NavIcon }) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
      {iconPaths[name]}
    </svg>
  );
}

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav} aria-label="Navigation principale">
      {items.map((item) => {
        const active =
          pathname === item.href ||
          (item.href === "/parcours" && pathname.startsWith("/parcours")) ||
          (item.href === "/missions" && pathname.startsWith("/missions")) ||
          (item.href === "/lecture" && pathname.startsWith("/lecture")) ||
          (item.href === "/taniere" && pathname.startsWith("/taniere"));

        return (
          <Link className={`${styles.item} ${active ? styles.active : ""}`} href={item.href} key={item.href}>
            <span>
              <NavIcon name={item.icon} />
            </span>
            <strong>{item.label}</strong>
          </Link>
        );
      })}
    </nav>
  );
}
