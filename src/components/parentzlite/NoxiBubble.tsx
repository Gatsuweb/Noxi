"use client";

import { motion } from "motion/react";
import Image from "next/image";
import styles from "./NoxiBubble.module.css";

type NoxiBubbleProps = {
  children: React.ReactNode;
  image?: string;
};

export function NoxiBubble({ children, image = "/parentZlite/noxi-emotes/noxi-encourage.png" }: NoxiBubbleProps) {
  return (
    <section className={styles.bubble}>
      <div>
        <h2>Continue comme ca !</h2>
        <p>{children}</p>
      </div>
      <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
        <Image src={image} alt="" width={116} height={116} />
      </motion.div>
    </section>
  );
}
