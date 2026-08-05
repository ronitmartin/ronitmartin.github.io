export function MissingLinkOpenContent() {
  return (
    <div className="missing-link-title-card">
      <div className="missing-link-title-grid" aria-hidden="true" />
      <div className="missing-link-title-orbit" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="missing-link-title-copy">
        <p className="missing-link-title-eyebrow">Digital-first Design Agency</p>
        <h2 className="missing-link-title-wordmark">
          Missing
          <br />
          <em>Link</em>
        </h2>
        <p className="missing-link-title-tagline">the bridge between where your brand is today and where it could be.</p>
      </div>
      <img className="missing-link-title-visual" src="/assets/channels/missing-link-hero.png" alt="" aria-hidden="true" />
    </div>
  );
}
