"use client";

import { motion } from "motion/react";
import Image from "next/image";
import type { RewardItem } from "@/src/data/parentzlite";
import styles from "./EquippedSkinCard.module.css";

type EquippedSkinCardProps = {
  skin?: RewardItem;
};

export function EquippedSkinCard({ skin }: EquippedSkinCardProps) {
  if (!skin) return null;

  return (
    <section className={styles.card}>
      <div>
        <span>Skin équipé</span>
        <h2>{skin.name}</h2>
        <p>{skin.description}</p>
      </div>
      <motion.div animate={{ y: [0, -7, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
        <Image src={skin.image} alt={skin.name} width={112} height={112} />
      </motion.div>
    </section>
  );
}
