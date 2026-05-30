"use client";

import { motion } from "motion/react";
import styles from "./ChoiceButton.module.css";

type ChoiceButtonProps = {
  index: number;
  text: string;
  selected: boolean;
  onSelect: () => void;
};

const letters = ["A", "B", "C"];

export function ChoiceButton({ index, text, selected, onSelect }: ChoiceButtonProps) {
  return (
    <motion.button
      className={`${styles.choice} ${selected ? styles.selected : ""}`}
      onClick={onSelect}
      type="button"
      whileTap={{ scale: 0.98 }}
    >
      <span className={styles.letter}>{letters[index]}</span>
      <span>{text}</span>
      <span className={styles.heart}>♡</span>
    </motion.button>
  );
}
