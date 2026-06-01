"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { initialProgress, type ParentMoment, type ParentProgress } from "@/src/data/parentzlite";

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

function unlockReward(
  current: ParentProgress,
  key: "unlockedStickers" | "unlockedSkins" | "unlockedEmotions",
  id: string,
  cost: number,
): { progress: ParentProgress; unlocked: boolean } {
  if (current[key].includes(id)) {
    return { progress: current, unlocked: true };
  }

  if (current.seeds < cost) {
    return { progress: current, unlocked: false };
  }

  return {
    progress: {
      ...current,
      seeds: current.seeds - cost,
      [key]: [...current[key], id],
    },
    unlocked: true,
  };
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
    const timeout = window.setTimeout(() => {
      setProgress(readProgress());
      setHydrated(true);
    }, 0);

    return () => window.clearTimeout(timeout);
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
      completeMission(id: string) {
        updateProgress((current) => ({
          ...current,
          completedMissions: current.completedMissions.includes(id)
            ? current.completedMissions
            : [...current.completedMissions, id],
        }));
      },
      isMissionCompleted(id: string) {
        return progress.completedMissions.includes(id);
      },
      completeReading(id: string) {
        updateProgress((current) => ({
          ...current,
          completedReadings: current.completedReadings.includes(id)
            ? current.completedReadings
            : [...current.completedReadings, id],
        }));
      },
      isReadingCompleted(id: string) {
        return progress.completedReadings.includes(id);
      },
      addParentMoment(moment: ParentMoment) {
        updateProgress((current) => ({
          ...current,
          parentMoments: current.parentMoments.some((item) => item.id === moment.id)
            ? current.parentMoments
            : [moment, ...current.parentMoments],
        }));
      },
      unlockBadge(id: string) {
        updateProgress((current) => ({
          ...current,
          badges: current.badges.includes(id) ? current.badges : [...current.badges, id],
        }));
      },
      unlockSeedReward(id: string, cost: number) {
        const unlocked = progress.unlockedSeedRewards.includes(id) || progress.seeds >= cost;

        updateProgress((current) => {
          if (current.unlockedSeedRewards.includes(id) || current.seeds < cost) {
            return current;
          }

          return {
            ...current,
            seeds: current.seeds - cost,
            unlockedSeedRewards: [...current.unlockedSeedRewards, id],
          };
        });

        return unlocked;
      },
      buyStreakFreeze() {
        const unlocked = progress.seeds >= 5;

        updateProgress((current) => {
          if (current.seeds < 5) {
            return current;
          }

          return {
            ...current,
            seeds: current.seeds - 5,
            streakFreezes: current.streakFreezes + 1,
            unlockedSeedRewards: current.unlockedSeedRewards.includes("freeze-streak")
              ? current.unlockedSeedRewards
              : [...current.unlockedSeedRewards, "freeze-streak"],
          };
        });

        return unlocked;
      },
      unlockSticker(id: string, cost: number) {
        const unlocked = progress.unlockedStickers.includes(id) || progress.seeds >= cost;

        updateProgress((current) => {
          const next = unlockReward(current, "unlockedStickers", id, cost);
          return next.progress;
        });

        return unlocked;
      },
      unlockSkin(id: string, cost: number) {
        const unlocked = progress.unlockedSkins.includes(id) || progress.seeds >= cost;

        updateProgress((current) => {
          const next = unlockReward(current, "unlockedSkins", id, cost);
          return next.progress;
        });

        return unlocked;
      },
      unlockEmotion(id: string, cost: number) {
        const unlocked = progress.unlockedEmotions.includes(id) || progress.seeds >= cost;

        updateProgress((current) => {
          const next = unlockReward(current, "unlockedEmotions", id, cost);
          return next.progress;
        });

        return unlocked;
      },
      equipSkin(id: string) {
        updateProgress((current) => ({
          ...current,
          equippedSkin: current.unlockedSkins.includes(id) ? id : current.equippedSkin,
        }));
      },
      resetProgress() {
        setProgress(initialProgress);
      },
    }),
    [progress, updateProgress],
  );

  return { progress, hydrated, ...actions };
}
