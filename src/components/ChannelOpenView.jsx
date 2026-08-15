import { useEffect, useRef, useState } from "react";
import { ChannelOpenContent } from "./ChannelOpenContent";

const OWN_TITLE_TREATMENT_TYPES = new Set(["missing-link", "github"]);
const KEYBOARD_ARROW_FEEDBACK_DURATION = 700;

export function ChannelOpenView({ channel, launchKey, launchStyle, onClose, onNavigate, stageRef }) {
  const hasOwnTitleTreatment = OWN_TITLE_TREATMENT_TYPES.has(channel?.openType);
  const isChannelOpen = Boolean(channel);
  const [keyboardDirection, setKeyboardDirection] = useState(null);
  const keyboardFeedbackTimeout = useRef(null);
  const onNavigateRef = useRef(onNavigate);
  onNavigateRef.current = onNavigate;

  useEffect(() => {
    if (!isChannelOpen) {
      setKeyboardDirection(null);
      return undefined;
    }

    function handleKeyDown(event) {
      const direction = event.key === "ArrowLeft" ? -1 : event.key === "ArrowRight" ? 1 : 0;
      if (!direction || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
        return;
      }

      const target = event.target;
      if (target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|SELECT|TEXTAREA)$/.test(target.tagName))) {
        return;
      }

      event.preventDefault();
      onNavigateRef.current?.(direction);
      setKeyboardDirection(direction);
      window.clearTimeout(keyboardFeedbackTimeout.current);
      keyboardFeedbackTimeout.current = window.setTimeout(() => {
        setKeyboardDirection(null);
      }, KEYBOARD_ARROW_FEEDBACK_DURATION);
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.clearTimeout(keyboardFeedbackTimeout.current);
    };
  }, [isChannelOpen]);

  function openStartUrl() {
    if (!channel?.startUrl) {
      return;
    }

    window.open(channel.startUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <section className="channel-open-view" aria-hidden={channel ? "false" : "true"}>
      <div key={launchKey} className="channel-open-stage" ref={stageRef} style={launchStyle}>
        <div className="channel-open-frame" aria-hidden="true">
          {!hasOwnTitleTreatment && (
            <>
              <div className="channel-open-bluebar" />
              <h1 className="channel-open-title">{channel?.title || "Channel"}</h1>
            </>
          )}
          <div
            key={`${channel?.id || "empty"}-content`}
            className={`channel-open-content${channel?.openType ? ` channel-open-content--${channel.openType}` : ""}`}
          >
            <ChannelOpenContent channel={channel} />
          </div>
        </div>

        <button className="channel-menu-button" type="button" onClick={onClose} aria-label="Ron Menu">
          <svg className="channel-button-svg" width="560" height="162" viewBox="0 0 560 162" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
            <g opacity="0.9" filter="url(#filter0_dii_16_9)">
              <rect x="7" y="7" width="546" height="148" rx="74" fill="#E3E8EF" />
              <rect x="7" y="7" width="546" height="148" rx="74" stroke="#34BEED" strokeWidth="4" />
              <g filter="url(#filter1_f_16_9)">
                <path d="M89.108 61.1313C35.1323 61.1313 25.9698 89.0437 28.1355 103C-1.05148 50.8 56.1229 16 76.6137 16H482.431C516.915 16 513.417 61.1313 482.431 61.1313H89.108Z" fill="white" />
              </g>
              <path d="M135.53125 98V52.1875H155.84375Q161.96875 52.1875 165.15625 53.421875Q168.34375 54.65625 170.25 57.78125Q172.15625 60.90625 172.15625 64.6875Q172.15625 69.5625 169 72.90625Q165.84375 76.25 159.25 77.15625Q161.65625 78.3125 162.90625 79.4375Q165.5625 81.875 167.9375 85.53125L175.90625 98H168.28125L162.21875 88.46875Q159.5625 84.34375 157.84375 82.15625Q156.125 79.96875 154.765625 79.09375Q153.40625 78.21875 152 77.875Q150.96875 77.65625 148.625 77.65625H141.59375V98ZM141.59375 72.40625H154.625Q158.78125 72.40625 161.125 71.546875Q163.46875 70.6875 164.6875 68.796875Q165.90625 66.90625 165.90625 64.6875Q165.90625 61.4375 163.546875 59.34375Q161.1875 57.25 156.09375 57.25H141.59375ZM178.84375 81.40625Q178.84375 72.1875 183.96875 67.75Q188.25 64.0625 194.40625 64.0625Q201.25 64.0625 205.59375 68.546875Q209.9375 73.03125 209.9375 80.9375Q209.9375 87.34375 208.015625 91.015625Q206.09375 94.6875 202.421875 96.71875Q198.75 98.75 194.40625 98.75Q187.4375 98.75 183.140625 94.28125Q178.84375 89.8125 178.84375 81.40625ZM184.625 81.40625Q184.625 87.78125 187.40625 90.953125Q190.1875 94.125 194.40625 94.125Q198.59375 94.125 201.375 90.9375Q204.15625 87.75 204.15625 81.21875Q204.15625 75.0625 201.359375 71.890625Q198.5625 68.71875 194.40625 68.71875Q190.1875 68.71875 187.40625 71.875Q184.625 75.03125 184.625 81.40625ZM216.53125 98V64.8125H221.59375V69.53125Q225.25 64.0625 232.15625 64.0625Q235.15625 64.0625 237.671875 65.140625Q240.1875 66.21875 241.4375 67.96875Q242.6875 69.71875 243.1875 72.125Q243.5 73.6875 243.5 77.59375V98H237.875V77.8125Q237.875 74.375 237.21875 72.671875Q236.5625 70.96875 234.890625 69.953125Q233.21875 68.9375 230.96875 68.9375Q227.375 68.9375 224.765625 71.21875Q222.15625 73.5 222.15625 79.875V98Z" fill="#383E3F" stroke="#383E3F" strokeWidth="1.2" strokeLinejoin="round" />
              <path transform="translate(19 0)" d="M300.423 98H294.169V72.335C294.169 69.149 294.464 63.131 294.582 59.827H294.346C294.11 61.42 293.284 64.429 292.93 65.55L281.956 98H275.702L264.787 65.727C264.315 64.37 263.489 61.656 263.076 59.827H262.84C262.899 63.072 263.135 68.264 263.135 72.453V98H257.294V51.98H266.557L277.354 84.135C278.003 86.082 278.652 88.442 278.77 89.504H278.947C279.065 88.442 279.655 86.082 280.304 84.135L291.101 51.98H300.423V98ZM338.711 81.598L314.167 84.784C314.875 90.153 319.005 93.457 324.433 93.457C328.917 93.457 333.106 91.097 335.171 87.085L338.475 91.215C335.348 95.935 330.923 98.708 324.02 98.708C314.521 98.708 308.149 92.041 308.149 81.657C308.149 71.804 314.108 64.665 323.843 64.665C332.811 64.665 338.711 70.86 338.711 80.595C338.711 80.949 338.711 81.244 338.711 81.598ZM332.516 77.409C332.103 73.043 328.681 69.857 323.784 69.857C318.12 69.857 314.285 73.692 314.049 79.887L332.516 77.409ZM374.026 98H367.595V76.937C367.595 72.512 364.586 69.975 360.515 69.975C356.68 69.975 353.14 71.981 351.842 75.993V98H345.411V65.373H351.311V69.857C352.845 66.848 356.739 64.665 362.167 64.665C369.188 64.665 374.026 69.267 374.026 75.934V98ZM411.246 98H405.287V93.575C403.694 96.643 399.505 98.708 394.49 98.708C387.587 98.708 382.572 94.342 382.572 87.675V65.373H389.003V86.2C389.003 90.625 392.071 93.162 396.083 93.162C399.977 93.162 403.458 91.097 404.756 87.144V65.373H411.246V98Z" fill="#383E3F" />
            </g>
            <defs>
              <filter id="filter0_dii_16_9" x="0" y="-5" width="565" height="171" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset />
                <feGaussianBlur stdDeviation="2.5" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.203922 0 0 0 0 0.745098 0 0 0 0 0.929412 0 0 0 1 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_16_9" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_16_9" result="shape" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feMorphology radius="16" operator="erode" in="SourceAlpha" result="effect2_innerShadow_16_9" />
                <feOffset dy="-10" />
                <feGaussianBlur stdDeviation="9.5" />
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.695347 0 0 0 0 0.737503 0 0 0 0 0.79371 0 0 0 1 0" />
                <feBlend mode="normal" in2="shape" result="effect2_innerShadow_16_9" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dx="10" dy="9" />
                <feGaussianBlur stdDeviation="30" />
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
                <feBlend mode="normal" in2="effect2_innerShadow_16_9" result="effect3_innerShadow_16_9" />
              </filter>
              <filter id="filter1_f_16_9" x="17" y="13" width="493" height="93" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="1.5" result="effect1_foregroundBlur_16_9" />
              </filter>
            </defs>
          </svg>
        </button>
        <button className="channel-start-button" type="button" onClick={openStartUrl} aria-label="Start">
          <svg className="channel-button-svg" width="560" height="162" viewBox="0 0 560 162" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
            <g opacity="0.9" filter="url(#filter0_dii_16_12)">
              <rect x="7" y="7" width="546" height="148" rx="74" fill="#E3E8EF" />
              <rect x="7" y="7" width="546" height="148" rx="74" stroke="#34BEED" strokeWidth="4" />
              <g filter="url(#filter1_f_16_12)">
                <path d="M89.108 61.1313C35.1323 61.1313 25.9698 89.0437 28.1355 103C-1.05148 50.8 56.1229 16 76.6137 16H482.431C516.915 16 513.417 61.1313 482.431 61.1313H89.108Z" fill="white" />
              </g>
              <path d="M246.872 85.374C246.872 93.87 241.031 99.062 230.588 99.062C221.679 99.062 215.661 94.283 213.301 87.144L218.434 83.722C220.381 89.268 225.101 93.162 230.529 93.162C236.488 93.162 240.028 90.212 240.028 86.023C240.028 82.011 237.55 79.71 232.063 77.822L225.396 75.521C218.139 72.925 215.012 69.739 215.012 63.485C215.012 56.641 220.794 50.918 229.998 50.918C237.904 50.918 243.037 53.809 245.515 60.122L240.382 63.78C238.671 58.883 235.072 56.582 230.234 56.582C224.806 56.582 221.561 59.591 221.561 63.19C221.561 66.199 223.449 68.205 228.287 69.798L235.19 72.04C242.624 74.577 246.872 78.353 246.872 85.374ZM270.924 93.221L269.567 98.708C260.186 98.708 256.941 96.702 256.941 89.445V70.506H252.339V65.373H257.177V55.107H263.372V65.373H269.154V70.506H263.372V88.265C263.372 92.867 264.316 93.221 270.924 93.221ZM306.344 92.985L305.046 98.354C304.22 98.531 303.394 98.649 302.627 98.649C299.5 98.649 296.904 97.115 296.55 94.106C294.721 97.056 289.588 98.708 284.514 98.708C277.847 98.708 274.543 95.581 274.425 90.153C274.425 90.035 274.425 89.917 274.425 89.799C274.425 83.486 278.732 80.3 285.753 78.766C290.591 77.645 294.898 75.875 294.898 74.046C294.898 70.801 292.479 69.798 287.936 69.798C284.573 69.798 279.676 71.922 277.788 74.99L275.015 70.27C277.729 66.848 282.626 64.665 288.349 64.665C296.904 64.665 301.624 67.615 301.624 74.518V90.035C301.624 92.277 302.745 93.28 304.515 93.28C305.046 93.28 305.695 93.162 306.344 92.985ZM295.193 88.383V79.946C293.777 81.362 290.768 82.424 287.346 83.309C283.275 84.312 280.679 85.551 280.679 89.209C280.679 89.327 280.679 89.445 280.679 89.563C280.856 92.277 282.508 93.634 285.871 93.634C289.352 93.634 294.131 91.628 295.193 88.383ZM328.34 70.683C327.455 70.565 326.629 70.447 325.862 70.447C321.732 70.447 318.723 72.335 317.484 75.58V98H311.053V65.373H316.717V68.795C318.664 66.081 322.204 64.842 327.101 64.665L328.34 70.683ZM349.745 93.221L348.388 98.708C339.007 98.708 335.762 96.702 335.762 89.445V70.506H331.16V65.373H335.998V55.107H342.193V65.373H347.975V70.506H342.193V88.265C342.193 92.867 343.137 93.221 349.745 93.221Z" fill="#303030" />
            </g>
            <defs>
              <filter id="filter0_dii_16_12" x="0" y="-5" width="565" height="171" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset />
                <feGaussianBlur stdDeviation="2.5" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.203922 0 0 0 0 0.745098 0 0 0 0 0.929412 0 0 0 1 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_16_12" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_16_12" result="shape" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feMorphology radius="16" operator="erode" in="SourceAlpha" result="effect2_innerShadow_16_12" />
                <feOffset dy="-10" />
                <feGaussianBlur stdDeviation="9.5" />
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.695347 0 0 0 0 0.737503 0 0 0 0 0.79371 0 0 0 1 0" />
                <feBlend mode="normal" in2="shape" result="effect2_innerShadow_16_12" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dx="10" dy="9" />
                <feGaussianBlur stdDeviation="30" />
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
                <feBlend mode="normal" in2="effect2_innerShadow_16_12" result="effect3_innerShadow_16_12" />
              </filter>
              <filter id="filter1_f_16_12" x="17" y="13" width="493" height="93" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="1.5" result="effect1_foregroundBlur_16_12" />
              </filter>
            </defs>
          </svg>
        </button>

        <button
          className={`channel-nav-arrow channel-nav-arrow--prev${keyboardDirection === -1 ? " is-keyboard-active" : ""}`}
          type="button"
          aria-label="Previous channel"
          onClick={() => onNavigate?.(-1)}
        >
          <span className="channel-nav-arrow-motion" aria-hidden="true">
            <span className="channel-nav-arrow-press">
              <img className="channel-nav-arrow-triangle" src="/assets/wii-page-arrow.png" alt="" />
              <img className="channel-nav-arrow-badge" src="/assets/wii-nav-minus.png" alt="" />
            </span>
          </span>
        </button>
        <button
          className={`channel-nav-arrow channel-nav-arrow--next${keyboardDirection === 1 ? " is-keyboard-active" : ""}`}
          type="button"
          aria-label="Next channel"
          onClick={() => onNavigate?.(1)}
        >
          <span className="channel-nav-arrow-motion" aria-hidden="true">
            <span className="channel-nav-arrow-press">
              <img className="channel-nav-arrow-triangle" src="/assets/wii-page-arrow.png" alt="" />
              <img className="channel-nav-arrow-badge" src="/assets/wii-nav-plus.png" alt="" />
            </span>
          </span>
        </button>
      </div>
    </section>
  );
}
