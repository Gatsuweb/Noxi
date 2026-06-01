"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useRef } from "react";
import { AppShell } from "@/src/components/parentzlite/AppShell";
import { LevelCard } from "@/src/components/parentzlite/LevelCard";
import { NoxiBubble } from "@/src/components/parentzlite/NoxiBubble";
import { PrimaryButton } from "@/src/components/parentzlite/PrimaryButton";
import { RewardCard } from "@/src/components/parentzlite/RewardCard";
import { getSituation } from "@/src/data/parentzlite";
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
  const situation = useMemo(() => getSituation(situationId), [situationId]);
  const { progress, addXp, addSeed, addParentMoment, incrementStreak, completeSituation } = useParentProgress();
  const applied = useRef(false);

  useEffect(() => {
    if (applied.current) return;
    applied.current = true;

    addXp(20);
    addSeed(1);
    incrementStreak();
    completeSituation(situationId);
    addParentMoment({
      id: `situation-${situationId}`,
      title: situation?.title ?? "Situation terminee",
      category: situation?.label ?? "Situation",
      date: "Aujourd'hui",
      description: "Tu as pris le temps de reflechir avant d'agir.",
    });
  }, [addParentMoment, addSeed, addXp, completeSituation, incrementStreak, situation, situationId]);

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
        <p>Tu as ajoute un nouveau moment a ton journal.</p>
      </section>

      <section className={styles.rewards}>
        <h2>Ce que tu gagnes</h2>
        <div className={styles.rewardsGrid}>
          <RewardCard image="/parentZlite/collectibles/collectibles-etoile-xp.png" label="+20 XP" />
          <RewardCard image="/parentZlite/collectibles/collectibles-graine-de-renard.png" label="+1 graine" />
          <RewardCard image="/parentZlite/collectibles/collectibles-taniere.png" label="Moment enregistre" />
        </div>
      </section>

      <LevelCard compact level={progress.level} xp={progress.xp} maxXp={progress.maxXp} />

      <section className={styles.journalCard}>
        <span>Journal de parentalite</span>
        <strong>{situation?.title ?? "Situation terminee"}</strong>
        <p>Bravo, tu as pris le temps de reflechir avant d&apos;agir.</p>
      </section>

      <NoxiBubble message="Chaque petit pas compte. Tu construis des reperes avec ton enfant." mood="proud" />
      <PrimaryButton href="/home">Continuer</PrimaryButton>
    </AppShell>
  );
}
