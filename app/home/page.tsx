"use client";

import Image from "next/image";
import Link from "next/link";
import { AppShell } from "@/src/components/parentzlite/AppShell";
import { BottomNav } from "@/src/components/parentzlite/BottomNav";
import { LevelCard } from "@/src/components/parentzlite/LevelCard";
import { PathCard } from "@/src/components/parentzlite/PathCard";
import { PrimaryButton } from "@/src/components/parentzlite/PrimaryButton";
import { paths } from "@/src/data/parentzlite";
import { useParentProgress } from "@/src/hooks/useParentProgress";
import styles from "./page.module.css";

export default function HomePage() {
  const { progress } = useParentProgress();

  return (
    <AppShell withNav>
      <header className={styles.header}>
        <Image
          className={styles.avatar}
          src="/parentZlite/noxi-emotes/noxi.png"
          alt="Noxi"
          width={56}
          height={82}
        />
        <div>
          <h1>Bonjour ! 👋</h1>
          <p>Pret(e) a relever un nouveau defi ?</p>
        </div>
        <div className={styles.streak}>
          <span>🔥 {progress.streak}</span>
          <small>Serie du jour</small>
        </div>
      </header>

      <LevelCard level={progress.level} xp={progress.xp} maxXp={progress.maxXp} />

      <section className={styles.sectionHeader}>
        <h2>Mes parcours</h2>
        <Link href="/parcours">Voir tout</Link>
      </section>
      <section className={styles.pathGrid}>
        {paths.map((path) => (
          <PathCard key={path.slug} path={path} />
        ))}
      </section>

      <section className={styles.challenge}>
        <div>
          <span>Defi du jour</span>
          <h2>Gerer une colere au supermarche</h2>
          <PrimaryButton href="/situation/emotions-1">C'est parti !</PrimaryButton>
        </div>
        <Image src="/parentZlite/cards-situations/card-colere-au-supermarche.png" alt="" width={150} height={120} />
        <strong>+20 XP</strong>
      </section>
      <BottomNav />
    </AppShell>
  );
}
