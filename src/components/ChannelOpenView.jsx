import { motion, useReducedMotion } from "framer-motion";
import { channelOpenContentMotion } from "../animations/wiiMotion";
import { ChannelOpenContent } from "./ChannelOpenContent";

const OWN_TITLE_TREATMENT_TYPES = new Set(["missing-link", "github"]);

export function ChannelOpenView({ channel, launchKey, launchMotion, onClose, onNavigate, stageRef }) {
  const hasOwnTitleTreatment = OWN_TITLE_TREATMENT_TYPES.has(channel?.openType);
  const shouldReduceMotion = useReducedMotion();

  function openStartUrl() {
    if (!channel?.startUrl) {
      return;
    }

    window.open(channel.startUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <section className="channel-open-view" aria-hidden={channel ? "false" : "true"}>
      <motion.div
        key={launchKey}
        className="channel-open-stage"
        ref={stageRef}
        initial={shouldReduceMotion ? false : launchMotion?.initial}
        animate={shouldReduceMotion ? undefined : launchMotion?.animate}
        transition={shouldReduceMotion ? undefined : launchMotion?.transition}
      >
        <div className="channel-open-frame" aria-hidden="true">
          {!hasOwnTitleTreatment && (
            <>
              <div className="channel-open-bluebar" />
              <h1 className="channel-open-title">{channel?.title || "Channel"}</h1>
            </>
          )}
          <motion.div
            key={`${channel?.id || "empty"}-content`}
            className={`channel-open-content${channel?.openType ? ` channel-open-content--${channel.openType}` : ""}`}
            initial={shouldReduceMotion ? false : channelOpenContentMotion.initial}
            animate={shouldReduceMotion ? undefined : channelOpenContentMotion.animate}
            transition={shouldReduceMotion ? undefined : channelOpenContentMotion.transition}
          >
            <ChannelOpenContent channel={channel} />
          </motion.div>
        </div>

        <button className="channel-menu-button" type="button" onClick={onClose} aria-label="Wii Menu">
          <svg className="channel-button-label" viewBox="370 64 546 148" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
            <path
              fill="#383E3F"
              d="M561.206 108.98L550.881 155H543.152L536.013 122.904C535.659 121.134 535.423 117.181 535.364 115.706C535.305 115.411 535.305 115.234 535.305 115.175H535.128C535.069 115.647 534.833 120.662 534.361 122.904L527.281 155H519.434L508.932 108.98H515.776L522.679 140.84C523.033 142.61 523.446 146.327 523.446 148.451H523.564C523.8 146.268 524.036 142.846 524.449 140.899L531.234 108.98H539.14L546.279 140.958C546.633 142.61 546.928 146.032 547.046 148.274H547.223C547.341 145.973 547.636 142.728 547.872 141.017L554.598 108.98H561.206ZM574.093 116.709H567.249V108.98H574.093V116.709ZM573.916 155H567.367V122.373H573.916V155ZM589.65 116.709H582.806V108.98H589.65V116.709ZM589.473 155H582.924V122.373H589.473V155ZM663.423 155H657.169V129.335C657.169 126.149 657.464 120.131 657.582 116.827H657.346C657.11 118.42 656.284 121.429 655.93 122.55L644.956 155H638.702L627.787 122.727C627.315 121.37 626.489 118.656 626.076 116.827H625.84C625.899 120.072 626.135 125.264 626.135 129.453V155H620.294V108.98H629.557L640.354 141.135C641.003 143.082 641.652 145.442 641.77 146.504H641.947C642.065 145.442 642.655 143.082 643.304 141.135L654.101 108.98H663.423V155ZM701.711 138.598L677.167 141.784C677.875 147.153 682.005 150.457 687.433 150.457C691.917 150.457 696.106 148.097 698.171 144.085L701.475 148.215C698.348 152.935 693.923 155.708 687.02 155.708C677.521 155.708 671.149 149.041 671.149 138.657C671.149 128.804 677.108 121.665 686.843 121.665C695.811 121.665 701.711 127.86 701.711 137.595C701.711 137.949 701.711 138.244 701.711 138.598ZM695.516 134.409C695.103 130.043 691.681 126.857 686.784 126.857C681.12 126.857 677.285 130.692 677.049 136.887L695.516 134.409ZM737.026 155H730.595V133.937C730.595 129.512 727.586 126.975 723.515 126.975C719.68 126.975 716.14 128.981 714.842 132.993V155H708.411V122.373H714.311V126.857C715.845 123.848 719.739 121.665 725.167 121.665C732.188 121.665 737.026 126.267 737.026 132.934V155ZM774.246 155H768.287V150.575C766.694 153.643 762.505 155.708 757.49 155.708C750.587 155.708 745.572 151.342 745.572 144.675V122.373H752.003V143.2C752.003 147.625 755.071 150.162 759.083 150.162C762.977 150.162 766.458 148.097 767.756 144.144V122.373H774.246V155Z"
            />
          </svg>
        </button>
        <button className="channel-start-button" type="button" onClick={openStartUrl} aria-label="Start">
          <svg className="channel-button-label" viewBox="1006 64 546 148" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
            <path
              fill="#303030"
              d="M1245.87 142.374C1245.87 150.87 1240.03 156.062 1229.59 156.062C1220.68 156.062 1214.66 151.283 1212.3 144.144L1217.43 140.722C1219.38 146.268 1224.1 150.162 1229.53 150.162C1235.49 150.162 1239.03 147.212 1239.03 143.023C1239.03 139.011 1236.55 136.71 1231.06 134.822L1224.4 132.521C1217.14 129.925 1214.01 126.739 1214.01 120.485C1214.01 113.641 1219.79 107.918 1229 107.918C1236.9 107.918 1242.04 110.809 1244.52 117.122L1239.38 120.78C1237.67 115.883 1234.07 113.582 1229.23 113.582C1223.81 113.582 1220.56 116.591 1220.56 120.19C1220.56 123.199 1222.45 125.205 1227.29 126.798L1234.19 129.04C1241.62 131.577 1245.87 135.353 1245.87 142.374ZM1269.92 150.221L1268.57 155.708C1259.19 155.708 1255.94 153.702 1255.94 146.445V127.506H1251.34V122.373H1256.18V112.107H1262.37V122.373H1268.15V127.506H1262.37V145.265C1262.37 149.867 1263.32 150.221 1269.92 150.221ZM1305.34 149.985L1304.05 155.354C1303.22 155.531 1302.39 155.649 1301.63 155.649C1298.5 155.649 1295.9 154.115 1295.55 151.106C1293.72 154.056 1288.59 155.708 1283.51 155.708C1276.85 155.708 1273.54 152.581 1273.42 147.153C1273.42 147.035 1273.42 146.917 1273.42 146.799C1273.42 140.486 1277.73 137.3 1284.75 135.766C1289.59 134.645 1293.9 132.875 1293.9 131.046C1293.9 127.801 1291.48 126.798 1286.94 126.798C1283.57 126.798 1278.68 128.922 1276.79 131.99L1274.01 127.27C1276.73 123.848 1281.63 121.665 1287.35 121.665C1295.9 121.665 1300.62 124.615 1300.62 131.518V147.035C1300.62 149.277 1301.74 150.28 1303.51 150.28C1304.05 150.28 1304.69 150.162 1305.34 149.985ZM1294.19 145.383V136.946C1292.78 138.362 1289.77 139.424 1286.35 140.309C1282.27 141.312 1279.68 142.551 1279.68 146.209C1279.68 146.327 1279.68 146.445 1279.68 146.563C1279.86 149.277 1281.51 150.634 1284.87 150.634C1288.35 150.634 1293.13 148.628 1294.19 145.383ZM1327.34 127.683C1326.46 127.565 1325.63 127.447 1324.86 127.447C1320.73 127.447 1317.72 129.335 1316.48 132.58V155H1310.05V122.373H1315.72V125.795C1317.66 123.081 1321.2 121.842 1326.1 121.665L1327.34 127.683ZM1348.74 150.221L1347.39 155.708C1338.01 155.708 1334.76 153.702 1334.76 146.445V127.506H1330.16V122.373H1335V112.107H1341.19V122.373H1346.97V127.506H1341.19V145.265C1341.19 149.867 1342.14 150.221 1348.74 150.221Z"
            />
          </svg>
        </button>

        <button
          className="channel-nav-arrow channel-nav-arrow--prev"
          type="button"
          aria-label="Previous channel"
          onClick={() => onNavigate?.(-1)}
        >
          <img src="/assets/wii-page-arrow.png" alt="" aria-hidden="true" />
        </button>
        <button
          className="channel-nav-arrow channel-nav-arrow--next"
          type="button"
          aria-label="Next channel"
          onClick={() => onNavigate?.(1)}
        >
          <img src="/assets/wii-page-arrow.png" alt="" aria-hidden="true" />
        </button>
      </motion.div>
    </section>
  );
}
