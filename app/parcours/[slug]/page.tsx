"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { AppShell } from "@/src/components/parentzlite/AppShell";
import { SituationCard } from "@/src/components/parentzlite/SituationCard";
import { getPath, situations } from "@/src/data/parentzlite";
import { useParentProgress } from "@/src/hooks/useParentProgress";
import styles from "./page.module.css";

export default function PathDetailPage() {
  const params = useParams<{ slug: string }>();
  const path = getPath(params.slug);
  const { progress } = useParentProgress();

  if (!path) {
    return (
      <AppShell>
        <header className={styles.header}>
          <Link href="/parcours" aria-label="Retour">‹</Link>
          <h1>Parcours</h1>
        </header>
        <p>Observons ensemble un autre parcours.</p>
      </AppShell>
    );
  }

  const pathSituations = situations.filter((situation) => situation.pathSlug === path.slug);

  return (
    <AppShell>
      <header className={styles.header}>
        <Link href="/parcours" aria-label="Retour">‹</Link>
        <h1>{path.title}</h1>
        <Image src={path.image} alt="" width={56} height={56} />
      </header>
      <section className={styles.list}>
        {pathSituations.map((situation) => (
          <SituationCard
            completed={progress.completedSituations.includes(situation.id)}
            key={situation.id}
            situation={situation}
          />
        ))}
      </section>
    </AppShell>
  );
}
