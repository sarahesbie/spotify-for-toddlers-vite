import { redirectToAuthCodeFlow, getAccessToken } from "./authCodeWithPkce";

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
if (!CLIENT_ID) {
  throw new Error("Missing environment variable: VITE_SPOTIFY_CLIENT_ID");
}

const params = new URLSearchParams(window.location.search);
const code = params.get("code");

async function main() {
  if (!code) {
    redirectToAuthCodeFlow();
  } else {
    try {
      const accessToken = await getAccessToken(code);
      const profile = await fetchProfile(accessToken);
      populateUI(profile);
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  }
}

main().catch(console.error);

/**
 * Fetches the user's Spotify profile using an access token.
 */
async function fetchProfile(token: string): Promise<UserProfile> {
  const result = await fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!result.ok) {
    throw new Error("Failed to fetch profile");
  }

  return await result.json();
}

/**
 * Updates the UI with the user's Spotify profile information.
 */
function populateUI(profile: UserProfile) {
  document.getElementById("displayName")!.innerText =
    profile.display_name || "N/A";

  const avatar = document.getElementById("avatar");
  if (avatar && profile.images.length > 0) {
    avatar.setAttribute("src", profile.images[0].url);
  }

  document.getElementById("id")!.innerText = profile.id || "N/A";
  document.getElementById("email")!.innerText = profile.email || "N/A";

  const uriElement = document.getElementById("uri");
  if (uriElement) {
    uriElement.innerText = profile.uri || "N/A";
    uriElement.setAttribute("href", profile.external_urls?.spotify || "#");
  }

  const urlElement = document.getElementById("url");
  if (urlElement) {
    urlElement.innerText = profile.href || "N/A";
    urlElement.setAttribute("href", profile.href || "#");
  }

  document.getElementById("imgUrl")!.innerText =
    profile.images[0]?.url || "N/A";
}
