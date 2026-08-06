import { useRef } from "react";
import { ChannelGrid } from "./components/ChannelGrid";
import { ChannelOpenView } from "./components/ChannelOpenView";
import { ChannelShapeDefinitions } from "./components/ChannelShapeDefinitions";
import { SystemTray } from "./components/SystemTray";
import { useChannelTransition } from "./hooks/useChannelTransition";

export function App() {
  const screenRef = useRef(null);
  const stageRef = useRef(null);
  const { closeChannel, isLoading, isOpen, launchMotion, openChannel, openChannelData } = useChannelTransition({
    screenRef,
    stageRef,
  });

  return (
    <>
      <ChannelShapeDefinitions />
      <main
        ref={screenRef}
        className={`wii-screen${isOpen ? " is-channel-open" : ""}${isLoading ? " is-channel-loading" : ""}`}
        aria-label="Interactive recreation of the Wii Menu"
      >
        <ChannelGrid onOpen={openChannel} />
        <SystemTray />
        <ChannelOpenView channel={openChannelData} launchMotion={launchMotion} onClose={closeChannel} stageRef={stageRef} />
      </main>
    </>
  );
}
