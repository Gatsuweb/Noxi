"use client";

import { motion } from "motion/react";
import Link from "next/link";
import type { Situation } from "@/src/data/parentzlite";
import styles from "./SituationCard.module.css";

type SituationCardProps = {
  situation: Situation;
  completed?: boolean;
};

export function SituationCard({ situation, completed = false }: SituationCardProps) {
  const content = (
    <>
      <span className={styles.order}>{situation.order}</span>
      <strong>{situation.title}</strong>
      <span className={styles.status}>{situation.unlocked ? (completed ? "★" : "›") : "🔒"}</span>
    </>
  );

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} whileTap={{ scale: situation.unlocked ? 0.98 : 1 }}>
      {situation.unlocked ? (
        <Link className={`${styles.card} ${completed ? styles.completed : ""}`} href={`/situation/${situation.id}`}>
          {content}
        </Link>
      ) : (
        <div className={`${styles.card} ${styles.locked}`}>{content}</div>
      )}
    </motion.div>
  );
}
