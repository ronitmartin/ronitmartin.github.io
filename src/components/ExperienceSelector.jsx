const experiences = [
  {
    id: "classic",
    number: "01",
    eyebrow: "Focused / Direct",
    title: ["Classic", "Portfolio"],
    description:
      "A concise view of my background, skills, and current projects for recruiters and collaborators.",
    action: "Enter classic",
  },
  {
    id: "wii",
    number: "02",
    eyebrow: "Interactive / Playful",
    title: ["Wii Menu", "Portfolio"],
    description:
      "Explore my work through a fully interactive portfolio inspired by the Nintendo Wii Menu.",
    action: "Enter Wii Menu",
  },
];

function ExperiencePreview({ type }) {
  if (type === "classic") {
    return (
      <span className="experience-preview experience-preview--classic" aria-hidden="true">
        <span className="classic-preview-kicker" />
        <span className="classic-preview-heading" />
        <span className="classic-preview-heading classic-preview-heading--short" />
        <span className="classic-preview-portrait" />
        <span className="classic-preview-line" />
        <span className="classic-preview-line classic-preview-line--short" />
      </span>
    );
  }

  return (
    <span className="experience-preview experience-preview--wii" aria-hidden="true">
      <span className="wii-preview-topbar" />
      <span className="wii-preview-grid">
        {Array.from({ length: 6 }, (_, index) => (
          <span key={index} className={`wii-preview-channel wii-preview-channel--${index + 1}`} />
        ))}
      </span>
      <span className="wii-preview-dock" />
    </span>
  );
}

export function ExperienceSelector({ onSelect }) {
  return (
    <main className="experience-gate">
      <header className="experience-gate__meta">
        <span>Ronit Martin / Digital Portfolio</span>
        <span>Design / Code / Experiments</span>
      </header>

      <section className="experience-gate__intro" aria-labelledby="experience-title">
        <p>Two ways in. Same person.</p>
        <h1 id="experience-title">Choose your experience</h1>
      </section>

      <section className="experience-options" aria-label="Portfolio versions">
        {experiences.map((experience) => (
          <button
            key={experience.id}
            className={`experience-card experience-card--${experience.id}`}
            type="button"
            onClick={() => onSelect(experience.id)}
          >
            <span className="experience-card__topline">
              <span>{experience.number}</span>
              <span>{experience.eyebrow}</span>
            </span>
            <ExperiencePreview type={experience.id} />
            <span className="experience-card__copy">
              <strong>
                {experience.title.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </strong>
              <span className="experience-card__description">{experience.description}</span>
            </span>
            <span className="experience-card__action">
              {experience.action}
              <span aria-hidden="true">↗</span>
            </span>
          </button>
        ))}
      </section>

      <footer className="experience-gate__footer">
        <span>Built for web / desktop / mobile</span>
        <span>© {new Date().getFullYear()} Ronit Martin</span>
      </footer>
    </main>
  );
}
