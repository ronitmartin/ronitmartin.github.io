import { useEffect, useState } from "react";

const SUNRISE_HOUR = 6.5;
const SUNSET_HOUR = 19.5;

function isNight(date) {
  const hour = date.getHours() + date.getMinutes() / 60;
  return hour < SUNRISE_HOUR || hour >= SUNSET_HOUR;
}

export function useDayNightTheme() {
  const [isDark, setIsDark] = useState(() => isNight(new Date()));

  useEffect(() => {
    const intervalId = window.setInterval(() => setIsDark(isNight(new Date())), 30000);
    return () => window.clearInterval(intervalId);
  }, []);

  return isDark;
}
