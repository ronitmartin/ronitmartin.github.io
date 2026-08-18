import { channelArtworkRoutes } from "../routing/channelRoutes";
import { EmptyChannelArtwork } from "../channels/EmptyChannel";

export function ChannelArtwork({ channel }) {
  const Artwork = channelArtworkRoutes[channel.type] || EmptyChannelArtwork;
  return <Artwork channel={channel} />;
}
