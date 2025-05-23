const scopes = [
    'user-read-private',
    'user-read-email',
    'playlist-read-private',
    'user-library-read',
  ];
  
  const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const REDIRECT_URI = "https://spotify-dyp9.vercel.app/callbacks"; // ✅ must be NEXT_PUBLIC
  
  export const LOGIN_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&scope=${scopes.join('%20')}`;
  
