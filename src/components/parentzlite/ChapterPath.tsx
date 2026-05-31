"use client";

import type { PathChapter, PathSlug } from "@/src/data/parentzlite";
import { ChapterNode } from "./ChapterNode";
import styles from "./ChapterPath.module.css";

type ChapterPathProps = {
  chapters: PathChapter[];
  pathSlug: PathSlug;
  firstSituationId?: string;
};

export function ChapterPath({ chapters, pathSlug, firstSituationId }: ChapterPathProps) {
  return (
    <section className={styles.path} aria-label="Chapitres du parcours">
      {chapters.map((chapter, index) => (
        <ChapterNode
          chapter={chapter}
          firstSituationId={firstSituationId}
          index={index}
          key={chapter.id}
          pathSlug={pathSlug}
        />
      ))}
    </section>
  );
}
