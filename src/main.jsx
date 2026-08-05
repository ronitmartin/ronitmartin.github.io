import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion, useReducedMotion } from "framer-motion";
import "../styles.css";
import "./react-app.css";

const channelOutlinePath =
  "M 78 15 C 320 5 680 5 922 15 C 970 18 990 48 993 102 C 996 168 996 234 996 300 C 996 366 996 432 993 498 C 990 552 970 582 922 585 C 680 595 320 595 78 585 C 30 582 10 552 7 498 C 3 432 2 366 2 300 C 2 234 3 168 7 102 C 10 48 30 18 78 15 Z";

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

const channels = [
  { id: "disc", title: "Disc Channel", type: "disc", openType: "disc" },
  { id: "mii", title: "Mii Channel", type: "mii" },
  { id: "photo", title: "Photo Channel", type: "photo" },
  { id: "shop", title: "Wii Shop Channel", type: "shop" },
  { id: "empty-1", type: "empty" },
  { id: "forecast", title: "Forecast Channel", type: "forecast" },
  { id: "news", title: "News Channel", type: "news" },
  { id: "empty-2", type: "empty" },
  { id: "empty-3", type: "empty" },
  { id: "page-arrow", type: "empty", pageArrow: true },
  { id: "empty-4", type: "empty" },
  { id: "empty-5", type: "empty" },
  { id: "empty-6", type: "empty" },
  { id: "empty-7", type: "empty" },
  { id: "empty-8", type: "empty" },
];

function ChannelShapeDefinitions() {
  return (
    <svg className="channel-shape-definitions" width="0" height="0" aria-hidden="true">
      <defs>
        <clipPath id="channel-crt-shape" clipPathUnits="objectBoundingBox">
          <path d="M .078 .025 C .32 .008 .68 .008 .922 .025 C .97 .03 .99 .08 .993 .17 C .996 .28 .996 .39 .996 .5 C .996 .61 .996 .72 .993 .83 C .99 .92 .97 .97 .922 .975 C .68 .992 .32 .992 .078 .975 C .03 .97 .01 .92 .007 .83 C .003 .72 .002 .61 .002 .5 C .002 .39 .003 .28 .007 .17 C .01 .08 .03 .03 .078 .025 Z" />
        </clipPath>
      </defs>
    </svg>
  );
}

