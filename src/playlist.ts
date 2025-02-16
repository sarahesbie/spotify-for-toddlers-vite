/**
 * Fetches playlist data from Spotify API
 */

export async function fetchPlaylist(
  token: string,
  playlistId: string
): Promise<Playlist> {
  const result = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (!result.ok) {
    throw new Error("failed to fetch playlist");
  }
  return await result.json();
}

/**
 * REnders playlist details in the UI
 */

export function displayPlaylist(playlist: Playlist) {
  const container = document.getElementById("playlistContainer");
  if (!container) {
    console.error("Playlist container not found!");
    return;
  }

  container.innerHTML = "";

  const title = document.createElement("h2");
  title.innerText = playlist.name;
  container.appendChild(title);

  const trackGrid = document.createElement("div");
  trackGrid.classList.add("track-grid");

  playlist.tracks.items.forEach((trackItem) => {
    const track = trackItem.track;
    if (!track) return;

    const isEpisode = track.type === "episode";

    const trackCard = document.createElement("div");
    trackCard.classList.add("track-card");

    const thumbnail = document.createElement("img");
    thumbnail.src =
      track.album?.images[0]?.url ||
      track.images?.[0]?.url ||
      "fallback-image.jpg";
    thumbnail.alt = track.name;

    const trackLink = document.createElement("a");
    trackLink.href = `/player.html?trackId=${encodeURIComponent(
      track.id
    )}&type=${isEpisode ? "episode" : "track"}`;
    trackLink.innerText = track.name;
    trackLink.target = "_blank";

    trackCard.appendChild(thumbnail);
    trackCard.appendChild(trackLink);
    trackGrid.appendChild(trackCard);
  });

  container.appendChild(trackGrid);
}
