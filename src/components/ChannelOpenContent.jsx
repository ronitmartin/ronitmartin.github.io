import { ChannelFrame } from "./ChannelFrame";
import { MissingLinkOpenContent } from "./MissingLinkOpenContent";

export function ChannelOpenContent({ channel }) {
  if (!channel) {
    return null;
  }

  if (channel.openType === "missing-link") {
    return <MissingLinkOpenContent />;
  }

  return <ChannelFrame channel={channel} disabled />;
}
