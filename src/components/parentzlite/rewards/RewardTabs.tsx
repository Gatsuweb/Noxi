"use client";

import { motion } from "motion/react";
import styles from "./RewardTabs.module.css";

export type RewardTab = "stickers" | "skins" | "emotions";

const tabs = [
  { id: "stickers", label: "Stickers" },
  { id: "skins", label: "Skins" },
  { id: "emotions", label: "Émotions" },
] satisfies Array<{ id: RewardTab; label: string }>;

type RewardTabsProps = {
  activeTab: RewardTab;
  onChange: (tab: RewardTab) => void;
};

export function RewardTabs({ activeTab, onChange }: RewardTabsProps) {
  return (
    <div className={styles.tabs} role="tablist" aria-label="Collections de récompenses">
      {tabs.map((tab) => (
        <motion.button
          aria-selected={activeTab === tab.id}
          className={`${styles.tab} ${activeTab === tab.id ? styles.active : ""}`}
          key={tab.id}
          onClick={() => onChange(tab.id)}
          role="tab"
          type="button"
          whileTap={{ scale: 0.96 }}
        >
          {tab.label}
        </motion.button>
      ))}
    </div>
  );
}
