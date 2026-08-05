import { motion, useReducedMotion } from "framer-motion";
import { channelButtonMotion } from "../animations/wiiMotion";
import { ChannelArtwork } from "./ChannelArtwork";
import { ChannelOutline } from "./ChannelOutline";

export function ChannelFrame({ channel, onOpen, disabled = false }) {
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
      whileHover={disabled || shouldReduceMotion ? undefined : channelButtonMotion.hover}
      whileTap={disabled || shouldReduceMotion ? undefined : channelButtonMotion.tap}
      transition={channelButtonMotion.transition}
    >
      <ChannelArtwork channel={channel} />
      <ChannelOutline />
    </motion.button>
  );
}
