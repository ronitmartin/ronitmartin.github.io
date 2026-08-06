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
  previewDelay: 90,
  previewDuration: 1780,
  easing: "cubic-bezier(.16,.68,.18,1)",
};

export const channelOpenStageMotion = {
  initial: {
    opacity: 1,
    filter: "brightness(1.18)",
    x: "-24%",
    y: "-4%",
    scale: 0.64,
  },
  animate: {
    opacity: 1,
    filter: ["brightness(1.18)", "brightness(1.04)", "brightness(1)"],
    x: ["-24%", "-1.5%", "0%"],
    y: ["-4%", "-0.4%", "0%"],
    scale: [0.64, 1.012, 1],
  },
  transition: {
    duration: channelLaunchTiming.previewDuration / 1000,
    ease: [0.16, 0.68, 0.18, 1],
    times: [0, 0.72, 1],
  },
};

export const channelReturnTiming = {
  duration: 620,
  easing: "cubic-bezier(.22,.04,.24,1)",
};
