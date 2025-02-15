document.addEventListener("DOMContentLoaded", initializeSpotifyPlayer);

function initializeSpotifyPlayer() {
  const params = new URLSearchParams(window.location.search);
  const trackId = params.get("trackId");
  const type = params.get("type");

  console.log("Extracted Track ID:", trackId);
  console.log("Detected Type:", type);

  if (!trackId || !type) {
    document.body.innerHTML = "<h2>Error: Missing track ID or type</h2>";
    return;
  }

  updateSpotifyPlayer(trackId, type);
}

/**
 * Updates the Spotify iframe player with the given track ID.
 */
function updateSpotifyPlayer(trackId, type) {
  const embedUrl = `https://open.spotify.com/embed/${type}/${trackId}`;
  console.log("Generated Embed URL:", embedUrl);

  const playerFrame = document.getElementById("spotifyPlayer");

  if (!playerFrame) {
    displayError("Player element not found");
    return;
  }

  playerFrame.src = embedUrl;
}

/**
 * Displays an error message in the body.
 */
function displayError(message) {
  document.body.innerHTML = `<h2>Error: ${message}</h2>`;
}
