export function PhotoChannelArtwork({ channel }) {
  return (
    <div className="channel asset-channel photo-channel" aria-label={channel.title}>
      <img className="photo-cork" src="/assets/channels/photo-cork.png" alt="" aria-hidden="true" />
      <img className="photo-sky" src="/assets/channels/photo-sky.png" alt="" aria-hidden="true" />
      <img className="photo-rose" src="/assets/channels/photo-rose.png" alt="" aria-hidden="true" />
      <img className="photo-title" src="/assets/channels/photo-title.png" alt="" aria-hidden="true" />
    </div>
  );
}
