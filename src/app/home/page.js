'use client';

import { useEffect, useState } from 'react';

export default function HomePage() {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  const accessToken = typeof window !== 'undefined' ? localStorage.getItem('spotify_access_token') : null;

  useEffect(() => {
    if (!accessToken) return;

    const fetchPlaylists = async () => {
      try {
        const res = await fetch("https://api.spotify.com/v1/me/playlists", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const data = await res.json();

        if (data?.items) {
          setPlaylists(data.items);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching playlists:", err);
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, [accessToken]);

  if (!accessToken) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        <p>No access token. Please <a href="/" className="text-green-400 underline">login</a>.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Your Spotify Playlists</h1>

      {loading ? (
        <p>Loading...</p>
      ) : playlists.length === 0 ? (
        <p>No playlists found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {playlists.map((playlist) => (
            <div key={playlist.id} className="bg-zinc-800 p-4 rounded-lg hover:bg-zinc-700 transition">
              <img
                src={playlist.images?.[0]?.url || '/placeholder.png'}
                alt={playlist.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-lg font-semibold">{playlist.name}</h2>
              <p className="text-sm text-gray-400">{playlist.tracks.total} tracks</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
