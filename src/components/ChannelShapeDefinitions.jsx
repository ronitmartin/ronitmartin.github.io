export function ChannelShapeDefinitions() {
  return (
    <svg className="channel-shape-definitions" width="0" height="0" aria-hidden="true">
      <defs>
        <clipPath id="channel-crt-shape" clipPathUnits="objectBoundingBox">
          <path d="M .078 .025 C .32 .008 .68 .008 .922 .025 C .97 .03 .99 .08 .993 .17 C .996 .28 .996 .39 .996 .5 C .996 .61 .996 .72 .993 .83 C .99 .92 .97 .97 .922 .975 C .68 .992 .32 .992 .078 .975 C .03 .97 .01 .92 .007 .83 C .003 .72 .002 .61 .002 .5 C .002 .39 .003 .28 .007 .17 C .01 .08 .03 .03 .078 .025 Z" />
        </clipPath>
        <clipPath id="screen-crt-shape" clipPathUnits="objectBoundingBox">
          <path d="M .072 .04 C .3 .006 .7 .006 .928 .04 C .982 .048 1 .2 1 .5 C 1 .8 .982 .952 .928 .96 C .7 .994 .3 .994 .072 .96 C .018 .952 0 .8 0 .5 C 0 .2 .018 .048 .072 .04 Z" />
        </clipPath>
        <clipPath id="menu-panel-shape" clipPathUnits="objectBoundingBox">
          <path d="M0 0H1V.72H.832C.766.72.745.735.714.77C.686.802.667.814.621.814H.379C.333.814.314.802.286.77C.255.735.234.72.168.72H0Z" />
        </clipPath>
      </defs>
    </svg>
  );
}
