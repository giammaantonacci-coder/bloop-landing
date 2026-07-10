"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { MotionConfig } from "framer-motion";

type BubblesCtx = { enabled: boolean; toggle: () => void };

const Ctx = createContext<BubblesCtx>({ enabled: true, toggle: () => {} });

export const useBubbles = () => useContext(Ctx);

const STORAGE_KEY = "bloop:bubbles";

/**
 * Global on/off state for the decorative bubbles, persisted in
 * localStorage. Starts enabled (matching SSR) and reads the saved
 * preference on mount.
 */
export function BubblesProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "0") setEnabled(false);
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  return (
    <Ctx.Provider value={{ enabled, toggle }}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </Ctx.Provider>
  );
}
