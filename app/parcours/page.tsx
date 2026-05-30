import { AppShell } from "@/src/components/parentzlite/AppShell";
import { BottomNav } from "@/src/components/parentzlite/BottomNav";
import { PathCard } from "@/src/components/parentzlite/PathCard";
import { paths } from "@/src/data/parentzlite";
import styles from "./page.module.css";

export default function ParcoursPage() {
  return (
    <AppShell withNav>
      <h1 className={styles.title}>Parcours</h1>
      <section className={styles.list}>
        {paths.map((path) => (
          <PathCard key={path.slug} path={path} layout="row" />
        ))}
      </section>
      <BottomNav />
    </AppShell>
  );
}
