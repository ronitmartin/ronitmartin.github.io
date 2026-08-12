import { useCallback, useEffect, useRef, useState } from "react";

const SUNRISE_HOUR = 6.5;
const SUNSET_HOUR = 19.5;

function isNight(date) {
  const hour = date.getHours() + date.getMinutes() / 60;
  return hour < SUNRISE_HOUR || hour >= SUNSET_HOUR;
}

export function useDayNightTheme() {
  const hasManualTheme = useRef(false);
  const [isDark, setIsDark] = useState(() => isNight(new Date()));

  const toggleTheme = useCallback(() => {
    hasManualTheme.current = true;
    setIsDark((current) => !current);
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      if (!hasManualTheme.current) {
        setIsDark(isNight(new Date()));
      }
    }, 30000);

    return () => window.clearInterval(intervalId);
  }, []);

  return { isDark, toggleTheme };
}
