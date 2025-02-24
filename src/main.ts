import "./styles.css";
import { fetchPlaylist, displayPlaylist } from "./playlist";
import { getValidAccessToken } from "./authCodeWithPkce";

async function main() {
  try {
    const accessToken = await getValidAccessToken();

    if (!accessToken) {
      console.warn("🔄 Waiting for authentication, skipping playlist fetch.");
      setTimeout(main, 2000);
      return;
    }

    const bowiesPlaylistId = "3RpVLEl5TyPTJVoePB5pEz";
    const bowiesPlaylist = await fetchPlaylist(accessToken, bowiesPlaylistId);
    displayPlaylist(bowiesPlaylist);
  } catch (error) {
    console.error("error fetching playlist");
  }
}
main();
