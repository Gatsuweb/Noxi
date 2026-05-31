"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./PwaInstallModal.module.css";

const DISMISSED_KEY = "parentzlite-pwa-modal-dismissed";
const SNOOZED_UNTIL_KEY = "parentzlite-pwa-modal-snoozed-until";
const SNOOZE_DAYS = 7;

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

function isStandalone() {
  const navigatorWithStandalone = window.navigator as Navigator & { standalone?: boolean };

  return window.matchMedia("(display-mode: standalone)").matches || navigatorWithStandalone.standalone === true;
}

function isIosSafari() {
  const userAgent = window.navigator.userAgent;
  const isIos = /iphone|ipad|ipod/i.test(userAgent);
  const isSafari = /safari/i.test(userAgent) && !/crios|fxios|edgios/i.test(userAgent);

  return isIos && isSafari;
}

function canShowFromStorage() {
  if (window.localStorage.getItem(DISMISSED_KEY) === "true") {
    return false;
  }

  const snoozedUntil = Number(window.localStorage.getItem(SNOOZED_UNTIL_KEY) ?? "0");

  return !snoozedUntil || Date.now() >= snoozedUntil;
}

function snoozeModal() {
  const snoozedUntil = Date.now() + SNOOZE_DAYS * 24 * 60 * 60 * 1000;
  window.localStorage.setItem(SNOOZED_UNTIL_KEY, String(snoozedUntil));
}

export function PwaInstallModal() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [iosSafari, setIosSafari] = useState(false);

  const shouldUseManualInstructions = iosSafari || !deferredPrompt;

  const openIfAllowed = useCallback((hasInstallPrompt: boolean) => {
    if (isStandalone() || !canShowFromStorage()) {
      return;
    }

    if (hasInstallPrompt || isIosSafari()) {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    setMounted(true);

    if (isStandalone() || !canShowFromStorage()) {
      return;
    }

    const detectedIosSafari = isIosSafari();
    setIosSafari(detectedIosSafari);

    if (detectedIosSafari) {
      setVisible(true);
      return;
    }

    const timeout = window.setTimeout(() => {
      openIfAllowed(false);
    }, 1200);

    return () => window.clearTimeout(timeout);
  }, [openIfAllowed]);

  useEffect(() => {
    function handleBeforeInstallPrompt(event: Event) {
      event.preventDefault();
      const promptEvent = event as BeforeInstallPromptEvent;

      setDeferredPrompt(promptEvent);
      openIfAllowed(true);
    }

    function handleAppInstalled() {
      window.localStorage.setItem(DISMISSED_KEY, "true");
      setVisible(false);
      setDeferredPrompt(null);
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, [openIfAllowed]);

  const instructions = useMemo(() => {
    if (!iosSafari) return null;

    return [
      "Appuie sur le bouton Partager",
      "Choisis Sur l'écran d'accueil",
      "Valide avec Ajouter",
    ];
  }, [iosSafari]);

  async function handleInstall() {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      setDeferredPrompt(null);

      if (choice.outcome === "accepted") {
        window.localStorage.setItem(DISMISSED_KEY, "true");
      } else {
        snoozeModal();
      }

      setVisible(false);
      return;
    }

    snoozeModal();
    setVisible(false);
  }

  function handleLater() {
    snoozeModal();
    setVisible(false);
  }

  function handleDismissForever() {
    window.localStorage.setItem(DISMISSED_KEY, "true");
    setVisible(false);
  }

  if (!mounted) {
    return null;
  }

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="pwa-install-title"
        >
          <motion.section
            className={styles.modal}
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
          >
            <motion.div
              className={styles.noxi}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image src="/parentZlite/rewards/emotions/emotion-heureux.png" alt="" width={108} height={108} />
            </motion.div>

            <div className={styles.copy}>
              <span>Installer ParentZlite sur mon téléphone</span>
              <h2 id="pwa-install-title">Installe ParentZlite</h2>
              <p>Ajoute ParentZlite à ton écran d&apos;accueil pour retrouver tes missions plus facilement.</p>
            </div>

            {instructions ? (
              <div className={styles.instructions}>
                <strong>Sur iPhone :</strong>
                <ol>
                  {instructions.map((instruction) => (
                    <li key={instruction}>{instruction}</li>
                  ))}
                </ol>
              </div>
            ) : null}

            {!deferredPrompt && !iosSafari ? (
              <p className={styles.browserNote}>Tu peux aussi l&apos;ajouter depuis le menu de ton navigateur.</p>
            ) : null}

            <div className={styles.actions}>
              <motion.button className={styles.primary} onClick={handleInstall} type="button" whileTap={{ scale: 0.97 }}>
                {shouldUseManualInstructions ? "J'ai compris" : "Installer l'app"}
              </motion.button>
              <motion.button className={styles.secondary} onClick={handleLater} type="button" whileTap={{ scale: 0.97 }}>
                Plus tard
              </motion.button>
              <button className={styles.dismiss} onClick={handleDismissForever} type="button">
                Ne plus afficher
              </button>
            </div>
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
