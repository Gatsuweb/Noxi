"use client";

import type { DailyMission } from "@/src/data/parentzlite";
import { MissionCard } from "./MissionCard";
import styles from "./DailyMissionCard.module.css";

type DailyMissionCardProps = {
  mission: DailyMission;
  completed: boolean;
  onComplete: (mission: DailyMission) => boolean;
};

export function DailyMissionCard({ mission, completed, onComplete }: DailyMissionCardProps) {
  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <span>Mission du jour</span>
        <strong>Une action réelle, courte et douce</strong>
      </div>
      <MissionCard completed={completed} featured mission={mission} onComplete={onComplete} />
    </section>
  );
}
