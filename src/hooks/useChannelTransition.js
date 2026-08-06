import { useCallback, useEffect, useRef, useState } from "react";
import { channelLaunchTiming, channelReturnTiming } from "../animations/wiiMotion";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useChannelTransition({ screenRef, stageRef }) {
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
    const dimDuration = reducedMotion ? 1 : channelLaunchTiming.dimDuration;
    const previewDelay = reducedMotion ? 0 : channelLaunchTiming.previewDelay;
    const previewDuration = reducedMotion ? 1 : channelLaunchTiming.previewDuration;

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

        const stageAnimation = stage.animate(
          [
            {
              opacity: 0,
              filter: "brightness(1.18)",
              transform: "translate3d(0, 0, 0) scale(1.045)",
            },
            {
              opacity: 1,
              filter: "brightness(1.04)",
              offset: 0.72,
              transform: "translate3d(0, 0, 0) scale(1.008)",
            },
            {
              opacity: 1,
              filter: "brightness(1)",
              transform: "translate3d(0, 0, 0) scale(1)",
            },
          ],
          { duration: previewDuration, easing: channelLaunchTiming.easing, fill: "both" },
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
  }, [isOpen, isTransitioning, screenRef, stageRef]);

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

    const duration = reducedMotion ? 1 : channelReturnTiming.duration;
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
      { duration, easing: channelReturnTiming.easing, fill: "forwards" },
    );

    returnAnimation.finished
      .catch(() => {})
      .then(() => {
        returnLayer.remove();
        currentOpenFrame.current?.focus({ preventScroll: true });
        currentOpenFrame.current = null;
        setIsTransitioning(false);
      });
  }, [isOpen, isTransitioning, screenRef, stageRef]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        closeChannel();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeChannel]);

  return {
    closeChannel,
    isLoading,
    isOpen,
    openChannel,
    openChannelData,
  };
}
