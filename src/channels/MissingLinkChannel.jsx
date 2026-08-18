export function MissingLinkChannel() {
  return (
    <div className="missing-link-title-card">
      <div className="missing-link-title-dots" aria-hidden="true" />
      <div className="missing-link-title-glow" aria-hidden="true" />
      <span className="missing-link-title-symbol" aria-hidden="true">
        <img className="missing-link-title-symbol-image" src="/assets/missing-link-3d.png" alt="" />
      </span>
      <div className="missing-link-title-copy">
        <h2 className="missing-link-title-wordmark">
          <span className="missing-link-title-word missing-link-title-word--missing">Missing</span>
          <em>
            <span className="missing-link-title-word missing-link-title-word--link">Link</span>
            <span className="missing-link-title-word missing-link-title-word--studio">Studio</span>
          </em>
        </h2>
        <p className="missing-link-title-tagline">the bridge between where your brand is today and where it could be.</p>
      </div>
      <span className="missing-link-title-kicker">Digital-first Design Agency</span>
    </div>
  );
}

export function MissingLinkChannelArtwork({ channel }) {
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
