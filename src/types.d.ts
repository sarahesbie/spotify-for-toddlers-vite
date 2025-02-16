interface UserProfile {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls: { spotify: string };
  followers: { href: string; total: number };
  href: string;
  id: string;
  images: Image[];
  product: string;
  type: string;
  uri: string;
}

interface Image {
  url: string;
  height: number;
  width: number;
}

interface Playlist {
  name: string;
  description: string;
  tracks: {
    items: {
      track: {
        name: string;
        artists?: { name: string }[];
        id: string;
        type: "track" | "episode";

        album?: {
          images: { url: string }[];
        };
        images?: { url: string }[];
        preview_url: string | null;
      };
    }[];
  };
  external_urls: {
    spotify: string;
  };
}
