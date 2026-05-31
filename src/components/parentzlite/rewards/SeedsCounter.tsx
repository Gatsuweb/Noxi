"use client";

import { motion } from "motion/react";
import Image from "next/image";
import styles from "./SeedsCounter.module.css";

type SeedsCounterProps = {
  seeds: number;
};

export function SeedsCounter({ seeds }: SeedsCounterProps) {
  return (
    <motion.div className={styles.counter} initial={{ scale: 0.94 }} animate={{ scale: 1 }}>
      <Image src="/parentZlite/collectibles/collectibles-graine-de-renard.png" alt="" width={34} height={34} />
      <div>
        <span>Graines</span>
        <strong>{seeds}</strong>
      </div>
    </motion.div>
  );
}
