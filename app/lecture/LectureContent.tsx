"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { AppShell } from "@/src/components/parentzlite/AppShell";
import { BottomNav } from "@/src/components/parentzlite/BottomNav";
import { NoxiBubble } from "@/src/components/parentzlite/NoxiBubble";
import { PrimaryButton } from "@/src/components/parentzlite/PrimaryButton";
import { readingCards } from "@/src/data/parentzlite";
import { useParentProgress } from "@/src/hooks/useParentProgress";
import styles from "./page.module.css";

export function LectureContent() {
  const { addXp, addParentMoment, completeReading, isReadingCompleted } = useParentProgress();

  function handleUnderstand(cardId: string) {
    if (isReadingCompleted(cardId)) {
      return;
    }

    const card = readingCards.find((item) => item.id === cardId);
    addXp(5);
    completeReading(cardId);

    if (card) {
      addParentMoment({
        id: `reading-${card.id}`,
        title: card.title,
        category: card.category,
        date: "Aujourd'hui",
        description: `Tu as pris ${card.readingTime} pour explorer une idee utile.`,
      });
    }
  }

  return (
    <AppShell withNav>
      <header className={styles.header}>
        <div>
          <span>Comprendre</span>
          <h1>Petites lectures pour avancer</h1>
          <p>Noxi t&apos;accompagne avec des idees courtes a tester dans la vraie vie.</p>
        </div>
        <motion.div >
          <Image src="/parentZlite/rewards/emotions/emotion-curieux.png" alt="" width={96} height={96} priority />
        </motion.div>
      </header>

      {/* <NoxiBubble message="Quelques minutes pour mieux comprendre." mood="curious" /> */}

      <section className={styles.cards} aria-label="Cartes de lecture">
        {readingCards.map((card, index) => {
          const understood = isReadingCompleted(card.id);

          return (
            <motion.article
              animate={{ opacity: 1, y: 0 }}
              className={styles.card}
              initial={{ opacity: 0, y: 14 }}
              key={card.id}
              transition={{ delay: index * 0.06 }}
            >
              <div className={styles.cardTop}>
                <span>{card.category}</span>
                <small>{card.readingTime}</small>
              </div>
              <h2>{card.title}</h2>
              <p>{card.summary}</p>

              <div className={styles.note}>
                <strong>A retenir</strong>
                <p>{card.takeaway}</p>
              </div>

              <div className={styles.action}>
                <strong>Mini-action</strong>
                <p>{card.action}</p>
              </div>

              <PrimaryButton disabled={understood} onClick={() => handleUnderstand(card.id)} variant={understood ? "green" : "primary"}>
                {understood ? "+5 XP ajoutes" : "J'ai compris"}
              </PrimaryButton>
            </motion.article>
          );
        })}
      </section>

      <BottomNav />
    </AppShell>
  );
}
