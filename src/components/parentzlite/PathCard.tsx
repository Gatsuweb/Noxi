"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import type { ParentPath } from "@/src/data/parentzlite";
import styles from "./PathCard.module.css";

type PathCardProps = {
  path: ParentPath;
  layout?: "grid" | "row";
};

export function PathCard({ path, layout = "grid" }: PathCardProps) {
  const progress = `${path.completed}/${path.total}`;

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} whileTap={{ scale: 0.98 }}>
      <Link className={`${styles.card} ${styles[layout]}`} href={`/parcours/${path.slug}`}>
        <span className={styles.imageWrap} style={{ backgroundColor: path.color }}>
          <Image src={path.image} alt="" width={76} height={76} />
        </span>
        <span className={styles.content}>
          <strong>{path.title}</strong>
          <span className={styles.progressLine}>
            <span className={styles.miniTrack}>
              <span style={{ width: `${(path.completed / path.total) * 100}%` }} />
            </span>
            <small>{progress}</small>
          </span>
        </span>
        {layout === "row" ? <span className={styles.chevron}>›</span> : null}
      </Link>
    </motion.div>
  );
}
