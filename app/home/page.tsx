"use client";

import Image from "next/image";
import Link from "next/link";
import { AppShell } from "@/src/components/parentzlite/AppShell";
import { BottomNav } from "@/src/components/parentzlite/BottomNav";
import { LevelCard } from "@/src/components/parentzlite/LevelCard";
import { DailyMissionCard } from "@/src/components/parentzlite/missions/DailyMissionCard";
import { NoxiBubble } from "@/src/components/parentzlite/NoxiBubble";
import { PathCard } from "@/src/components/parentzlite/PathCard";
import { PrimaryButton } from "@/src/components/parentzlite/PrimaryButton";
import { dailyMissions, paths, type DailyMission } from "@/src/data/parentzlite";
import { useParentProgress } from "@/src/hooks/useParentProgress";
import styles from "./page.module.css";

export default function HomePage() {
  const { progress, addXp, addSeed, incrementStreak, completeMission, isMissionCompleted } = useParentProgress();
  const dailyMission = dailyMissions[0];

  function handleCompleteMission(mission: DailyMission) {
    if (isMissionCompleted(mission.id)) {
      return false;
    }

    addXp(mission.rewardXp);
    addSeed(mission.rewardSeeds);
    incrementStreak();
    completeMission(mission.id);
    return true;
  }

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
      {/* <NoxiBubble message="Prêt(e) pour un petit pas aujourd'hui ?" mood="happy" /> */}

      <DailyMissionCard
        completed={isMissionCompleted(dailyMission.id)}
        mission={dailyMission}
        onComplete={handleCompleteMission}
      />

      <Link className={styles.denCard} href="/taniere">
        <div>
          <span>Tanière</span>
          <strong>Découvrir les récompenses</strong>
          <p>{progress.seeds} graines à utiliser avec Noxi.</p>
        </div>
        <Image src="/parentZlite/collectibles/collectibles-taniere.png" alt="" width={86} height={86} />
      </Link>

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
          <PrimaryButton href="/situation/emotions-1">C&apos;est parti !</PrimaryButton>
        </div>
        <Image src="/parentZlite/cards-situations/card-colere-au-supermarche.png" alt="" width={150} height={120} />
        <strong>+20 XP</strong>
      </section>
      <BottomNav />
    </AppShell>
  );
}
