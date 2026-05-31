"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import type { ParentPath } from "@/src/data/parentzlite";
import styles from "./PathCard.module.css";

type PathCardProps = {
  path: ParentPath;
  layout?: "grid" | "row";
  completedCount?: number;
};

const colorClass = {
  pink: styles.pink,
  blue: styles.blue,
  purple: styles.purple,
  yellow: styles.yellow,
  green: styles.green,
} as const;

function getStatus(percent: number) {
  if (percent === 0) return "Nouveau";
  if (percent >= 80) return "Presque terminé";
  return "Commencé";
}

export function PathCard({ path, layout = "grid", completedCount }: PathCardProps) {
  const completed = completedCount ?? path.completed;
  const total = path.totalSituations ?? path.total;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
  const progress = `${completed}/${total}`;
  const color = colorClass[path.color as keyof typeof colorClass] ?? styles.purple;

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} whileTap={{ scale: 0.98 }}>
      <Link className={`${styles.card} ${styles[layout]}`} href={`/parcours/${path.slug}`}>
        <span className={`${styles.imageWrap} ${color}`}>
          <Image src={path.image} alt="" width={76} height={76} />
        </span>
        <span className={styles.content}>
          <span className={styles.status}>{getStatus(percent)}</span>
          <strong>{path.name}</strong>
          {layout === "row" ? <em>{path.description}</em> : null}
          <span className={styles.progressLine}>
            <span className={styles.miniTrack}>
              <span style={{ width: `${percent}%` }} />
            </span>
            <small>{progress}</small>
          </span>
          {layout === "row" ? <span className={styles.cta}>Continuer</span> : null}
        </span>
        {layout === "row" ? <span className={styles.chevron}>›</span> : null}
      </Link>
    </motion.div>
  );
}
