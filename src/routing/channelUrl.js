export function getChannelIdFromUrl() {
  return new URLSearchParams(window.location.search).get("channel");
}

export function setChannelIdInUrl(channelId) {
  const url = new URL(window.location.href);

  if (channelId) {
    url.searchParams.set("channel", channelId);
  } else {
    url.searchParams.delete("channel");
  }

  window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
}
