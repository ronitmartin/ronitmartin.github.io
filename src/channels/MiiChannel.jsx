export function MiiChannelArtwork({ channel }) {
  return (
    <div className="channel asset-channel mii-channel" aria-label={channel.title}>
      <img className="mii-channel-art" src="/assets/channels/mii-channel-crowd.jpg" alt="" aria-hidden="true" />
    </div>
  );
}
