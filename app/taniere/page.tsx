"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AppShell } from "@/src/components/parentzlite/AppShell";
import { BottomNav } from "@/src/components/parentzlite/BottomNav";
import { NoxiBubble } from "@/src/components/parentzlite/NoxiBubble";
import { CollectionProgress } from "@/src/components/parentzlite/rewards/CollectionProgress";
import { EquippedSkinCard } from "@/src/components/parentzlite/rewards/EquippedSkinCard";
import { RewardItemCard } from "@/src/components/parentzlite/rewards/RewardItemCard";
import { RewardTabs, type RewardTab } from "@/src/components/parentzlite/rewards/RewardTabs";
import { SeedsCounter } from "@/src/components/parentzlite/rewards/SeedsCounter";
import { noxiEmotions, noxiSkins, stickers } from "@/src/data/parentzlite";
import { useParentProgress } from "@/src/hooks/useParentProgress";
import styles from "./page.module.css";

const tabContent = {
  stickers: {
    items: stickers,
    type: "sticker",
    unlockedKey: "unlockedStickers",
  },
  skins: {
    items: noxiSkins,
    type: "skin",
    unlockedKey: "unlockedSkins",
  },
  emotions: {
    items: noxiEmotions,
    type: "emotion",
    unlockedKey: "unlockedEmotions",
  },
} as const;

export default function TanierePage() {
  const [activeTab, setActiveTab] = useState<RewardTab>("stickers");
  const [feedback, setFeedback] = useState("Chaque petit pas compte. Ta Tanière grandit avec tes progrès.");
  const { progress, unlockSticker, unlockSkin, unlockEmotion, equipSkin } = useParentProgress();

  const equippedSkin = useMemo(
    () => noxiSkins.find((skin) => skin.id === progress.equippedSkin) ?? noxiSkins[0],
    [progress.equippedSkin],
  );

  const totalRewards = stickers.length + noxiSkins.length + noxiEmotions.length;
  const unlockedRewards =
    progress.unlockedStickers.length + progress.unlockedSkins.length + progress.unlockedEmotions.length;
  const currentTab = tabContent[activeTab];
  const currentUnlocked = progress[currentTab.unlockedKey];

  function handleUnlock(id: string, cost: number) {
    const unlocked =
      activeTab === "stickers"
        ? unlockSticker(id, cost)
        : activeTab === "skins"
          ? unlockSkin(id, cost)
          : unlockEmotion(id, cost);

    setFeedback(
      unlocked
        ? "Récompense débloquée ! Noxi grandit avec toi."
        : "Encore quelques missions et tu pourras le débloquer.",
    );
  }

  function handleEquip(id: string) {
    equipSkin(id);
    setFeedback("Noxi est prêt avec ce nouveau look.");
  }

  return (
    <AppShell withNav>
      <header className={styles.header}>
        <Link className={styles.backLink} href="/home" aria-label="Retour à l'accueil">
          ←
        </Link>
        <div>
          <span>Tanière de Noxi</span>
          <h1>Tanière</h1>
        </div>
        <SeedsCounter seeds={progress.seeds} />
      </header>

      <motion.section
        className={styles.noxiMessage}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p>{feedback}</p>
      </motion.section>
      <NoxiBubble message="Ici, tes petits pas deviennent des souvenirs avec Noxi." mood="happy" />

      <EquippedSkinCard skin={equippedSkin} />
      <CollectionProgress unlocked={unlockedRewards} total={totalRewards} />
      <RewardTabs activeTab={activeTab} onChange={setActiveTab} />

      <section className={styles.grid} aria-label="Récompenses">
        {currentTab.items.map((item) => (
          <RewardItemCard
            equipped={activeTab === "skins" && progress.equippedSkin === item.id}
            item={item}
            key={item.id}
            onEquip={() => handleEquip(item.id)}
            onUnlock={() => handleUnlock(item.id, item.cost)}
            seeds={progress.seeds}
            type={currentTab.type}
            unlocked={currentUnlocked.includes(item.id)}
          />
        ))}
      </section>

      <BottomNav />
    </AppShell>
  );
}
