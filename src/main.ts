import "./styles.css";
import { fetchPlaylist, displayPlaylist } from "./playlist";
import { redirectToAuthCodeFlow, getAccessToken } from "./authCodeWithPkce";

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
if (!CLIENT_ID) {
  throw new Error("Missing environment variable: VITE_SPOTIFY_CLIENT_ID");
}

async function main() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  const PLAYLIST_ID = "3dWNkA8Df6btbbdTcXVQe5";

  if (!code) {
    redirectToAuthCodeFlow();
  } else {
    try {
      const accessToken = await getAccessToken(code);
      const playlist = await fetchPlaylist(accessToken, PLAYLIST_ID);
      displayPlaylist(playlist);
    } catch (error) {
      console.error("Error during authentication or playlist fetch:", error);
    }
  }
}

main().catch(console.error);
