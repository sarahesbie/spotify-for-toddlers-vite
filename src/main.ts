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

    console.log("🎵 Fetching playlist...");
    const goodnightWorldPlaylistId = "3dWNkA8Df6btbbdTcXVQe5";
    const goodnightWorldPlaylist = await fetchPlaylist(
      accessToken,
      goodnightWorldPlaylistId
    );
    displayPlaylist(goodnightWorldPlaylist);
  } catch (error) {
    console.error("error fetching playlist");
  }
}
main();
