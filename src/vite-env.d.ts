/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SPOTIFY_CLIENT_ID: string;
  readonly VITE_SPOTIFY_CLIENT_SECRET: string;
  readonly VITE_REDIRECT_URI: string;
  // add other env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
