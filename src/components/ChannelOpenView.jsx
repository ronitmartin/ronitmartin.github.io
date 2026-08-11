import { motion, useReducedMotion } from "framer-motion";
import { channelOpenContentMotion } from "../animations/wiiMotion";
import { ChannelOpenContent } from "./ChannelOpenContent";

export function ChannelOpenView({ channel, launchKey, launchMotion, onClose, onNavigate, stageRef }) {
  const hasStartUrl = Boolean(channel?.startUrl);
  const hasOwnTitleTreatment = channel?.openType === "missing-link";
  const shouldReduceMotion = useReducedMotion();

  function openStartUrl() {
    if (!channel?.startUrl) {
      return;
    }

    window.open(channel.startUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <section className="channel-open-view" aria-hidden={channel ? "false" : "true"}>
      <motion.div
        key={launchKey}
        className="channel-open-stage"
        ref={stageRef}
        initial={shouldReduceMotion ? false : launchMotion?.initial}
        animate={shouldReduceMotion ? undefined : launchMotion?.animate}
        transition={shouldReduceMotion ? undefined : launchMotion?.transition}
      >
        <div className="channel-open-frame" aria-hidden="true">
          {!hasOwnTitleTreatment && (
            <>
              <div className="channel-open-bluebar" />
              <h1 className="channel-open-title">{channel?.title || "Channel"}</h1>
            </>
          )}
          <motion.div
            key={`${channel?.id || "empty"}-content`}
            className={`channel-open-content${channel?.openType ? ` channel-open-content--${channel.openType}` : ""}`}
            initial={shouldReduceMotion ? false : channelOpenContentMotion.initial}
            animate={shouldReduceMotion ? undefined : channelOpenContentMotion.animate}
            transition={shouldReduceMotion ? undefined : channelOpenContentMotion.transition}
          >
            <ChannelOpenContent channel={channel} />
          </motion.div>
        </div>

        <button className="channel-menu-button" type="button" onClick={onClose}>
          Wii Menu
        </button>
        <button className="channel-start-button" type="button" disabled={!hasStartUrl} onClick={openStartUrl}>
          Start
        </button>

        <button
          className="channel-nav-arrow channel-nav-arrow--prev"
          type="button"
          aria-label="Previous channel"
          onClick={() => onNavigate?.(-1)}
        >
          <img src="/assets/wii-page-arrow.png" alt="" aria-hidden="true" />
        </button>
        <button
          className="channel-nav-arrow channel-nav-arrow--next"
          type="button"
          aria-label="Next channel"
          onClick={() => onNavigate?.(1)}
        >
          <img src="/assets/wii-page-arrow.png" alt="" aria-hidden="true" />
        </button>
      </motion.div>
    </section>
  );
}
