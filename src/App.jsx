import { useRef, useState } from "react";
import { ChannelGrid } from "./components/ChannelGrid";
import { ChannelOpenView } from "./components/ChannelOpenView";
import { ChannelShapeDefinitions } from "./components/ChannelShapeDefinitions";
import { MessageBoard } from "./components/MessageBoard";
import { StartupSequence } from "./components/StartupSequence";
import { MenuPanelInfo, SystemTray } from "./components/SystemTray";
import { useChannelTransition } from "./hooks/useChannelTransition";
import { useDayNightTheme } from "./hooks/useDayNightTheme";

export function App() {
  const screenRef = useRef(null);
  const stageRef = useRef(null);
  const [isMessageBoardOpen, setIsMessageBoardOpen] = useState(false);
  const [isStartupActive, setIsStartupActive] = useState(true);
  const { closeChannel, isLoading, isOpen, launchKey, launchStyle, navigateChannel, openChannel, openChannelData } = useChannelTransition({
    screenRef,
    stageRef,
  });
  const { isDark, toggleTheme } = useDayNightTheme();

  return (
    <>
      <ChannelShapeDefinitions />
      <main
        ref={screenRef}
        className={`wii-screen${isOpen ? " is-channel-open" : ""}${isLoading ? " is-channel-loading" : ""}${isMessageBoardOpen ? " is-message-board-open" : ""}${isStartupActive ? " is-startup-active" : ""}${isDark ? " is-dark" : ""}`}
        aria-label="Interactive recreation of the Wii Menu"
      >
        <SystemTray
          isDark={isDark}
          isMessageBoardOpen={isMessageBoardOpen}
          onCloseMessageBoard={() => setIsMessageBoardOpen(false)}
          onOpenMessageBoard={() => setIsMessageBoardOpen(true)}
          onToggleTheme={toggleTheme}
        />

        <MessageBoard isOpen={isMessageBoardOpen} />

        <div className="menu-panel-motion" aria-hidden={isMessageBoardOpen} inert={isMessageBoardOpen}>
          <div className="menu-surface">
            <div className="wii-night-sky" aria-hidden="true" />
            <ChannelGrid onOpen={openChannel} />
          </div>
          <MenuPanelInfo />
        </div>

        <ChannelOpenView
          channel={openChannelData}
          isLoading={isLoading}
          launchKey={launchKey}
          launchStyle={launchStyle}
          onClose={closeChannel}
          onNavigate={navigateChannel}
          stageRef={stageRef}
        />

        {isStartupActive && <StartupSequence onComplete={() => setIsStartupActive(false)} />}
      </main>
    </>
  );
}
