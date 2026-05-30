"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import styles from "./BottomNav.module.css";

type NavIcon = "home" | "path" | "book" | "spark" | "profile";

const items = [
  { href: "/home", label: "Accueil", icon: "home" },
  { href: "/parcours", label: "Parcours", icon: "path" },
  { href: "/lecture", label: "Comprendre", icon: "book" },
  { href: "/situation/ecrans-1", label: "Defis", icon: "spark" },
  { href: "/progression", label: "Profil", icon: "profile" },
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
  book: (
    <>
      <path d="M5 5.5h5a2 2 0 0 1 2 2v11a2 2 0 0 0-2-2H5z" />
      <path d="M19 5.5h-5a2 2 0 0 0-2 2v11a2 2 0 0 1 2-2h5z" />
    </>
  ),
  spark: (
    <>
      <path d="M12 4.5 13.8 9l4.7 1.8-4.7 1.8L12 17.5l-1.8-4.9-4.7-1.8L10.2 9z" />
      <path d="M18 15.5v3" />
      <path d="M16.5 17h3" />
    </>
  ),
  profile: (
    <>
      <path d="M12 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
      <path d="M5.5 19a6.5 6.5 0 0 1 13 0" />
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
          (item.href === "/lecture" && pathname.startsWith("/lecture"));

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
