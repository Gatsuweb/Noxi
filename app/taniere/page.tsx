"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AppShell } from "@/src/components/parentzlite/AppShell";
import { BottomNav } from "@/src/components/parentzlite/BottomNav";
import { parentSkills, parentTitles, seedRewards } from "@/src/data/parentzlite";
import { useParentProgress } from "@/src/hooks/useParentProgress";
import styles from "./page.module.css";

const streakDays = ["L", "M", "M", "J", "V", "S", "D"];

function getTitleUnlocked(id: string, progress: ReturnType<typeof useParentProgress>["progress"]) {
  if (id === "gardien-calme-7") {
    return progress.streak >= 7;
  }

  if (id === "parent-curieux") {
    return progress.completedReadings.length >= 5;
  }

  if (id === "parent-actif") {
    return progress.completedMissions.length >= 10;
  }

  if (id === "guide-emotions") {
    return progress.completedSituations.includes("emotions-1");
  }

  return false;
}

export default function TanierePage() {
  const { progress, buyStreakFreeze, unlockSeedReward } = useParentProgress();
  const [feedback, setFeedback] = useState("Chaque petit pas compte. Ici, tu vois ce que tu construis.");

  const unlockedTitles = useMemo(
    () => parentTitles.filter((title) => getTitleUnlocked(title.id, progress)).length,
    [progress],
  );
  const streakPreview = useMemo(
    () =>
      streakDays.map((label, index) => {
        const visibleCount = Math.min(progress.streak, streakDays.length);
        return {
          label,
          active: index < visibleCount,
          current: visibleCount > 0 && index === visibleCount - 1,
        };
      }),
    [progress.streak],
  );
  const summaryItems = useMemo(
    () => [
      { value: progress.completedMissions.length, label: "missions realisees" },
      { value: progress.completedSituations.length, label: "situations terminees" },
      { value: progress.badges.length, label: "badges obtenus" },
      { value: progress.completedReadings.length, label: "lectures comprises" },
      { value: progress.seeds, label: "graines disponibles" },
    ],
    [progress.badges.length, progress.completedMissions.length, progress.completedReadings.length, progress.completedSituations.length, progress.seeds],
  );

  function handleSeedReward(id: string, cost: number, type: string) {
    const unlocked = type === "streak" ? buyStreakFreeze() : unlockSeedReward(id, cost);

    setFeedback(
      unlocked
        ? type === "streak"
          ? "Protection de serie ajoutee."
          : "Contenu debloque. Tu pourras l'utiliser dans une prochaine situation."
        : "Encore quelques missions et tu pourras le debloquer.",
    );
  }

  return (
    <AppShell withNav>
      <header className={styles.header}>
        <Link className={styles.backLink} href="/home" aria-label="Retour a l'accueil">
          <span aria-hidden="true">{"<"}</span>
        </Link>
        <div>
          <span>Journal</span>
          <h1>Journal de parentalite</h1>
          <p>Un espace pour retrouver tes progres concrets.</p>
        </div>
      </header>

      <motion.section className={styles.hero} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className={styles.heroContent}>
          <span className={styles.heroEyebrow}>Serie actuelle</span>
          <div className={styles.heroMain}>
            <strong>{progress.streak}</strong>
            <div>
              <h2>jours de serie</h2>
              <p>{feedback}</p>
            </div>
          </div>
          <div className={styles.streakRow} aria-label="Progression sur 7 jours">
            {streakPreview.map((day, index) => (
              <span
                className={`${styles.streakDay} ${day.active ? styles.streakDayActive : ""} ${
                  day.current ? styles.streakDayCurrent : ""
                }`.trim()}
                key={`${day.label}-${index}`}
              >
                {day.label}
              </span>
            ))}
          </div>
        </div>
        <div className={styles.heroWitness}>
          <Image src="/parentZlite/rewards/emotions/emotion-encourageant.png" alt="Noxi heureux" width={96} height={118} priority />
        </div>
      </motion.section>

      <section className={styles.summary} aria-label="Resume personnel">
        {summaryItems.map((item) => (
          <article key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </article>
        ))}
      </section>

      <section className={styles.section}>
        <div className={styles.sectionTitle}>
          <span>Progression parent</span>
          <h2>Competences developpees</h2>
        </div>
        <div className={styles.skillGrid}>
          {parentSkills.map((skill) => (
            <article className={styles.skill} key={skill.id}>
              <div className={styles.skillHeader}>
                <strong>{skill.name}</strong>
                <span>{skill.progress}%</span>
              </div>
              <div className={styles.skillTrack}>
                <motion.span initial={{ width: 0 }} animate={{ width: `${skill.progress}%` }} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionTitle}>
          <span>{unlockedTitles} / {parentTitles.length}</span>
          <h2>Titres gagnes</h2>
        </div>
        <div className={styles.titleRail}>
          {parentTitles.map((title) => {
            const unlocked = getTitleUnlocked(title.id, progress);

            return (
              <article className={`${styles.titleCard} ${unlocked ? styles.unlocked : styles.locked}`} key={title.id}>
                <strong>{title.title}</strong>
                <p>{title.description}</p>
                <span>{unlocked ? "Debloque" : "En chemin"}</span>
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionTitle}>
          <span>{progress.parentMoments.length} moments</span>
          <h2>Moments enregistres</h2>
        </div>
        <div className={styles.unifiedCard}>
          {progress.parentMoments.slice(0, 5).map((moment) => (
            <article className={styles.momentRow} key={moment.id}>
              <div className={styles.momentMeta}>
                <span>{moment.category}</span>
                <small>{moment.date}</small>
              </div>
              <strong>{moment.title}</strong>
              <p>{moment.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionTitle}>
          <span>{progress.seeds} graines disponibles</span>
          <h2>Mes graines</h2>
        </div>
        <div className={`${styles.unifiedCard} ${styles.seedPanel}`}>
          <div className={styles.seedIntro}>
            <strong>{progress.seeds} graines disponibles</strong>
            <p>A depenser sur des contenus utiles</p>
          </div>
          {seedRewards.map((reward) => {
            const unlocked = progress.unlockedSeedRewards.includes(reward.id);

            return (
              <article className={styles.seedRow} key={reward.id}>
                <div className={styles.seedContent}>
                  <span>{reward.type}</span>
                  <strong>{reward.name}</strong>
                  <p>{reward.description}</p>
                </div>
                <button disabled={unlocked} onClick={() => handleSeedReward(reward.id, reward.cost, reward.type)} type="button">
                  {unlocked ? (
                    "Debloque"
                  ) : (
                    <>
                      <span>{reward.cost}</span>
                      <Image
                        src="/parentZlite/collectibles/collectibles-graine-de-renard.png"
                        alt=""
                        width={18}
                        height={18}
                        aria-hidden="true"
                      />
                    </>
                  )}
                </button>
              </article>
            );
          })}
        </div>
      </section>

      <BottomNav />
    </AppShell>
  );
}
