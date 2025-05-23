// 'use client';

// import { useSearchParams, useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';

// export default function CallbackClient() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const [error, setError] = useState(null);

//   const code = searchParams.get('code');

//   useEffect(() => {
//     if (!code) return;

//     const fetchToken = async () => {
//       try {
//         const res = await fetch('https://accounts.spotify.com/api/token', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//             Authorization:
//               'Basic ' +
//               btoa(
//                 process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID +
//                   ':' +
//                   process.env.SPOTIFY_CLIENT_SECRET
//               ),
//           },
//           body: new URLSearchParams({
//             grant_type: 'authorization_code',
//             code,
//             redirect_uri: process.env.REDIRECT_URI,
//           }),
//         });

//         const data = await res.json();

//         if (data.access_token) {
//           localStorage.setItem('spotify_access_token', data.access_token);
//           router.push('/home');
//         } else {
//           setError('Token fetch failed');
//         }
//       } catch (err) {
//         setError('An error occurred');
//         console.error(err);
//       }
//     };

//     fetchToken();
//   }, [code, router]);

//   return (
//     <div className="text-white flex justify-center items-center h-screen bg-black">
//       {error ? <p>{error}</p> : <p>Logging you in...</p>}
//     </div>
//   );
// }

'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CallbackClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState(null);

  const code = searchParams.get('code');

  useEffect(() => {
    if (!code) return;

    const fetchToken = async () => {
      try {
        const res = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization:
              'Basic ' +
              btoa(
                process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID +
                  ':' +
                  process.env.SPOTIFY_CLIENT_SECRET
              ),
          },
          body: new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
          }),
        });

        const data = await res.json();

        if (data.access_token) {
          localStorage.setItem('spotify_access_token', data.access_token);
          router.push('/home');
        } else {
          setError('Failed to fetch access token');
        }
      } catch (err) {
        console.error(err);
        setError('An error occurred');
      }
    };

    fetchToken();
  }, [code, router]);

  return (
    <div className="text-white bg-black h-screen flex justify-center items-center">
      {error ? <p>{error}</p> : <p>Logging you in...</p>}
    </div>
  );
}
