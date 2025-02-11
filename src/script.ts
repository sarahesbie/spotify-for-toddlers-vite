import { redirectToAuthCodeFlow, getAccessToken } from "./authCodeWithPkce";

const clientId = "db74eda36af144509e840cc25efcae03";
const params = new URLSearchParams(window.location.search);
const code = params.get("code");

async function main() {
  if (!code) {
    redirectToAuthCodeFlow(clientId);
  } else {
    try {
      const accessToken = await getAccessToken(clientId, code);
      const profile = await fetchProfile(accessToken);
      populateUI(profile);
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  }
}

main().catch(console.error);

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

function populateUI(profile: UserProfile) {
  document.getElementById("displayName")!.innerText = profile.display_name;
  document
    .getElementById("avatar")!
    .setAttribute("src", profile.images[0]?.url || "");
  document.getElementById("id")!.innerText = profile.id;
  document.getElementById("email")!.innerText = profile.email;
  document.getElementById("uri")!.innerText = profile.uri;
  document
    .getElementById("uri")!
    .setAttribute("href", profile.external_urls.spotify);
  document.getElementById("url")!.innerText = profile.href;
  document.getElementById("url")!.setAttribute("href", profile.href);
  document.getElementById("imgUrl")!.innerText = profile.images[0]?.url || "";
}
