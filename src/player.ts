document.addEventListener("DOMContentLoaded", initializeSpotifyPlayer);

function initializeSpotifyPlayer(): void {
  const params = new URLSearchParams(window.location.search);
  const trackId = params.get("trackId");
  const type = params.get("type") as "track" | "episode";

  if (!trackId || type) {
    displayError("Missing track Id or type");
    return;
  }

  updateSpotifyPlayer(trackId, type);
}

function updateSpotifyPlayer(trackId: string, type: "track" | "episode"): void {
  const embedUrl = `https://open.spotify.com/embed/${type}/${trackId}`;
  const playerFrame = document.getElementById(
    "spotifyPlayer"
  ) as HTMLIFrameElement | null;

  if (!playerFrame) {
    displayError("Player element not found");
    return;
  }
  playerFrame.src = embedUrl;
}

function displayError(message: string): void {
  document.body.innerHTML = `<h2> Error: ${message}</h2>`;
}
