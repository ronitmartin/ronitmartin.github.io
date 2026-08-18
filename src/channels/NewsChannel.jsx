export function NewsChannelArtwork({ channel }) {
  return (
    <div className="channel asset-channel news" aria-label={channel.title}>
      <img className="news-noise" src="/assets/channels/news-noise.png" alt="" aria-hidden="true" />
      <img className="news-map news-map-west" src="/assets/channels/news-map-west.png" alt="" aria-hidden="true" />
      <img className="news-map news-map-east" src="/assets/channels/news-map-east.png" alt="" aria-hidden="true" />
      <img className="news-title" src="/assets/channels/news-title.png" alt="" aria-hidden="true" />
    </div>
  );
}
