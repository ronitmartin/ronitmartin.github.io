import { GithubChannel, GithubChannelArtwork } from "../channels/GithubChannel";
import { MiiChannelArtwork } from "../channels/MiiChannel";
import { MissingLinkChannel, MissingLinkChannelArtwork } from "../channels/MissingLinkChannel";
import { PhotoChannelArtwork } from "../channels/PhotoChannel";
import { ShopChannelArtwork } from "../channels/ShopChannel";

export const channelArtworkRoutes = {
  "missing-link": MissingLinkChannelArtwork,
  mii: MiiChannelArtwork,
  photo: PhotoChannelArtwork,
  shop: ShopChannelArtwork,
  github: GithubChannelArtwork,
};

export const channelOpenRoutes = {
  "missing-link": MissingLinkChannel,
  github: GithubChannel,
};
