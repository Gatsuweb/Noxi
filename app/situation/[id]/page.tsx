"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { AppShell } from "@/src/components/parentzlite/AppShell";
import { ChoiceButton } from "@/src/components/parentzlite/ChoiceButton";
import { NoxiBubble } from "@/src/components/parentzlite/NoxiBubble";
import { PrimaryButton } from "@/src/components/parentzlite/PrimaryButton";
import { XpBar } from "@/src/components/parentzlite/XpBar";
import { getPath, getSituation } from "@/src/data/parentzlite";
import styles from "./page.module.css";

export default function SituationPage() {
  const params = useParams<{ id: string }>();
  const situation = getSituation(params.id);
  const [selected, setSelected] = useState<number | null>(null);
  const [validated, setValidated] = useState(false);

  if (!situation) {
    return (
      <AppShell>
        <header className={styles.header}>
          <Link href="/home" aria-label="Retour">‹</Link>
          <div>
            <strong>Situation</strong>
            <XpBar value={0} max={100} tone="green" />
          </div>
        </header>
        <p>Observons ensemble une autre situation.</p>
      </AppShell>
    );
  }

  const path = getPath(situation.pathSlug);

  return (
    <AppShell>
      <header className={styles.header}>
        <Link href={`/parcours/${situation.pathSlug}`} aria-label="Retour">‹</Link>
        <div>
          <strong>Situation 2/10</strong>
          <XpBar value={40} max={100} tone="green" />
        </div>
        <span>💗 3</span>
      </header>

      <section className={styles.card}>
        <Image src={situation.image} alt="" width={360} height={220} priority />
        <span className={styles.tag}>{path?.title}</span>
        <p>{situation.text}</p>
      </section>

      <NoxiBubble message="Prends ton temps, observons ensemble." mood="thinking" />

      <section className={styles.choices}>
        <h1>Que faites-vous ?</h1>
        {situation.choices.map((choice, index) => (
          <ChoiceButton
            index={index}
            key={choice}
            onSelect={() => setSelected(index)}
            selected={selected === index}
            text={choice}
          />
        ))}
      </section>

      <AnimatePresence>
        {validated ? (
          <motion.section
            className={styles.feedback}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <Image src="/parentZlite/rewards/emotions/emotion-encourageant.png" alt="" width={64} height={64} />
            <div>
              <strong>Cette reaction est comprehensible.</strong>
              <p>Cette approche peut aider a garder un repere clair. Chaque petit pas compte.</p>
            </div>
          </motion.section>
        ) : null}
      </AnimatePresence>

      {validated ? (
        <PrimaryButton href={`/success?situation=${situation.id}`}>Continuer</PrimaryButton>
      ) : (
        <PrimaryButton disabled={selected === null} onClick={() => setValidated(true)}>
          Valider ma reponse
        </PrimaryButton>
      )}
    </AppShell>
  );
}
