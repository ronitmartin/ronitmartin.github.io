export function ForecastChannelArtwork({ channel }) {
  return (
    <div className="channel asset-channel forecast" aria-label={channel.title}>
      <img className="forecast-sun" src="/assets/channels/forecast-sun.png" alt="" aria-hidden="true" />
      <span>Forecast Channel</span>
    </div>
  );
}
