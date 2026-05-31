"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { XpBar } from "./XpBar";
import styles from "./LevelCard.module.css";

type LevelCardProps = {
  level: number;
  xp: number;
  maxXp: number;
  compact?: boolean;
};

export function LevelCard({ level, xp, maxXp, compact = false }: LevelCardProps) {
  return (
    <motion.section
      className={`${styles.card} ${compact ? styles.compact : ""}`}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <div>
        <p className={styles.level}>Niveau {level}</p>
        <h2>Parent Explorateur</h2>
        <XpBar value={xp} max={maxXp} />
        <strong>{xp} / {maxXp} XP</strong>
      </div>
      <Image className={styles.noxi} src="/parentZlite/rewards/emotions/emotion-heureux.png" alt="" width={118} height={118} />
    </motion.section>
  );
}
