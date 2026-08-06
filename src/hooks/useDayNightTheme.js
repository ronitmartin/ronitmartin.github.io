import { useEffect, useState } from "react";

const RAD = Math.PI / 180;
const J1970 = 2440588;
const J2000 = 2451545;
const DAY_MS = 86400000;
const OBLIQUITY = RAD * 23.4397;

function toDays(date) {
  return date.valueOf() / DAY_MS - 0.5 + J1970 - J2000;
}

function fromJulian(j) {
  return new Date((j + 0.5 - J1970) * DAY_MS);
}

function solarMeanAnomaly(d) {
  return RAD * (357.5291 + 0.98560028 * d);
}

function eclipticLongitude(M) {
  const center = RAD * (1.9148 * Math.sin(M) + 0.02 * Math.sin(2 * M) + 0.0003 * Math.sin(3 * M));
  const perihelion = RAD * 102.9372;
  return M + center + perihelion + Math.PI;
}

function declination(eclipticLng) {
  return Math.asin(Math.sin(eclipticLng) * Math.sin(OBLIQUITY));
}

function julianCycle(d, longitudeWest) {
  return Math.round(d - 0.0009 - longitudeWest / (2 * Math.PI));
}

function approxTransit(hourAngle, longitudeWest, n) {
  return 0.0009 + (hourAngle + longitudeWest) / (2 * Math.PI) + n;
}

function solarTransitJulian(approxTransitDays, M, eclipticLng) {
  return J2000 + approxTransitDays + 0.0053 * Math.sin(M) - 0.0069 * Math.sin(2 * eclipticLng);
}

function hourAngle(elevation, latitude, dec) {
  return Math.acos(
    (Math.sin(elevation) - Math.sin(latitude) * Math.sin(dec)) / (Math.cos(latitude) * Math.cos(dec)),
  );
}

// Core solar-position math ported from the public-domain NOAA algorithm (the
// same one behind the SunCalc library), trimmed down to just sunrise/sunset.
function getSunTimes(date, latitude, longitude) {
  const longitudeWest = RAD * -longitude;
  const phi = RAD * latitude;
  const d = toDays(date);
  const n = julianCycle(d, longitudeWest);
  const approxTransitDays = approxTransit(0, longitudeWest, n);
  const M = solarMeanAnomaly(approxTransitDays);
  const eclipticLng = eclipticLongitude(M);
  const dec = declination(eclipticLng);
  const Jnoon = solarTransitJulian(approxTransitDays, M, eclipticLng);

  const w = hourAngle(-0.833 * RAD, phi, dec);
  const Jset = solarTransitJulian(approxTransit(w, longitudeWest, n), M, eclipticLng);
  const Jrise = Jnoon - (Jset - Jnoon);

  return { sunrise: fromJulian(Jrise), sunset: fromJulian(Jset) };
}

function isNightByLocalHour(date) {
  const hour = date.getHours() + date.getMinutes() / 60;
  return hour < 6 || hour >= 19;
}

function computeIsDark(coords) {
  const now = new Date();
  if (!coords) {
    return isNightByLocalHour(now);
  }

  const { sunrise, sunset } = getSunTimes(now, coords.latitude, coords.longitude);
  return now < sunrise || now >= sunset;
}

export function useDayNightTheme() {
  const [coords, setCoords] = useState(null);
  const [isDark, setIsDark] = useState(() => computeIsDark(null));

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      return;
    }

    let cancelled = false;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (!cancelled) {
          setCoords({ latitude: position.coords.latitude, longitude: position.coords.longitude });
        }
      },
      () => {},
      { maximumAge: 3600000, timeout: 8000 },
    );

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    setIsDark(computeIsDark(coords));
    const intervalId = window.setInterval(() => setIsDark(computeIsDark(coords)), 60000);
    return () => window.clearInterval(intervalId);
  }, [coords]);

  return isDark;
}
