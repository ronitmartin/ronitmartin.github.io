import { ChannelFrame } from "./ChannelFrame";
import { channelOpenRoutes } from "../routing/channelRoutes";

export function ChannelOpenContent({ channel }) {
  if (!channel) {
    return null;
  }

  const OpenChannel = channelOpenRoutes[channel.openType];
  return OpenChannel ? <OpenChannel /> : <ChannelFrame channel={channel} disabled />;
}
