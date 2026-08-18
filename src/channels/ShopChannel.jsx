export function ShopChannelArtwork({ channel }) {
  return (
    <div className="channel asset-channel shop-channel" aria-label={channel.title}>
      <img className="shop-avatar" src="/assets/channels/shop-avatar.png" alt="" aria-hidden="true" />
      <span className="shop-title" aria-hidden="true">Ronotion Shop Channel</span>
    </div>
  );
}
