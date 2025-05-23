// import { LOGIN_URL } from "../app/lib/spotify";
import { LOGIN_URL } from "./lib/spotify";

export default function Login() {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <a
        href={LOGIN_URL}
        className="bg-green-500 text-white px-6 py-3 rounded-lg text-xl font-semibold hover:bg-green-600"
      >
        Login with Spotify
      </a>
    </div>
  );
}
