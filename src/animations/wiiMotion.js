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
  dimDuration: 330,
  previewDelay: 145,
  previewDuration: 285,
  contentDelay: 95,
  easing: "cubic-bezier(.12,.72,.14,1)",
};

export const channelReturnTiming = {
  duration: 620,
  easing: "cubic-bezier(.22,.04,.24,1)",
};
