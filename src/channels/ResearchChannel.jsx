export function ResearchChannel() {
  return (
    <div className="research-library">
      <div className="research-library-grid" aria-hidden="true" />
      <header className="research-library-header">
        <span className="research-library-eyebrow">Ronit Martin / Research</span>
        <h2>Research</h2>
        <p>Papers, experiments, and ideas worth documenting.</p>
      </header>

      <section className="research-library-empty" aria-label="Research papers coming soon">
        <span className="research-paper-stack" aria-hidden="true">
          <span className="research-paper research-paper--back" />
          <span className="research-paper research-paper--middle" />
          <span className="research-paper research-paper--front">
            <i />
            <i />
            <i />
          </span>
        </span>
        <div>
          <strong>The archive is being prepared.</strong>
          <p>Working papers and publications will appear here as they are released.</p>
        </div>
        <span className="research-library-status">Opening soon</span>
      </section>
    </div>
  );
}

export function ResearchChannelArtwork({ channel }) {
  return (
    <div className="channel research-channel" aria-label={channel.title}>
      <div className="research-channel-rule" aria-hidden="true" />
      <span className="research-channel-papers" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
      <div className="research-channel-copy">
        <strong>Research</strong>
        <span>Channel</span>
      </div>
    </div>
  );
}
