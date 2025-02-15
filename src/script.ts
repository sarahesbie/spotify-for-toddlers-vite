import { redirectToAuthCodeFlow, getAccessToken } from "./authCodeWithPkce";

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
if (!CLIENT_ID) {
  throw new Error("Missing environment variable: VITE_SPOTIFY_CLIENT_ID");
}
const PLAYLIST_ID = "3dWNkA8Df6btbbdTcXVQe5";
const params = new URLSearchParams(window.location.search);
const code = params.get("code");

async function main() {
  if (!code) {
    redirectToAuthCodeFlow();
  } else {
    try {
      const accessToken = await getAccessToken(code);
      const playlist = await fetchPlaylist(accessToken, PLAYLIST_ID);
      displayPlaylist(playlist);
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  }
}
main().catch(console.error);

/**
 * Fetches playlist data from Spotify API
 */

async function fetchPlaylist(
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

function displayPlaylist(playlist: Playlist) {
  const container = document.getElementById("playlistContainer");
  if (!container) {
    console.error("Playlist container not found!");
    return;
  }

  container.innerHTML = "";

  const title = document.createElement("h2");
  title.innerText = playlist.name;
  container.appendChild(title);

  if (playlist.description) {
    const description = document.createElement("p");
    description.innerHTML = playlist.description;
    container.appendChild(description);
  }

  const trackList = document.createElement("ul");

  playlist.tracks.items.forEach((trackItem) => {
    const track = trackItem.track;
    if (!track) return;

    const listItem = document.createElement("li");

    const isEpisode = track.type === "episode";
    const trackLink = document.createElement("a");
    trackLink.href = `/player.html?trackId=${encodeURIComponent(
      track.id
    )}&type=${isEpisode ? "episode" : "track"}`;
    trackLink.innerText = `${track.name} - ${
      track.artists?.map((artist) => artist.name).join(", ") || "Podcast"
    }`;
    trackLink.target = "_self";

    listItem.appendChild(trackLink);
    trackList.appendChild(listItem);
  });
  container.appendChild(trackList);
}
