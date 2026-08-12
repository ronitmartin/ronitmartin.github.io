import { SystemClock } from "./SystemClock";

export function SystemTray({ isDark, onToggleTheme }) {
  return (
    <section className="system-tray" aria-label="Wii Menu system controls">
      <svg className="tray-shape" viewBox="0 0 1000 340" preserveAspectRatio="none" aria-hidden="true">
        <path className="tray-fill" d="M0 0H168C234 0 255 18 286 61 314 99 333 114 379 114H621C667 114 686 99 714 61 745 18 766 0 832 0H1000V340H0Z" />
        <path className="tray-line" d="M0 0H168C234 0 255 18 286 61 314 99 333 114 379 114H621C667 114 686 99 714 61 745 18 766 0 832 0H1000" />
      </svg>

      <SystemClock />
      <div className="wii-menu-intro" aria-hidden="true">
        Wii Menu
      </div>

      <button
        className="round-control ron-button"
        type="button"
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        aria-pressed={isDark}
        onClick={onToggleTheme}
      >
        <img className="wii-button-surface" src="/assets/wii-button-surface.png" alt="" aria-hidden="true" />
        <img className="wii-button-logo" src="/assets/ron-button-logo.png" alt="" aria-hidden="true" />
      </button>

      <div className="sd-card" aria-label="SD card">
        <img src="/assets/wii-sd-card.png" alt="" aria-hidden="true" />
      </div>

      <button className="round-control message-button" type="button" aria-label="Wii Message Board">
        <img className="message-button-surface" src="/assets/wii-button-surface.png" alt="" aria-hidden="true" />
        <img className="message-button-icon" src="/assets/wii-message-icon.png" alt="" aria-hidden="true" />
      </button>
    </section>
  );
}
