import styles from "./ProgressStatCard.module.css";

type ProgressStatCardProps = {
  icon: string;
  label: string;
  value: string | number;
  suffix?: string;
};

export function ProgressStatCard({ icon, label, value, suffix }: ProgressStatCardProps) {
  return (
    <article className={styles.card}>
      <span className={styles.label}>{label}</span>
      <strong><span>{icon}</span>{value}</strong>
      {suffix ? <small>{suffix}</small> : null}
    </article>
  );
}
