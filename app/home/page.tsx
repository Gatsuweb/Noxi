"use client";

import Image from "next/image";
import Link from "next/link";
import { AppShell } from "@/src/components/parentzlite/AppShell";
import { BottomNav } from "@/src/components/parentzlite/BottomNav";
import { DailyMissionCard } from "@/src/components/parentzlite/missions/DailyMissionCard";
import { NoxiBubble } from "@/src/components/parentzlite/NoxiBubble";
import { PrimaryButton } from "@/src/components/parentzlite/PrimaryButton";
import { dailyMissions, paths, type DailyMission } from "@/src/data/parentzlite";
import { useParentProgress } from "@/src/hooks/useParentProgress";
import styles from "./page.module.css";

export default function HomePage() {
  const { progress, addXp, addSeed, addParentMoment, incrementStreak, completeMission, isMissionCompleted } =
    useParentProgress();
  const dailyMission = dailyMissions[0];
  const todayPath = paths.find((path) => path.slug === "emotions") ?? paths[0];

  function handleCompleteMission(mission: DailyMission) {
    if (isMissionCompleted(mission.id)) {
      return false;
    }

    addXp(mission.rewardXp);
    addSeed(mission.rewardSeeds);
    incrementStreak();
    completeMission(mission.id);
    addParentMoment({
      id: `mission-${mission.id}`,
      title: mission.title,
      category: mission.category,
      date: "Aujourd'hui",
      description: mission.description,
    });
    return true;
  }

  return (
    <AppShell withNav>
      <header className={styles.header}>
        <Image className={styles.avatar} src="/parentZlite/noxi-emotes/noxi.png" alt="Noxi" width={56} height={82} />
        <div>
          <h1>Bonjour !</h1>
          <p>Un petit pas pour progresser avec ton enfant.</p>
        </div>
        <div className={styles.streak}>
          <span>{progress.streak}🔥</span>
          <small>jours</small>
        </div>
      </header>

      <section className={styles.sectionHeader}>
        <h2>Mission du jour</h2>
        <Link href="/missions">Toutes</Link>
      </section>
      <DailyMissionCard
        completed={isMissionCompleted(dailyMission.id)}
        mission={dailyMission}
        onComplete={handleCompleteMission}
      />

      <section className={styles.challenge}>
        <div>
          <span>Situation du jour</span>
          <h2>Gerer une colere au supermarche</h2>
          <PrimaryButton href="/situation/emotions-1">C&apos;est parti !</PrimaryButton>
        </div>
        <Image src="/parentZlite/cards-situations/card-colere-au-supermarche.png" alt="" width={150} height={120} />
        <strong>+20 XP</strong>
      </section>

      <Link className={styles.readingCard} href="/lecture">
        <div>
          <span>Comprendre</span>
          <strong>Poser une limite sans durcir le moment</strong>
          <p>2 minutes pour repartir avec une idee claire.</p>
        </div>
        <Image src="/parentZlite/noxi-emotes/noxi-curieux.png" alt="" width={74} height={74} />
      </Link>

      <Link className={styles.progressCard} href="/taniere">
        <div>
          <span>Progression parent</span>
          <strong>
            Niveau {progress.level} - {progress.xp} XP
          </strong>
          <p>
            {progress.completedMissions.length} missions reelles et {progress.completedReadings.length} lectures
            comprises.
          </p>
        </div>
        <div className={styles.seedPill}>{progress.seeds} graines</div>
      </Link>

      <Link className={styles.pathPreview} href="/parcours">
        <Image src={todayPath.image} alt="" width={70} height={70} />
        <div>
          <span>Parcours</span>
          <strong>{todayPath.title}</strong>
          <p>Continuer a construire des reperes.</p>
        </div>
      </Link>

      {/* <NoxiBubble message="Ta serie est precieuse, on la protege ?" mood="happy" /> */}
      <BottomNav />
    </AppShell>
  );
}
