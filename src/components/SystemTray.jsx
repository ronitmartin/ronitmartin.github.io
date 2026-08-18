import { SystemDate, SystemTime } from "./SystemClock";

export function MenuPanelInfo() {
  return (
    <section className="menu-panel-info" aria-label="Current time">
      <svg className="tray-shape" viewBox="0 0 1000 340" preserveAspectRatio="none" aria-hidden="true">
        <path className="tray-line" d="M0 0H168C234 0 255 18 286 61 314 99 333 114 379 114H621C667 114 686 99 714 61 745 18 766 0 832 0H1000" />
      </svg>

      <SystemTime />
      <div className="wii-menu-intro" aria-hidden="true">
        Ron Menu
      </div>
    </section>
  );
}

export function SystemTray({ isMessageBoardOpen, onCloseMessageBoard, onOpenMessageBoard, onOpenSystemMenu }) {
  return (
    <section className={`system-tray${isMessageBoardOpen ? " is-board-open" : ""}`} aria-label="Wii Menu system controls">
      <svg className="tray-shape" viewBox="0 0 1000 340" preserveAspectRatio="none" aria-hidden="true">
        <path className="tray-fill" d="M0 0H168C234 0 255 18 286 61 314 99 333 114 379 114H621C667 114 686 99 714 61 745 18 766 0 832 0H1000V340H0Z" />
      </svg>

      <div className="system-tray-controls system-tray-controls--menu" aria-hidden={isMessageBoardOpen} inert={isMessageBoardOpen}>
        <SystemDate />

        <button
          className="round-control ron-button"
          type="button"
          aria-label="Open Ron system menu"
          onClick={onOpenSystemMenu}
        >
          <img className="wii-button-surface" src="/assets/wii-button-surface.png" alt="" aria-hidden="true" />
          <img className="wii-button-logo" src="/assets/ron-button-logo.png" alt="" aria-hidden="true" />
        </button>

        <div className="sd-card" aria-label="SD card">
          <img src="/assets/wii-sd-card.png" alt="" aria-hidden="true" />
        </div>
      </div>

      <div className="system-tray-controls system-tray-controls--board" aria-hidden={!isMessageBoardOpen}>
        <SystemDate className="message-board-date" id="message-board-date" />
      </div>

      <button
        className={`round-control message-toggle-button ${isMessageBoardOpen ? "message-board-return" : "message-button"}`}
        type="button"
        aria-label={isMessageBoardOpen ? "Return to Ron Menu" : "Open message board"}
        onClick={isMessageBoardOpen ? onCloseMessageBoard : onOpenMessageBoard}
      >
        <span className="message-toggle-artwork message-toggle-artwork--message" aria-hidden="true">
          <img className="message-button-surface" src="/assets/wii-button-surface.png" alt="" />
          <img className="message-button-icon" src="/assets/wii-message-icon.png" alt="" />
        </span>
        <span className="message-toggle-artwork message-toggle-artwork--ron" aria-hidden="true">
          <img className="wii-button-surface" src="/assets/wii-button-surface.png" alt="" />
          <img className="wii-button-logo" src="/assets/ron-button-logo.png" alt="" />
        </span>
      </button>
    </section>
  );
}
