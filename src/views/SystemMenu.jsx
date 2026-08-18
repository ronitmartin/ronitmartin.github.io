export function SystemMenu({ isCrt, isDark, onBack, onToggleDisplay, onToggleTheme }) {
  return (
    <section className="ron-system-menu" aria-label="Ron system menu">
      <header className="ron-system-menu-header">
        <img src="/assets/ron-button-logo.png" alt="Ron" />
      </header>

      <div className="ron-system-menu-rule" aria-hidden="true" />

      <div className="ron-system-menu-options">
        <button
          className={`ron-system-menu-option ron-system-menu-option--data ron-system-menu-option--display${isCrt ? " is-crt" : ""}`}
          type="button"
          aria-label={`Switch to ${isCrt ? "full" : "CRT"} display`}
          aria-pressed={isCrt}
          onClick={onToggleDisplay}
        >
          <img src="/assets/system-menu/data-management-clean.png" alt="" aria-hidden="true" />
          <div className="ron-system-menu-data-art" aria-hidden="true">
            <div className="ron-system-menu-data-icon" />
          </div>
          <span>{`Set Display - ${isCrt ? "CRT" : "Full"}`}</span>
        </button>

        <button
          className={`ron-system-menu-option ron-system-menu-option--theme${isDark ? " is-dark" : ""}`}
          type="button"
          aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
          aria-pressed={isDark}
          onClick={onToggleTheme}
        >
          <img src="/assets/system-menu/data-management-clean.png" alt="" aria-hidden="true" />
          <div className="ron-system-menu-theme-art" aria-hidden="true">
            <svg className="ron-system-menu-theme-icon ron-system-menu-theme-icon--sun" viewBox="0 0 160 160">
              <g className="ron-system-menu-theme-rays">
                <path d="M80 8v18M80 134v18M8 80h18M134 80h18M31 31l12.7 12.7M116.3 116.3L129 129M129 31l-12.7 12.7M43.7 116.3L31 129" />
              </g>
              <circle cx="80" cy="80" r="34" />
            </svg>
            <svg className="ron-system-menu-theme-icon ron-system-menu-theme-icon--moon" viewBox="0 0 160 160">
              <path d="M140 85.3A60 60 0 1 1 74.7 20 46.7 46.7 0 0 0 140 85.3Z" />
            </svg>
          </div>
          <span>{`Set Theme - ${isDark ? "Dark" : "Light"}`}</span>
        </button>
      </div>

      <div className="ron-system-menu-footer">
        <button className="ron-system-menu-back" type="button" onClick={onBack}>
          <img src="/assets/wii-send-button.png" alt="" aria-hidden="true" />
          <span>Back</span>
        </button>
      </div>
    </section>
  );
}
