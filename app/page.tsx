import Image from "next/image";
import Link from "next/link";
import { AppShell } from "@/src/components/parentzlite/AppShell";
import { PrimaryButton } from "@/src/components/parentzlite/PrimaryButton";
import styles from "./page.module.css";

export default function Home() {
  return (
    <AppShell>
      <section className={styles.onboarding}>
        <div className={styles.brand}>
          <h1>
            Parent<span>Zlite</span>
          </h1>
          <p>Apprendre. Comprendre. Grandir ensemble.</p>
        </div>

        <div className={styles.hero}>
          <Image
            src="/parentZlite/noxi-illustrations/noxi-bienvenue.png"
            alt="Noxi accueille le parent"
            width={360}
            height={360}
            priority
          />
        </div>

        <div className={styles.copy}>
          <h2>Chaque parent apprend chaque jour.</h2>
        </div>

        <PrimaryButton href="/home">Commencer</PrimaryButton>
        <Link className={styles.secondary} href="/home">
          J'ai deja un compte
        </Link>
      </section>
    </AppShell>
  );
}
