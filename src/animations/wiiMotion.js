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
    opacity: 0.22,
    filter: "brightness(1.22)",
  },
  animate: {
    opacity: [0.22, 0.82, 1],
    filter: ["brightness(1.22)", "brightness(1.08)", "brightness(1)"],
  },
  transition: {
    duration: 0.92,
    ease: "easeOut",
    times: [0, 0.34, 1],
  },
};

export const channelReturnTiming = {
  duration: 620,
  easing: "cubic-bezier(.22,.04,.24,1)",
};
