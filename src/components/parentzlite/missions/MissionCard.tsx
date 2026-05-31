"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import type { DailyMission } from "@/src/data/parentzlite";
import { PrimaryButton } from "../PrimaryButton";
import styles from "./MissionCard.module.css";

type MissionCardProps = {
  mission: DailyMission;
  completed: boolean;
  onComplete: (mission: DailyMission) => boolean;
  featured?: boolean;
};

export function MissionCard({ mission, completed, onComplete, featured = false }: MissionCardProps) {
  const [celebrating, setCelebrating] = useState(false);
  const [locallyCompleted, setLocallyCompleted] = useState(false);
  const [message, setMessage] = useState(mission.noxiMessage);
  const isCompleted = completed || locallyCompleted;

  function handleComplete() {
    if (isCompleted) {
      setMessage("Mission réalisée aujourd'hui");
      return;
    }

    const rewarded = onComplete(mission);

    if (rewarded) {
      setLocallyCompleted(true);
      setCelebrating(true);
      setMessage("Bravo ! Tu viens de faire un petit pas concret avec ton enfant.");
      window.setTimeout(() => setCelebrating(false), 1600);
      return;
    }

    setMessage("Mission réalisée aujourd'hui");
  }

  return (
    <motion.article
      className={`${styles.card} ${featured ? styles.featured : ""} ${isCompleted ? styles.completed : ""}`}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: completed ? 1 : 0.99 }}
    >
      <div className={styles.top}>
        <span>{mission.category}</span>
        <small>{mission.duration}</small>
      </div>

      <div className={styles.body}>
        <div>
          <h2>{mission.title}</h2>
          <p>{mission.description}</p>
        </div>
        <Image src="/parentZlite/collectibles/collectibles-graine-de-renard.png" alt="" width={58} height={58} />
      </div>

      <div className={styles.noxiNote}>
        <Image src="/parentZlite/noxi-emotes/noxi-encourage.png" alt="" width={44} height={44} />
        <p>{message}</p>
      </div>

      <div className={styles.rewardLine}>
        <strong>+{mission.rewardXp} XP</strong>
        <strong>+{mission.rewardSeeds} graine</strong>
      </div>

      <AnimatePresence>
        {celebrating ? (
          <motion.div
            className={styles.rewardPop}
            initial={{ opacity: 0, scale: 0.75, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            +{mission.rewardXp} XP · +{mission.rewardSeeds} graine
          </motion.div>
        ) : null}
      </AnimatePresence>

      <PrimaryButton disabled={isCompleted} onClick={handleComplete} variant={isCompleted ? "green" : "primary"}>
        {isCompleted ? "Mission réalisée aujourd'hui" : "Mission réalisée"}
      </PrimaryButton>
    </motion.article>
  );
}
