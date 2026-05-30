"use client";

import { motion } from "motion/react";
import Image from "next/image";
import styles from "./RewardCard.module.css";

type RewardCardProps = {
  image: string;
  label: string;
};

export function RewardCard({ image, label }: RewardCardProps) {
  return (
    <motion.div className={styles.card} initial={{ scale: 0.84, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
      <Image src={image} alt="" width={88} height={88} />
      <strong>{label}</strong>
    </motion.div>
  );
}
