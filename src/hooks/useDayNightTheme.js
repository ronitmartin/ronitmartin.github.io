import { useCallback, useEffect, useState } from "react";

const SUNRISE_HOUR = 6.5;
const SUNSET_HOUR = 19.5;
const THEME_STORAGE_KEY = "ron-theme-choice";

function isNight(date) {
  const hour = date.getHours() + date.getMinutes() / 60;
  return hour < SUNRISE_HOUR || hour >= SUNSET_HOUR;
}

function dateAtHour(date, hour) {
  const result = new Date(date);
  const wholeHour = Math.floor(hour);
  result.setHours(wholeHour, Math.round((hour - wholeHour) * 60), 0, 0);
  return result;
}

function getNextAutomaticChange(date) {
  const hour = date.getHours() + date.getMinutes() / 60;

  if (hour < SUNRISE_HOUR) {
    return dateAtHour(date, SUNRISE_HOUR);
  }

  if (hour < SUNSET_HOUR) {
    return dateAtHour(date, SUNSET_HOUR);
  }

  const tomorrow = new Date(date);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return dateAtHour(tomorrow, SUNRISE_HOUR);
}

function clearStoredTheme() {
  try {
    window.localStorage.removeItem(THEME_STORAGE_KEY);
  } catch {
    // The clock-based theme still works when storage is unavailable.
  }
}

function getInitialTheme() {
  const now = new Date();

  try {
    const storedTheme = JSON.parse(window.localStorage.getItem(THEME_STORAGE_KEY));
    if (
      typeof storedTheme?.isDark === "boolean" &&
      Number.isFinite(storedTheme?.expiresAt) &&
      storedTheme.expiresAt > now.getTime()
    ) {
      return storedTheme;
    }
    clearStoredTheme();
  } catch {
    clearStoredTheme();
  }

  return { isDark: isNight(now), expiresAt: null };
}

export function useDayNightTheme() {
  const [theme, setTheme] = useState(getInitialTheme);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const nextTheme = {
        isDark: !current.isDark,
        expiresAt: getNextAutomaticChange(new Date()).getTime(),
      };

      try {
        window.localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(nextTheme));
      } catch {
        // Keep the selection for this tab when storage is unavailable.
      }

      return nextTheme;
    });
  }, []);

  useEffect(() => {
    if (theme.expiresAt) {
      const timeoutId = window.setTimeout(() => {
        clearStoredTheme();
        setTheme({ isDark: isNight(new Date()), expiresAt: null });
      }, Math.max(0, theme.expiresAt - Date.now()));

      return () => window.clearTimeout(timeoutId);
    }

    const intervalId = window.setInterval(() => {
      setTheme((current) => ({ ...current, isDark: isNight(new Date()) }));
    }, 30000);

    return () => window.clearInterval(intervalId);
  }, [theme.expiresAt]);

  return { isDark: theme.isDark, toggleTheme };
}
