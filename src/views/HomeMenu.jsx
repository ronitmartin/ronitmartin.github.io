import { ChannelGrid } from "../components/ChannelGrid";
import { ChannelOpenView } from "../components/ChannelOpenView";
import { StartupSequence } from "../components/StartupSequence";
import { MenuPanelInfo, SystemTray } from "../components/SystemTray";
import { ContactBoard } from "./ContactBoard";

export function HomeMenu({
  channelTransition,
  isMessageBoardOpen,
  isStartupActive,
  onCloseMessageBoard,
  onFinishStartup,
  onOpenMessageBoard,
  onOpenSystemMenu,
  stageRef,
}) {
  const { closeChannel, isLoading, launchKey, launchStyle, navigateChannel, openChannel, openChannelData } = channelTransition;

  return (
    <>
      <SystemTray
        isMessageBoardOpen={isMessageBoardOpen}
        onCloseMessageBoard={onCloseMessageBoard}
        onOpenMessageBoard={onOpenMessageBoard}
        onOpenSystemMenu={onOpenSystemMenu}
      />

      <ContactBoard isOpen={isMessageBoardOpen} />

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

      {isStartupActive && <StartupSequence onComplete={onFinishStartup} />}
    </>
  );
}
