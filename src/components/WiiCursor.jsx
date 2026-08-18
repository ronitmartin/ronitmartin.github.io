import { forwardRef } from "react";

export const WiiCursor = forwardRef(function WiiCursor(_, ref) {
  return <img ref={ref} className="channel-keyboard-cursor" alt="" aria-hidden="true" />;
});
