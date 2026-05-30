import type { ReactNode } from "react";
import styles from "./AppShell.module.css";

type AppShellProps = {
  children: ReactNode;
  withNav?: boolean;
  className?: string;
};

export function AppShell({ children, withNav = false, className = "" }: AppShellProps) {
  return (
    <main className={`${styles.app} ${withNav ? styles.withNav : ""} ${className}`.trim()}>
      {children}
    </main>
  );
}
