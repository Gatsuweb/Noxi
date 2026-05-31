"use client";

import { AppShell } from "@/src/components/parentzlite/AppShell";
import { BottomNav } from "@/src/components/parentzlite/BottomNav";
import { MissionCard } from "@/src/components/parentzlite/missions/MissionCard";
import { NoxiBubble } from "@/src/components/parentzlite/NoxiBubble";
import { dailyMissions, type DailyMission } from "@/src/data/parentzlite";
import { useParentProgress } from "@/src/hooks/useParentProgress";
import styles from "./page.module.css";

export default function MissionsPage() {
  const { addXp, addSeed, incrementStreak, completeMission, isMissionCompleted } = useParentProgress();

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
        <span>Missions</span>
        <h1>Missions réelles</h1>
      </header>

      <NoxiBubble message="Une petite action réelle peut changer beaucoup de choses." mood="curious" />

      <section className={styles.list} aria-label="Missions réelles">
        {dailyMissions.map((mission) => (
          <MissionCard
            completed={isMissionCompleted(mission.id)}
            key={mission.id}
            mission={mission}
            onComplete={handleCompleteMission}
          />
        ))}
      </section>

      <BottomNav />
    </AppShell>
  );
}
