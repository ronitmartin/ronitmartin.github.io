const COLUMN_COUNT = 4;
const ROW_COUNT = 3;

export function StartupSequence({ onComplete }) {
  return (
    <div
      className="startup-sequence"
      aria-hidden="true"
      onAnimationEnd={(event) => {
        if (event.currentTarget === event.target) onComplete?.();
      }}
    >
      <div className="startup-sequence-grid">
        {Array.from({ length: COLUMN_COUNT * ROW_COUNT }, (_, index) => {
          const row = Math.floor(index / COLUMN_COUNT);
          const column = index % COLUMN_COUNT;
          const waveStep = row + column;

          return (
            <div
              className="startup-sequence-tile"
              key={index}
              style={{
                "--startup-in-delay": `${0.16 + waveStep * 0.1}s`,
                "--startup-out-delay": `${1.34 + waveStep * 0.085}s`,
              }}
            >
              <div className="startup-sequence-tile-face">
                <img src="/assets/ron-button-logo.png" alt="" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
