import type { Badge } from "@/src/data/parentzlite";
import styles from "./BadgeCard.module.css";

type BadgeCardProps = {
  badge: Badge;
  unlocked: boolean;
};

export function BadgeCard({ badge, unlocked }: BadgeCardProps) {
  return (
    <article className={`${styles.card} ${unlocked ? styles[badge.tone] : styles.locked}`}>
      <span className={styles.medal}>{unlocked ? "🛡" : "♙"}</span>
      <strong>{badge.name}</strong>
    </article>
  );
}