function ChannelArtwork({ channel }) {
  if (channel.type === "disc") {
    return (
      <div className="channel asset-channel disc-channel" aria-label={channel.title}>
        <svg className="channel-disc" viewBox="0 0 200 200" aria-hidden="true">
          <defs>
            <radialGradient id="disc-face" cx="50%" cy="40%" r="75%">
              <stop offset="0%" stopColor="#1c2536" />
              <stop offset="55%" stopColor="#0b0b0b" />
              <stop offset="100%" stopColor="#020202" />
            </radialGradient>
          </defs>
          <circle cx="100" cy="100" r="96" fill="url(#disc-face)" stroke="#168cff" strokeWidth="2" strokeOpacity="0.55" />
          <circle cx="100" cy="100" r="96" fill="none" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.08" />
          <g transform="translate(72 72) scale(2.3)">
            <path d="M22 19.2727C22 20.779 20.779 22 19.2727 22H14.7273C13.221 22 12 20.779 12 19.2727V12H19.2727C20.779 12 22 13.221 22 14.7273V19.2727Z" fill="#68C4FF" />
            <path d="M20 2C21.1046 2 22 2.89543 22 4V7C22 8.10457 21.1046 9 20 9H17C15.8954 9 15 8.10457 15 7V4C15 2.89543 15.8954 2 17 2H20Z" fill="#0C79D8" />
            <path d="M7 15C8.10457 15 9 15.8954 9 17V20C9 21.1046 8.10457 22 7 22H4C2.89543 22 2 21.1046 2 20V17C2 15.8954 2.89543 15 4 15H7Z" fill="#0C79D8" />
            <path d="M12 12H4.72727C3.22104 12 2 10.779 2 9.27273V4.72727C2 3.22104 3.22104 2 4.72727 2H9.27273C10.779 2 12 3.22104 12 4.72727V12Z" fill="#2E9EFF" />
          </g>
        </svg>
      </div>
    );
  }

  if (channel.type === "mii") {
    return (
      <div className="channel asset-channel mii-channel" aria-label={channel.title}>
        <img className="mii-channel-art" src="/assets/channels/mii-channel-crowd.jpg" alt="" aria-hidden="true" />
      </div>
    );
  }

  if (channel.type === "photo") {
    return (
      <div className="channel asset-channel photo-channel" aria-label={channel.title}>
        <img className="photo-cork" src="/assets/channels/photo-cork.png" alt="" aria-hidden="true" />
        <img className="photo-sky" src="/assets/channels/photo-sky.png" alt="" aria-hidden="true" />
        <img className="photo-rose" src="/assets/channels/photo-rose.png" alt="" aria-hidden="true" />
        <img className="photo-title" src="/assets/channels/photo-title.png" alt="" aria-hidden="true" />
      </div>
    );
  }

  if (channel.type === "shop") {
    return (
      <div className="channel asset-channel shop-channel" aria-label={channel.title}>
        <img className="shop-bags" src="/assets/channels/shop-bags.png" alt="" aria-hidden="true" />
        <img className="shop-title" src="/assets/channels/shop-title.png" alt="" aria-hidden="true" />
      </div>
    );
  }

  if (channel.type === "forecast") {
    return (
      <div className="channel asset-channel forecast" aria-label={channel.title}>
        <img className="forecast-sun" src="/assets/channels/forecast-sun.png" alt="" aria-hidden="true" />
        <span>Forecast Channel</span>
      </div>
    );
  }

  if (channel.type === "news") {
    return (
      <div className="channel asset-channel news" aria-label={channel.title}>
        <img className="news-noise" src="/assets/channels/news-noise.png" alt="" aria-hidden="true" />
        <img className="news-map news-map-west" src="/assets/channels/news-map-west.png" alt="" aria-hidden="true" />
        <img className="news-map news-map-east" src="/assets/channels/news-map-east.png" alt="" aria-hidden="true" />
        <img className="news-title" src="/assets/channels/news-title.png" alt="" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div className={`channel empty${channel.pageArrow ? " page-arrow" : ""}`} aria-hidden="true">
      {channel.pageArrow && <img src="/assets/wii-page-arrow.png" alt="" aria-hidden="true" />}
    </div>
  );
}

function ChannelOutline() {
  return (
    <svg className="channel-outline" viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true">
      <path d={channelOutlinePath} />
    </svg>
  );
}

function ChannelFrame({ channel, onOpen, disabled = false }) {
  const isEmpty = channel.type === "empty";
  const className = `channel-frame${isEmpty ? " is-empty" : ""}`;
  const shouldReduceMotion = useReducedMotion();

  if (isEmpty) {
    return (
      <motion.div className={className}>
        <ChannelArtwork channel={channel} />
        <ChannelOutline />
      </motion.div>
    );
  }

  return (
    <motion.button
      className={className}
      type="button"
      disabled={disabled}
      data-channel-id={channel.id}
      data-channel-title={channel.title}
      aria-label={`Open ${channel.title}`}
      onClick={(event) => onOpen?.(channel, event.currentTarget)}
      whileHover={disabled || shouldReduceMotion ? undefined : { scale: 1.025, filter: "brightness(1.06)" }}
      whileTap={disabled || shouldReduceMotion ? undefined : { scale: 0.985, filter: "brightness(0.98)" }}
      transition={{ duration: 0.12, ease: "easeOut" }}
    >
      <ChannelArtwork channel={channel} />
      <ChannelOutline />
    </motion.button>
  );
}

function ChannelGrid({ onOpen }) {
  return (
    <section className="channel-grid" aria-label="Wii channels">
      {channels.map((channel) => (
        <ChannelFrame key={channel.id} channel={channel} onOpen={onOpen} />
      ))}
    </section>
  );
}

function DiscOpenContent() {
  return (
    <div className="disc-title-card">
      <div className="disc-title-copy">
        <p className="disc-title-eyebrow">Digital-first Design Agency</p>
        <h2 className="disc-title-wordmark">
          We&rsquo;re the
          <br />
          <em>missing link</em>
        </h2>
        <p className="disc-title-tagline">between where your brand is today and where it could be.</p>
      </div>
      <img className="disc-title-visual" src="/assets/channels/missing-link-hero.png" alt="" aria-hidden="true" />
    </div>
  );
}

function ChannelOpenContent({ channel }) {
  if (!channel) {
    return null;
  }

  if (channel.openType === "disc") {
    return <DiscOpenContent />;
  }

  return <ChannelFrame channel={channel} disabled />;
}

function SystemClock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const intervalId = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(intervalId);
  }, []);

  const timeParts = useMemo(() => {
    const hours = now.getHours();
    const displayHours = hours % 12 || 12;
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const meridiem = hours < 12 ? "AM" : "PM";

    return {
      clockValue: `${displayHours}:${minutes}`,
      meridiem,
      dateValue: `${weekdayFormatter.format(now)} ${now.getMonth() + 1}/${now.getDate()}`,
      dateTime: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`,
    };
  }, [now]);

  return (
    <>
      <time className="clock" id="system-clock" dateTime={now.toISOString()} aria-label={`${timeParts.clockValue} ${timeParts.meridiem}`}>
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

      <time className="date" id="system-date" dateTime={timeParts.dateTime}>
        {[...timeParts.dateValue].map((character, index) =>
          character === " " ? (
            <span key={`space-${index}`} className="date-space" />
          ) : (
            <img key={`${character}-${index}`} className="date-glyph" src={`/assets/wii-date-${character.codePointAt(0)}.png`} alt="" draggable="false" />
          ),
        )}
      </time>
    </>
  );
}

function SystemTray() {
  return (
    <section className="system-tray" aria-label="Wii Menu system controls">
      <svg className="tray-shape" viewBox="0 0 1000 340" preserveAspectRatio="none" aria-hidden="true">
        <path className="tray-fill" d="M0 0H168C234 0 255 18 286 61 314 99 333 114 379 114H621C667 114 686 99 714 61 745 18 766 0 832 0H1000V340H0Z" />
        <path className="tray-line" d="M0 0H168C234 0 255 18 286 61 314 99 333 114 379 114H621C667 114 686 99 714 61 745 18 766 0 832 0H1000" />
      </svg>

      <SystemClock />
      <div className="wii-menu-intro" aria-hidden="true">Wii Menu</div>

      <div className="round-control wii-button" aria-label="Wii options">
        <img className="wii-button-surface" src="/assets/wii-button-surface.png" alt="" aria-hidden="true" />
        <img className="wii-button-logo" src="/assets/wii-button-logo.png" alt="" aria-hidden="true" />
      </div>

      <div className="sd-card" aria-label="SD card">
        <img src="/assets/wii-sd-card.png" alt="" aria-hidden="true" />
      </div>

      <div className="round-control message-button" aria-label="Wii Message Board">
        <img className="message-button-surface" src="/assets/wii-button-surface.png" alt="" aria-hidden="true" />
        <img className="message-button-icon" src="/assets/wii-message-icon.png" alt="" aria-hidden="true" />
      </div>
    </section>
  );
}

function ChannelOpenView({ channel, onClose, stageRef }) {
  return (
    <section className="channel-open-view" aria-hidden={channel ? "false" : "true"}>
      <div className="channel-open-stage" ref={stageRef}>
        <div className="channel-open-frame" aria-hidden="true">
          <div className="channel-open-bluebar" />
          <h1 className="channel-open-title">{channel?.title || "Channel"}</h1>
          <div className="channel-open-content">
            <ChannelOpenContent channel={channel} />
          </div>
        </div>

        <button className="channel-menu-button" type="button" onClick={onClose}>Wii Menu</button>
        <button className="channel-start-button" type="button" disabled>Start</button>
      </div>
    </section>
  );
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function App() {
  const screenRef = useRef(null);
  const stageRef = useRef(null);
  const currentOpenFrame = useRef(null);
  const [openChannelData, setOpenChannelData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const openChannel = useCallback((channel, frame) => {
    const wiiScreen = screenRef.current;
    if (!wiiScreen || isTransitioning || isOpen) {
      return;
    }

    setIsTransitioning(true);
    currentOpenFrame.current = frame;
    setOpenChannelData(channel);

    const screenRect = wiiScreen.getBoundingClientRect();
    const frameRect = frame.getBoundingClientRect();
    const launchLayer = document.createElement("div");
    const backdrop = document.createElement("div");
    const launchClone = frame.cloneNode(true);

    launchLayer.className = "channel-launch-layer";
    backdrop.className = "channel-launch-backdrop";
    launchClone.classList.add("channel-launch-clone");
    launchClone.style.setProperty("--launch-left", `${frameRect.left - screenRect.left}px`);
    launchClone.style.setProperty("--launch-top", `${frameRect.top - screenRect.top}px`);
    launchClone.style.setProperty("--launch-width", `${frameRect.width}px`);
    launchClone.style.setProperty("--launch-height", `${frameRect.height}px`);

    launchLayer.append(backdrop, launchClone);
    wiiScreen.append(launchLayer);

    const reducedMotion = prefersReducedMotion();
    const dimDuration = reducedMotion ? 1 : 360;
    const previewDelay = reducedMotion ? 0 : 360;
    const previewDuration = reducedMotion ? 1 : 1420;
    const easing = "cubic-bezier(.08,.54,.12,1)";

    backdrop.animate([{ opacity: 0 }, { opacity: 0.72 }], {
      duration: dimDuration,
      easing: "ease-out",
      fill: "forwards",
    });

    launchClone.animate(
      [
        { filter: "brightness(1.08)", opacity: 1, transform: "scale(1)" },
        { filter: "brightness(1.14)", opacity: 1, offset: 0.58, transform: "scale(1.035)" },
        { filter: "brightness(1.04)", opacity: 0, transform: "scale(1.035)" },
      ],
      { duration: previewDelay + 260, easing: "ease-out", fill: "forwards" },
    );

    window.setTimeout(() => {
      setIsOpen(true);
      setIsLoading(true);

      requestAnimationFrame(() => {
        const stage = stageRef.current;
        if (!stage) {
          launchLayer.remove();
          setIsTransitioning(false);
          return;
        }

        const stageRect = stage.getBoundingClientRect();
        const frameCenterX = frameRect.left - screenRect.left + frameRect.width / 2;
        const frameCenterY = frameRect.top - screenRect.top + frameRect.height / 2;
        const stageCenterX = stageRect.left - screenRect.left + stageRect.width / 2;
        const stageCenterY = stageRect.top - screenRect.top + stageRect.height / 2;
        const startScale = Math.min(frameRect.width / stageRect.width, frameRect.height / stageRect.height) * 1.28;
        const startX = frameCenterX - stageCenterX;
        const startY = frameCenterY - stageCenterY;

        const stageAnimation = stage.animate(
          [
            {
              opacity: 0.98,
              filter: "brightness(1.2)",
              transform: `translate3d(${startX}px, ${startY}px, 0) scale(${startScale})`,
            },
            {
              opacity: 1,
              filter: "brightness(1.06)",
              offset: 0.72,
              transform: "translate3d(0, 0, 0) scale(0.985)",
            },
            {
              opacity: 1,
              filter: "brightness(1)",
              transform: "translate3d(0, 0, 0) scale(1)",
            },
          ],
          { duration: previewDuration, easing, fill: "both" },
        );

        stage.querySelector(".channel-open-content")?.animate(
          [
            { opacity: 0, filter: "brightness(1.35)" },
            { opacity: 0, offset: 0.38, filter: "brightness(1.25)" },
            { opacity: 1, filter: "brightness(1)" },
          ],
          { duration: previewDuration + 520, easing: "ease-out", fill: "both" },
        );

        stageAnimation.finished
          .catch(() => {})
          .then(() => {
            setIsLoading(false);
            launchLayer.remove();
            setIsTransitioning(false);
            document.querySelector(".channel-menu-button")?.focus({ preventScroll: true });
          });
      });
    }, previewDelay);
  }, [isOpen, isTransitioning]);

  const closeChannel = useCallback(() => {
    const wiiScreen = screenRef.current;
    const stage = stageRef.current;
    if (!wiiScreen || !stage || isTransitioning || !isOpen) {
      return;
    }

    setIsTransitioning(true);

    const reducedMotion = prefersReducedMotion();
    const screenRect = wiiScreen.getBoundingClientRect();
    const stageRect = stage.getBoundingClientRect();
    const targetRect = currentOpenFrame.current?.getBoundingClientRect();
    const targetCenterX = targetRect ? targetRect.left - screenRect.left + targetRect.width / 2 : screenRect.width / 2;
    const targetCenterY = targetRect ? targetRect.top - screenRect.top + targetRect.height / 2 : screenRect.height * 0.42;
    const stageCenterX = stageRect.left - screenRect.left + stageRect.width / 2;
    const stageCenterY = stageRect.top - screenRect.top + stageRect.height / 2;
    const endScale = targetRect ? Math.min(targetRect.width / stageRect.width, targetRect.height / stageRect.height) * 1.32 : 0.24;
    const deltaX = targetCenterX - stageCenterX;
    const deltaY = targetCenterY - stageCenterY;

    const returnLayer = document.createElement("div");
    const backdrop = document.createElement("div");
    const stageClone = stage.cloneNode(true);
    returnLayer.className = "channel-return-layer";
    backdrop.className = "channel-return-backdrop";
    stageClone.classList.add("channel-return-stage");
    stageClone.style.left = `${stageRect.left - screenRect.left}px`;
    stageClone.style.top = `${stageRect.top - screenRect.top}px`;
    stageClone.style.width = `${stageRect.width}px`;
    stageClone.style.height = `${stageRect.height}px`;
    returnLayer.append(backdrop, stageClone);
    wiiScreen.append(returnLayer);

    setIsOpen(false);
    setIsLoading(false);
    setOpenChannelData(null);

    const duration = reducedMotion ? 1 : 620;
    const easing = "cubic-bezier(.22,.04,.24,1)";
    backdrop.animate([{ opacity: 0.72 }, { opacity: 0 }], {
      duration: duration + 120,
      easing: "ease-out",
      fill: "forwards",
    });

    const returnAnimation = stageClone.animate(
      [
        { opacity: 1, filter: "brightness(1)", transform: "translate3d(0, 0, 0) scale(1)" },
        {
          opacity: 0.96,
          filter: "brightness(0.88)",
          offset: 0.72,
          transform: `translate3d(${deltaX * 0.86}px, ${deltaY * 0.86}px, 0) scale(${endScale * 1.3})`,
        },
        {
          opacity: 0,
          filter: "brightness(0.78)",
          transform: `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${endScale})`,
        },
      ],
      { duration, easing, fill: "forwards" },
    );

    returnAnimation.finished
      .catch(() => {})
      .then(() => {
        returnLayer.remove();
        currentOpenFrame.current?.focus({ preventScroll: true });
        currentOpenFrame.current = null;
        setIsTransitioning(false);
      });
  }, [isOpen, isTransitioning]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        closeChannel();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeChannel]);

  return (
    <>
      <ChannelShapeDefinitions />
      <main
        ref={screenRef}
        className={`wii-screen${isOpen ? " is-channel-open" : ""}${isLoading ? " is-channel-loading" : ""}`}
        aria-label="Interactive recreation of the Wii Menu"
      >
        <ChannelGrid onOpen={openChannel} />
        <SystemTray />
        <ChannelOpenView channel={openChannelData} onClose={closeChannel} stageRef={stageRef} />
      </main>
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
