export const channelButtonMotion = {
  hover: {
    scale: 1.025,
    filter: "brightness(1.06)",
  },
  tap: {
    scale: 0.985,
    filter: "brightness(0.98)",
  },
  transition: {
    duration: 0.12,
    ease: "easeOut",
  },
};

export const channelLaunchTiming = {
  dimDuration: 360,
  previewDelay: 360,
  previewDuration: 1420,
  easing: "cubic-bezier(.08,.54,.12,1)",
};

export const channelOpenStageTransition = {
  duration: channelLaunchTiming.previewDuration / 1000,
  ease: [0.08, 0.54, 0.12, 1],
  times: [0, 0.72, 1],
};

export const channelOpenContentMotion = {
  initial: {
    opacity: 0,
    filter: "brightness(1.35)",
  },
  animate: {
    opacity: [0, 0, 1],
    filter: ["brightness(1.35)", "brightness(1.25)", "brightness(1)"],
  },
  transition: {
    duration: (channelLaunchTiming.previewDuration + 520) / 1000,
    ease: "easeOut",
    times: [0, 0.38, 1],
  },
};

export const channelReturnTiming = {
  duration: 620,
  easing: "cubic-bezier(.22,.04,.24,1)",
};
