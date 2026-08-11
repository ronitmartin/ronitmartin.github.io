import { ChannelFrame } from "./ChannelFrame";
import { GithubOpenContent } from "./GithubOpenContent";
import { MissingLinkOpenContent } from "./MissingLinkOpenContent";

export function ChannelOpenContent({ channel }) {
  if (!channel) {
    return null;
  }

  if (channel.openType === "missing-link") {
    return <MissingLinkOpenContent />;
  }

  if (channel.openType === "github") {
    return <GithubOpenContent />;
  }

  return <ChannelFrame channel={channel} disabled />;
}
