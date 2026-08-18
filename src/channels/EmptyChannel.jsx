export function EmptyChannelArtwork({ channel }) {
  return (
    <div className={`channel empty${channel.pageArrow ? " page-arrow" : ""}`} aria-hidden="true">
      {!channel.pageArrow && (
        <span className="empty-channel-static" aria-hidden="true">
          <img className="empty-channel-static-frame empty-channel-static-frame--1" src="/assets/channels/empty-static-1.png" alt="" />
          <img className="empty-channel-static-frame empty-channel-static-frame--2" src="/assets/channels/empty-static-2.png" alt="" />
          <img className="empty-channel-static-frame empty-channel-static-frame--3" src="/assets/channels/empty-static-3.png" alt="" />
          <img className="empty-channel-static-frame empty-channel-static-frame--4" src="/assets/channels/empty-static-4.png" alt="" />
        </span>
      )}
      {channel.pageArrow && <img src="/assets/wii-page-arrow.png" alt="" aria-hidden="true" />}
    </div>
  );
}
