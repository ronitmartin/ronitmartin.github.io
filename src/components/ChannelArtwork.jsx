export function ChannelArtwork({ channel }) {
  if (channel.type === "disc") {
    return (
      <div className="channel asset-channel disc-channel" aria-label={channel.title}>
        <svg className="channel-disc" viewBox="0 0 200 200" aria-hidden="true">
          <defs>
            <radialGradient id="disc-face" cx="50%" cy="40%" r="75%">
              <stop offset="0%" stopColor="#1c2536" />
              <stop offset="55%" stopColor="#0b0b0b" />
              <stop offset="100%" stopColor="#020202" />
            </radialGradient>
          </defs>
          <circle cx="100" cy="100" r="96" fill="url(#disc-face)" stroke="#168cff" strokeWidth="2" strokeOpacity="0.55" />
          <circle cx="100" cy="100" r="96" fill="none" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.08" />
          <g transform="translate(72 72) scale(2.3)">
            <path d="M22 19.2727C22 20.779 20.779 22 19.2727 22H14.7273C13.221 22 12 20.779 12 19.2727V12H19.2727C20.779 12 22 13.221 22 14.7273V19.2727Z" fill="#68C4FF" />
            <path d="M20 2C21.1046 2 22 2.89543 22 4V7C22 8.10457 21.1046 9 20 9H17C15.8954 9 15 8.10457 15 7V4C15 2.89543 15.8954 2 17 2H20Z" fill="#0C79D8" />
            <path d="M7 15C8.10457 15 9 15.8954 9 17V20C9 21.1046 8.10457 22 7 22H4C2.89543 22 2 21.1046 2 20V17C2 15.8954 2.89543 15 4 15H7Z" fill="#0C79D8" />
            <path d="M12 12H4.72727C3.22104 12 2 10.779 2 9.27273V4.72727C2 3.22104 3.22104 2 4.72727 2H9.27273C10.779 2 12 3.22104 12 4.72727V12Z" fill="#2E9EFF" />
          </g>
        </svg>
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
