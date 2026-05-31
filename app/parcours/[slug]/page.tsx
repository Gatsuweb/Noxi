"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { AppShell } from "@/src/components/parentzlite/AppShell";
import { ChapterPath } from "@/src/components/parentzlite/ChapterPath";
import { NoxiBubble } from "@/src/components/parentzlite/NoxiBubble";
import { SituationCard } from "@/src/components/parentzlite/SituationCard";
import { getPath, pathChapters, situations } from "@/src/data/parentzlite";
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
        <div>
          <h1>{path.name}</h1>
          <p>{path.description}</p>
        </div>
        <Image src={path.image} alt="" width={64} height={64} />
      </header>

      <NoxiBubble message="Chaque chapitre t'aide à progresser doucement." mood="thinking" />

      <ChapterPath chapters={pathChapters[path.slug]} firstSituationId={pathSituations[0]?.id} pathSlug={path.slug} />

      <section className={styles.sectionHeader}>
        <h2>Situations du parcours</h2>
      </section>
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
