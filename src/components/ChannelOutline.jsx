const channelOutlinePath =
  "M 78 15 C 320 5 680 5 922 15 C 970 18 990 48 993 102 C 996 168 996 234 996 300 C 996 366 996 432 993 498 C 990 552 970 582 922 585 C 680 595 320 595 78 585 C 30 582 10 552 7 498 C 3 432 2 366 2 300 C 2 234 3 168 7 102 C 10 48 30 18 78 15 Z";

export function ChannelOutline() {
  return (
    <svg className="channel-outline" viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true">
      <path d={channelOutlinePath} />
    </svg>
  );
}
