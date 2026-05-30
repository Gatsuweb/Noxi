"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { initialProgress, type ParentProgress } from "@/src/data/parentzlite";

const STORAGE_KEY = "parentzlite-progress";

function normalizeProgress(progress: ParentProgress): ParentProgress {
  let next = { ...progress };

  while (next.xp >= next.maxXp) {
    next = {
      ...next,
      level: next.level + 1,
      xp: next.xp - next.maxXp,
      maxXp: next.maxXp + 100,
    };
  }

  return next;
}

function readProgress(): ParentProgress {
  if (typeof window === "undefined") {
    return initialProgress;
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return initialProgress;
  }

  try {
    return { ...initialProgress, ...JSON.parse(stored) };
  } catch {
    return initialProgress;
  }
}

export function useParentProgress() {
  const [progress, setProgress] = useState<ParentProgress>(initialProgress);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setProgress(readProgress());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }
  }, [hydrated, progress]);

  const updateProgress = useCallback((updater: (current: ParentProgress) => ParentProgress) => {
    setProgress((current) => normalizeProgress(updater(current)));
  }, []);

  const actions = useMemo(
    () => ({
      addXp(amount: number) {
        updateProgress((current) => ({ ...current, xp: current.xp + amount }));
      },
      addSeed(amount: number) {
        updateProgress((current) => ({ ...current, seeds: current.seeds + amount }));
      },
      incrementStreak() {
        updateProgress((current) => ({ ...current, streak: current.streak + 1 }));
      },
      completeSituation(id: string) {
        updateProgress((current) => ({
          ...current,
          completedSituations: current.completedSituations.includes(id)
            ? current.completedSituations
            : [...current.completedSituations, id],
        }));
      },
      unlockBadge(id: string) {
        updateProgress((current) => ({
          ...current,
          badges: current.badges.includes(id) ? current.badges : [...current.badges, id],
        }));
      },
      resetProgress() {
        setProgress(initialProgress);
      },
    }),
    [updateProgress],
  );

  return { progress, hydrated, ...actions };
}
