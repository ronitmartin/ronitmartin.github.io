import { useRef } from "react";
import { ChannelGrid } from "./components/ChannelGrid";
import { ChannelOpenView } from "./components/ChannelOpenView";
import { ChannelShapeDefinitions } from "./components/ChannelShapeDefinitions";
import { SystemTray } from "./components/SystemTray";
import { useChannelTransition } from "./hooks/useChannelTransition";
import { useDayNightTheme } from "./hooks/useDayNightTheme";

export function App() {
  const screenRef = useRef(null);
  const stageRef = useRef(null);
  const { closeChannel, isLoading, isOpen, launchMotion, openChannel, openChannelData } = useChannelTransition({
    screenRef,
    stageRef,
  });
  const isDark = useDayNightTheme();

  return (
    <>
      <ChannelShapeDefinitions />
      <main
        ref={screenRef}
        className={`wii-screen${isOpen ? " is-channel-open" : ""}${isLoading ? " is-channel-loading" : ""}${isDark ? " is-dark" : ""}`}
        aria-label="Interactive recreation of the Wii Menu"
      >
        <div className="wii-night-sky" aria-hidden="true" />
        <ChannelGrid onOpen={openChannel} />
        <SystemTray />
        <ChannelOpenView channel={openChannelData} launchMotion={launchMotion} onClose={closeChannel} stageRef={stageRef} />
      </main>
    </>
  );
}
