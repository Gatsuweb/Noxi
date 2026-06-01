"use client";

import Link from "next/link";
import { AppShell } from "@/src/components/parentzlite/AppShell";
import { BottomNav } from "@/src/components/parentzlite/BottomNav";
import { NoxiBubble } from "@/src/components/parentzlite/NoxiBubble";
import { ProgressStatCard } from "@/src/components/parentzlite/ProgressStatCard";
import { XpBar } from "@/src/components/parentzlite/XpBar";
import { useParentProgress } from "@/src/hooks/useParentProgress";
import styles from "./page.module.css";

export default function ProgressionPage() {
  const { progress } = useParentProgress();

  return (
    <AppShell withNav>
      <h1 className={styles.title}>Ma progression</h1>
      <section className={styles.stats}>
        <ProgressStatCard icon="N" label="Niveau actuel" value={progress.level} suffix="Parent Explorateur" />
        <ProgressStatCard icon="XP" label="XP totaux" value={progress.xp} />
        <ProgressStatCard icon="S" label="Serie actuelle" value={progress.streak} suffix="jours" />
      </section>
      <section className={styles.xpBlock}>
        <div>
          <span>XP avant le prochain niveau</span>
          <strong>
            {progress.xp} / {progress.maxXp} XP
          </strong>
        </div>
        <XpBar value={progress.xp} max={progress.maxXp} />
      </section>
      <section className={styles.seeds}>
        <span>Graines pour contenus utiles</span>
        <strong>{progress.seeds}</strong>
      </section>
      <Link className={styles.denLink} href="/taniere">
        <span>Journal</span>
        <strong>Voir mes progres concrets</strong>
      </Link>
      <NoxiBubble message="Regarde tout ce que tu as deja construit." mood="proud" />
      <BottomNav />
    </AppShell>
  );
}
