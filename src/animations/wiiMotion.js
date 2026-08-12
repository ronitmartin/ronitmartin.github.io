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
  previewDelay: 80,
  previewDuration: 620,
  easing: "cubic-bezier(.08,.54,.12,1)",
};

export const channelReturnTiming = {
  duration: 620,
  easing: "cubic-bezier(.22,.04,.24,1)",
};
