# 🎵 Spotify Playlist App

A web application that allows users to browse and play Spotify playlists with a seamless, single-click music experience.

## 🚀 Features

- 🎧 Browse Spotify Playlists – Displays tracklist from a given Spotify playlist.
- 🎼 One-Click Playback – Click a track to instantly play it using Spotify's embedded player.
- 📱 Mobile-Friendly – On mobile, the app opens full tracks in the Spotify app (avoiding the 30s preview issue).
- 🎨 Responsive UI – Fully optimized for desktop and mobile.
- 🔑 Spotify OAuth Authentication – Manages user session with refresh tokens.

## 🛠️ Tech Stack

- Frontend: TypeScript, Vite, HTML, CSS
- Spotify API: Fetches playlist data and enables embedded playback
- Authentication: PKCE flow for Spotify OAuth

## 📦 Installation

1️⃣ Clone the Repository

```
git clone https://github.com/yourusername/spotify-playlist-app.git
cd spotify-playlist-app
```

2️⃣ Install Dependencies

```
npm install
```

3️⃣ Set Up Environment Variables

Create a .env file in the root directory and add:

```
VITE_SPOTIFY_CLIENT_ID=your_spotify_client_id
VITE_CALLBACK_URI=http://localhost:5173/callback
```

▶️ Running the App

```
npm run dev
```

App will be available at:
http://localhost:5173

Build for Production

```
npm run build
```
