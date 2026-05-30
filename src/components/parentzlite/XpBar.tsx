"use client";

import { motion } from "motion/react";
import styles from "./XpBar.module.css";

type XpBarProps = {
  value: number;
  max: number;
  tone?: "yellow" | "green";
};

export function XpBar({ value, max, tone = "yellow" }: XpBarProps) {
  const percent = Math.min(100, Math.round((value / max) * 100));

  return (
    <div className={styles.track} aria-label={`${value} XP sur ${max}`}>
      <motion.div
        className={`${styles.fill} ${styles[tone]}`}
        initial={{ width: 0 }}
        animate={{ width: `${percent}%` }}
        transition={{ duration: 0.75, ease: "easeOut" }}
      />
    </div>
  );
}
