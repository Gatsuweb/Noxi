"use client";

import { AppShell } from "@/src/components/parentzlite/AppShell";
import { BadgeCard } from "@/src/components/parentzlite/BadgeCard";
import { badges } from "@/src/data/parentzlite";
import { useParentProgress } from "@/src/hooks/useParentProgress";
import styles from "./page.module.css";

export default function BadgesPage() {
  const { progress } = useParentProgress();

  return (
    <AppShell>
      <h1 className={styles.title}>Mes badges</h1>
      <section className={styles.grid}>
        {badges.map((badge) => (
          <BadgeCard badge={badge} key={badge.id} unlocked={progress.badges.includes(badge.id)} />
        ))}
      </section>
    </AppShell>
  );
}
