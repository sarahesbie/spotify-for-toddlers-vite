document.addEventListener("DOMContentLoaded", initializeSpotifyPlayer);

function initializeSpotifyPlayer(): void {
  const params = new URLSearchParams(window.location.search);
  const trackId = params.get("trackId");

  if (!trackId) {
    displayError("Missing track ID");
    return;
  }

  updateSpotifyPlayer(trackId);
}

/**
 * Updates the Spotify iframe player with the correct embed URL.
 */
function updateSpotifyPlayer(trackId: string): void {
  const embedUrl = `https://open.spotify.com/embed/track/${trackId}`;

  const playerFrame = document.getElementById(
    "spotifyPlayer"
  ) as HTMLIFrameElement | null;

  if (!playerFrame) {
    displayError("Player element not found");
    return;
  }

  playerFrame.src = embedUrl;
}

/**
 * Displays an error message in the body.
 */
function displayError(message: string): void {
  document.body.innerHTML = `<h2>Error: ${message}</h2>`;
}
