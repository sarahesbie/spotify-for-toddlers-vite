const SPOTIFY_AUTH_URL = "https://accounts.spotify.com/authorize";
const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_CALLBACK_URI;

if (!CLIENT_ID || !REDIRECT_URI) {
  throw new Error(
    "Missing environment variables: VITE_SPOTIFY_CLIENT_ID or VITE_CALLBACK_URI"
  );
}

/**
 * Redirects the user to Spotify's authentication page using PKCE flow
 */

export async function redirectToAuthCodeFlow() {
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);

  localStorage.setItem("verifier", verifier);

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: "code",
    redirect_uri: REDIRECT_URI,
    scope: "user-read-private user-read-email",
    code_challenge_method: "S256",
    code_challenge: challenge,
  });

  document.location = `${SPOTIFY_AUTH_URL}?${params.toString()}`;
}

/**
 * Exchanges the authorisation code for an access token
 */

export async function getAccessToken(code: string): Promise<string> {
  const verifier = localStorage.getItem("verifier");
  if (!verifier) throw new Error("Missing PKCE verifier in localStorage");

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    grant_type: "authorization_code",
    code,
    redirect_uri: REDIRECT_URI,
    code_verifier: verifier,
  });

  const result = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  if (!result.ok) {
    throw new Error("Failed to retrieve access token");
  }

  const { access_token } = await result.json();
  return access_token;
}

/**
 * Generates a secure, random code verifier
 */

function generateCodeVerifier(length: number): string {
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  return Array.from(array, (byte) => characters[byte % characters.length]).join(
    ""
  );
}

/**
 * Generates a SHA-256 code challenge from the code verifier.
 */
async function generateCodeChallenge(codeVerifier: string) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
