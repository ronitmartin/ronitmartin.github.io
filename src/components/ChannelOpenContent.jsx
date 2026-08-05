import { ChannelFrame } from "./ChannelFrame";
import { DiscOpenContent } from "./DiscOpenContent";

export function ChannelOpenContent({ channel }) {
  if (!channel) {
    return null;
  }

  if (channel.openType === "disc") {
    return <DiscOpenContent />;
  }

  return <ChannelFrame channel={channel} disabled />;
}
