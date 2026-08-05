import { channels } from "../data/channels";
import { ChannelFrame } from "./ChannelFrame";

export function ChannelGrid({ onOpen }) {
  return (
    <section className="channel-grid" aria-label="Wii channels">
      {channels.map((channel) => (
        <ChannelFrame key={channel.id} channel={channel} onOpen={onOpen} />
      ))}
    </section>
  );
}
