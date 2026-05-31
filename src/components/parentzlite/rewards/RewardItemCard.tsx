"use client";

import { motion } from "motion/react";
import Image from "next/image";
import type { RewardItem } from "@/src/data/parentzlite";
import styles from "./RewardItemCard.module.css";

type RewardItemCardProps = {
  item: RewardItem;
  seeds: number;
  unlocked: boolean;
  equipped?: boolean;
  type: "sticker" | "skin" | "emotion";
  onUnlock: () => void;
  onEquip?: () => void;
};

export function RewardItemCard({ item, seeds, unlocked, equipped = false, type, onUnlock, onEquip }: RewardItemCardProps) {
  const remainingSeeds = Math.max(item.cost - seeds, 0);
  const canUnlock = !unlocked && remainingSeeds === 0;
  const status = equipped ? "Équipé" : unlocked ? "Débloqué" : `${item.cost} graines`;
  const buttonLabel = unlocked
    ? type === "skin" && !equipped
      ? "Équiper"
      : status
    : canUnlock
      ? "Débloquer"
      : `Encore ${remainingSeeds} graines`;

  return (
    <motion.article
      className={`${styles.card} ${unlocked ? styles.unlocked : styles.locked}`}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
    >
      <div className={styles.imageWrap}>
        <Image src={item.image} alt={item.name} width={116} height={116} />
      </div>
      <div className={styles.content}>
        <div className={styles.heading}>
          <h3>{item.name}</h3>
          <span>{status}</span>
        </div>
        <p>{item.description}</p>
      </div>
      <motion.button
        className={`${styles.button} ${equipped ? styles.equipped : ""}`}
        disabled={(unlocked && (type !== "skin" || equipped)) || (!unlocked && !canUnlock)}
        onClick={unlocked ? onEquip : onUnlock}
        type="button"
        whileTap={{ scale: unlocked && type !== "skin" ? 1 : 0.97 }}
      >
        {buttonLabel}
      </motion.button>
    </motion.article>
  );
}
