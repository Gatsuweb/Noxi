"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";
import { AppShell } from "@/src/components/parentzlite/AppShell";
import { LevelCard } from "@/src/components/parentzlite/LevelCard";
import { PrimaryButton } from "@/src/components/parentzlite/PrimaryButton";
import { RewardCard } from "@/src/components/parentzlite/RewardCard";
import { useParentProgress } from "@/src/hooks/useParentProgress";
import styles from "./page.module.css";

export default function SuccessPage() {
  return (
    <Suspense fallback={null}>
      <SuccessContent />
    </Suspense>
  );
}

function SuccessContent() {
  const params = useSearchParams();
  const situationId = params.get("situation") ?? "ecrans-1";
  const { progress, addXp, addSeed, incrementStreak, completeSituation } = useParentProgress();
  const applied = useRef(false);

  useEffect(() => {
    if (applied.current) return;
    applied.current = true;
    addXp(20);
    addSeed(1);
    incrementStreak();
    completeSituation(situationId);
  }, [addSeed, addXp, completeSituation, incrementStreak, situationId]);

  return (
    <AppShell>
      <section className={styles.success}>
        <div className={styles.confetti} />
        <motion.div
          className={styles.hero}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image src="/parentZlite/noxi-illustrations/noxi-recompenses.png" alt="" width={320} height={260} priority />
        </motion.div>
        <h1>Bravo !</h1>
        <p>Tu as bien gere cette situation.</p>
        <motion.strong className={styles.xp} initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
          + 20 XP
        </motion.strong>
      </section>

      <LevelCard compact level={progress.level} xp={progress.xp} maxXp={progress.maxXp} />

      <section className={styles.rewards}>
        <h2>Recompenses</h2>
        <div className={styles.rewardsGrid}>
          <RewardCard image="/parentZlite/collectibles/collectibles-etoile-xp.png" label="+20 XP" />
          <RewardCard image="/parentZlite/collectibles/collectibles-graine-de-renard.png" label="+1 Graine" />
          <RewardCard image="/parentZlite/collectibles/collectibles-taniere.png" label="Streak +1" />
        </div>
      </section>

      <PrimaryButton href="/home">Continuer</PrimaryButton>
    </AppShell>
  );
}
