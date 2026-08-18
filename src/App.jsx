import { useEffect, useRef, useState } from "react";
import { ChannelShapeDefinitions } from "./components/ChannelShapeDefinitions";
import { HomeMenu } from "./views/HomeMenu";
import { SystemMenu } from "./views/SystemMenu";
import { useChannelTransition } from "./hooks/useChannelTransition";
import { useDayNightTheme } from "./hooks/useDayNightTheme";
import { useDisplayMode } from "./hooks/useDisplayMode";
import { channels } from "./data/channels";
import { getChannelIdFromUrl, setChannelIdInUrl } from "./routing/channelUrl";

export function App() {
  const screenRef = useRef(null);
  const stageRef = useRef(null);
  const [isMessageBoardOpen, setIsMessageBoardOpen] = useState(false);
  const [isStartupActive, setIsStartupActive] = useState(true);
  const [activeView, setActiveView] = useState("menu");
  const [isScreenCovered, setIsScreenCovered] = useState(false);
  const [isViewTransitioning, setIsViewTransitioning] = useState(false);
  const viewTransitionTimersRef = useRef([]);
  const initialChannelHandledRef = useRef(false);
  const channelTransition = useChannelTransition({
    screenRef,
    stageRef,
  });
  const { isLoading, isOpen, openChannel } = channelTransition;
  const { isDark, toggleTheme } = useDayNightTheme();
  const { isCrt, toggleDisplayMode } = useDisplayMode();

  useEffect(() => {
    return () => {
      viewTransitionTimersRef.current.forEach((timerId) => window.clearTimeout(timerId));
    };
  }, []);

  useEffect(() => {
    if (isStartupActive || activeView !== "menu" || initialChannelHandledRef.current) {
      return;
    }

    initialChannelHandledRef.current = true;
    const channelId = getChannelIdFromUrl();
    if (!channelId) {
      return;
    }

    const channel = channels.find((item) => item.id === channelId && item.type !== "empty");
    if (!channel) {
      setChannelIdInUrl(null);
      return;
    }

    const frame = screenRef.current?.querySelector(`[data-channel-id="${CSS.escape(channel.id)}"]`);
    if (!frame) {
      setChannelIdInUrl(null);
      return;
    }

    openChannel(channel, frame);
  }, [activeView, isStartupActive, openChannel]);

  function transitionToView(nextView) {
    if (isViewTransitioning || activeView === nextView) {
      return;
    }

    setIsViewTransitioning(true);
    setIsScreenCovered(true);

    const swapTimer = window.setTimeout(() => {
      setActiveView(nextView);

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setIsScreenCovered(false));
      });

      const finishTimer = window.setTimeout(() => {
        setIsViewTransitioning(false);
      }, 260);

      viewTransitionTimersRef.current.push(finishTimer);
    }, 220);

    viewTransitionTimersRef.current.push(swapTimer);
  }

  return (
    <>
      <ChannelShapeDefinitions />
      <main
        ref={screenRef}
        className={`wii-screen${isOpen ? " is-channel-open" : ""}${isLoading ? " is-channel-loading" : ""}${isMessageBoardOpen ? " is-message-board-open" : ""}${isStartupActive ? " is-startup-active" : ""}${activeView === "system" ? " is-system-menu-open" : ""}${isViewTransitioning ? " is-view-transitioning" : ""}${isDark ? " is-dark" : ""}${isCrt ? " is-crt" : ""}`}
        aria-label="Interactive recreation of the Wii Menu"
      >
        {activeView === "menu" ? (
          <HomeMenu
            channelTransition={channelTransition}
            isMessageBoardOpen={isMessageBoardOpen}
            isStartupActive={isStartupActive}
            onCloseMessageBoard={() => setIsMessageBoardOpen(false)}
            onFinishStartup={() => setIsStartupActive(false)}
            onOpenMessageBoard={() => setIsMessageBoardOpen(true)}
            onOpenSystemMenu={() => transitionToView("system")}
            stageRef={stageRef}
          />
        ) : (
          <SystemMenu
            isCrt={isCrt}
            isDark={isDark}
            onBack={() => transitionToView("menu")}
            onToggleDisplay={toggleDisplayMode}
            onToggleTheme={toggleTheme}
          />
        )}

        <div className={`screen-view-fade${isScreenCovered ? " is-visible" : ""}`} aria-hidden="true" />
      </main>
    </>
  );
}
