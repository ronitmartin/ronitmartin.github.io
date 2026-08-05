export function ChannelArtwork({ channel }) {
  if (channel.type === "missing-link") {
    return (
      <div className="channel asset-channel missing-link-channel" aria-label={channel.title}>
        <div className="missing-link-channel-grid" aria-hidden="true" />
        <img className="missing-link-channel-symbol" src="/assets/missing-link-3d.png" alt="" aria-hidden="true" />
        <div className="missing-link-channel-copy">
          <span className="missing-link-channel-kicker">Digital-first Design Agency</span>
          <strong>
            Missing Link
            <span>Studio</span>
          </strong>
        </div>
      </div>
    );
  }

  if (channel.type === "mii") {
    return (
      <div className="channel asset-channel mii-channel" aria-label={channel.title}>
        <img className="mii-channel-art" src="/assets/channels/mii-channel-crowd.jpg" alt="" aria-hidden="true" />
      </div>
    );
  }

  if (channel.type === "photo") {
    return (
      <div className="channel asset-channel photo-channel" aria-label={channel.title}>
        <img className="photo-cork" src="/assets/channels/photo-cork.png" alt="" aria-hidden="true" />
        <img className="photo-sky" src="/assets/channels/photo-sky.png" alt="" aria-hidden="true" />
        <img className="photo-rose" src="/assets/channels/photo-rose.png" alt="" aria-hidden="true" />
        <img className="photo-title" src="/assets/channels/photo-title.png" alt="" aria-hidden="true" />
      </div>
    );
  }

  if (channel.type === "shop") {
    return (
      <div className="channel asset-channel shop-channel" aria-label={channel.title}>
        <img className="shop-bags" src="/assets/channels/shop-bags.png" alt="" aria-hidden="true" />
        <img className="shop-title" src="/assets/channels/shop-title.png" alt="" aria-hidden="true" />
      </div>
    );
  }

  if (channel.type === "forecast") {
    return (
      <div className="channel asset-channel forecast" aria-label={channel.title}>
        <img className="forecast-sun" src="/assets/channels/forecast-sun.png" alt="" aria-hidden="true" />
        <span>Forecast Channel</span>
      </div>
    );
  }

  if (channel.type === "news") {
    return (
      <div className="channel asset-channel news" aria-label={channel.title}>
        <img className="news-noise" src="/assets/channels/news-noise.png" alt="" aria-hidden="true" />
        <img className="news-map news-map-west" src="/assets/channels/news-map-west.png" alt="" aria-hidden="true" />
        <img className="news-map news-map-east" src="/assets/channels/news-map-east.png" alt="" aria-hidden="true" />
        <img className="news-title" src="/assets/channels/news-title.png" alt="" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div className={`channel empty${channel.pageArrow ? " page-arrow" : ""}`} aria-hidden="true">
      {channel.pageArrow && <img src="/assets/wii-page-arrow.png" alt="" aria-hidden="true" />}
    </div>
  );
}
