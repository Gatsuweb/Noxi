"use client";

import { motion } from "motion/react";
import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./PrimaryButton.module.css";

type PrimaryButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "green" | "light";
  type?: "button" | "submit";
};

export function PrimaryButton({
  children,
  href,
  onClick,
  disabled = false,
  variant = "primary",
  type = "button",
}: PrimaryButtonProps) {
  const className = `${styles.button} ${styles[variant]}`;

  if (href && !disabled) {
    return (
      <motion.div whileTap={{ scale: 0.97 }}>
        <Link className={className} href={href}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      className={className}
      disabled={disabled}
      onClick={onClick}
      type={type}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
    >
      {children}
    </motion.button>
  );
}
