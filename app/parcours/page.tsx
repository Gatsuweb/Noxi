"use client";

import { AppShell } from "@/src/components/parentzlite/AppShell";
import { BottomNav } from "@/src/components/parentzlite/BottomNav";
import { NoxiBubble } from "@/src/components/parentzlite/NoxiBubble";
import { PathCard } from "@/src/components/parentzlite/PathCard";
import { paths, situations } from "@/src/data/parentzlite";
import { useParentProgress } from "@/src/hooks/useParentProgress";
import styles from "./page.module.css";

export default function ParcoursPage() {
  const { progress } = useParentProgress();

  return (
    <AppShell withNav>
      <h1 className={styles.title}>Parcours</h1>
      <NoxiBubble message="Choisis un thème, on avance ensemble." mood="curious" />
      <section className={styles.list}>
        {paths.map((path) => {
          const completedCount = situations.filter(
            (situation) => situation.pathSlug === path.slug && progress.completedSituations.includes(situation.id),
          ).length;

          return <PathCard completedCount={completedCount} key={path.slug} path={path} layout="row" />;
        })}
      </section>
      <BottomNav />
    </AppShell>
  );
}
