"use client";

import { motion } from "motion/react";
import Link from "next/link";
import type { PathChapter, PathSlug } from "@/src/data/parentzlite";
import styles from "./ChapterNode.module.css";

type ChapterNodeProps = {
  chapter: PathChapter;
  pathSlug: PathSlug;
  index: number;
  firstSituationId?: string;
};

export function ChapterNode({ chapter, pathSlug, index, firstSituationId }: ChapterNodeProps) {
  const currentHref = firstSituationId ? `/situation/${firstSituationId}` : `/parcours/${pathSlug}`;
  const statusLabel =
    chapter.status === "completed" ? "Réalisé" : chapter.status === "current" ? "En cours" : "Bientôt";

  return (
    <motion.article
      className={`${styles.node} ${styles[chapter.status]} ${index % 2 === 1 ? styles.offset : ""}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
    >
      <span className={styles.dot}>{chapter.status === "locked" ? "🔒" : index + 1}</span>
      <div className={styles.card}>
        <small>{statusLabel}</small>
        <h2>{chapter.title}</h2>
        <p>{chapter.description}</p>
        {chapter.status === "current" ? (
          <motion.div whileTap={{ scale: 0.97 }}>
            <Link className={styles.button} href={currentHref}>
              Continuer
            </Link>
          </motion.div>
        ) : null}
      </div>
    </motion.article>
  );
}
