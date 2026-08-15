import { useEffect, useMemo, useState } from "react";

const clockGlyphs = {
  0: "/assets/wii-clock-0.png",
  1: "/assets/wii-clock-1.png",
  2: "/assets/wii-clock-2.png",
  3: "/assets/wii-clock-3.png",
  4: "/assets/wii-clock-4.png",
  5: "/assets/wii-clock-5.png",
  6: "/assets/wii-clock-6.png",
  7: "/assets/wii-clock-7.png",
  8: "/assets/wii-clock-8.png",
  9: "/assets/wii-clock-9.png",
  ":": "/assets/wii-clock-colon.png",
};

const weekdayFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
});

function useSystemTime() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const intervalId = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(intervalId);
  }, []);

  return useMemo(() => {
    const hours = now.getHours();
    const displayHours = hours % 12 || 12;
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const meridiem = hours < 12 ? "AM" : "PM";

    return {
      clockValue: `${displayHours}:${minutes}`,
      meridiem,
      isoTime: now.toISOString(),
      dateValue: `${weekdayFormatter.format(now)} ${now.getMonth() + 1}/${now.getDate()}`,
      dateTime: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`,
    };
  }, [now]);
}

export function SystemDate({ className = "", id = "system-date" }) {
  const timeParts = useSystemTime();

  return (
    <time className={`date${className ? ` ${className}` : ""}`} id={id} dateTime={timeParts.dateTime}>
      {[...timeParts.dateValue].map((character, index) =>
        character === " " ? (
          <span key={`space-${index}`} className="date-space" />
        ) : (
          <img
            key={`${character}-${index}`}
            className={`date-glyph date-glyph--value-${character}`}
            src={`/assets/wii-date-${character.codePointAt(0)}.png`}
            alt=""
            draggable="false"
          />
        ),
      )}
    </time>
  );
}

export function SystemTime() {
  const timeParts = useSystemTime();

  return (
    <time className="clock" id="system-clock" dateTime={timeParts.isoTime} aria-label={`${timeParts.clockValue} ${timeParts.meridiem}`}>
      <span className="clock-digits" aria-hidden="true">
        {[...timeParts.clockValue].map((character, index) => (
          <img
            key={`${character}-${index}`}
            className={
              character === ":"
                ? "clock-glyph clock-glyph--colon"
                : `clock-glyph clock-glyph--digit clock-glyph--value-${character}`
            }
            src={clockGlyphs[character]}
            alt=""
            draggable="false"
          />
        ))}
      </span>
      <span className="clock-meridiem" aria-hidden="true">
        <img className="clock-meridiem-image" src={`/assets/wii-clock-${timeParts.meridiem.toLowerCase()}.png`} alt="" draggable="false" />
      </span>
    </time>
  );
}

export function SystemClock() {
  return (
    <>
      <SystemTime />
      <SystemDate />
    </>
  );
}
