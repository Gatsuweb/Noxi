"use client";

import { motion } from "motion/react";
import Image from "next/image";
import styles from "./NoxiBubble.module.css";

type NoxiBubbleProps = {
  children?: React.ReactNode;
  image?: string;
  message?: string;
  mood?: "happy" | "thinking" | "proud" | "curious";
};

const moodImages = {
  happy: "/parentZlite/noxi-emotes/noxi-heureux.png",
  thinking: "/parentZlite/noxi-emotes/noxi-réfléchit.png",
  proud: "/parentZlite/noxi-emotes/noxi-fier.png",
  curious: "/parentZlite/noxi-emotes/noxi-curieux.png",
};

export function NoxiBubble({
  children,
  image,
  message,
  mood = "happy",
}: NoxiBubbleProps) {
  const bubbleMessage = message ?? children;
  const source = image ?? moodImages[mood] ?? "/parentZlite/noxi-emotes/noxi.png";

  return (
    <motion.section
      className={styles.bubble}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <motion.div
        className={styles.imageWrap}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image src={source} alt="" width={92} height={92} onError={(event) => {
          event.currentTarget.src = "/parentZlite/noxi-emotes/noxi.png";
        }} />
      </motion.div>
      <p>{bubbleMessage}</p>
    </motion.section>
  );
}
