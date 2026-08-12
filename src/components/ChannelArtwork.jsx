export function ChannelArtwork({ channel }) {
  if (channel.type === "missing-link") {
    return (
      <div className="channel asset-channel missing-link-channel" aria-label={channel.title}>
        <div className="missing-link-channel-grid" aria-hidden="true" />
        <span className="missing-link-channel-symbol" aria-hidden="true">
          <img className="missing-link-channel-symbol-image" src="/assets/missing-link-3d.png" alt="" />
        </span>
        <div className="missing-link-channel-copy">
          <span className="missing-link-channel-kicker">Digital-first Design Agency</span>
          <strong>
            <span className="missing-link-word missing-link-word--missing">Missing</span>
            <span className="missing-link-word missing-link-word--link">Link</span>
            <span className="missing-link-word missing-link-word--studio">Studio</span>
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
        <img className="shop-avatar" src="/assets/channels/shop-avatar.png" alt="" aria-hidden="true" />
        <span className="shop-title" aria-hidden="true">Ronotion Shop Channel</span>
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

  if (channel.type === "github") {
    return (
      <div className="channel asset-channel github-channel" aria-label={channel.title}>
        <svg className="github-mark" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
        </svg>
        <span>GitHub Channel</span>
      </div>
    );
  }

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
