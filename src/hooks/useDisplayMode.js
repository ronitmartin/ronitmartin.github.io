import { useCallback, useState } from "react";

const DISPLAY_STORAGE_KEY = "ron-display-mode";

function getInitialDisplayMode() {
  try {
    return window.localStorage.getItem(DISPLAY_STORAGE_KEY) === "crt";
  } catch {
    return false;
  }
}

export function useDisplayMode() {
  const [isCrt, setIsCrt] = useState(getInitialDisplayMode);

  const toggleDisplayMode = useCallback(() => {
    setIsCrt((current) => {
      const nextIsCrt = !current;

      try {
        window.localStorage.setItem(DISPLAY_STORAGE_KEY, nextIsCrt ? "crt" : "full");
      } catch {
        // Keep the selection for this tab when storage is unavailable.
      }

      return nextIsCrt;
    });
  }, []);

  return { isCrt, toggleDisplayMode };
}
