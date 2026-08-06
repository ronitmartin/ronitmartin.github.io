import { ChannelOpenContent } from "./ChannelOpenContent";

export function ChannelOpenView({ channel, onClose, stageRef }) {
  const hasStartUrl = Boolean(channel?.startUrl);

  function openStartUrl() {
    if (!channel?.startUrl) {
      return;
    }

    window.open(channel.startUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <section className="channel-open-view" aria-hidden={channel ? "false" : "true"}>
      <div className="channel-open-stage" ref={stageRef}>
        <div className="channel-open-frame" aria-hidden="true">
          <div className="channel-open-bluebar" />
          <h1 className="channel-open-title">{channel?.title || "Channel"}</h1>
          <div className={`channel-open-content${channel?.openType ? ` channel-open-content--${channel.openType}` : ""}`}>
            <ChannelOpenContent channel={channel} />
          </div>
        </div>

        <button className="channel-menu-button" type="button" onClick={onClose}>
          Wii Menu
        </button>
        <button className="channel-start-button" type="button" disabled={!hasStartUrl} onClick={openStartUrl}>
          Start
        </button>
      </div>
    </section>
  );
}
