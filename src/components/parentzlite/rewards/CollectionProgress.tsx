"use client";

import { motion } from "motion/react";
import styles from "./CollectionProgress.module.css";

type CollectionProgressProps = {
  unlocked: number;
  total: number;
};

export function CollectionProgress({ unlocked, total }: CollectionProgressProps) {
  const percent = total > 0 ? Math.round((unlocked / total) * 100) : 0;

  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <div>
          <span>Collection</span>
          <strong>
            {unlocked} / {total} débloqués
          </strong>
        </div>
        <em>{percent}%</em>
      </div>
      <div className={styles.track} aria-hidden="true">
        <motion.div
          className={styles.fill}
          animate={{ width: `${percent}%` }}
          initial={{ width: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </section>
  );
}
