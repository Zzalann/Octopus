import { useState } from "react";
import FuzzyText from "./components/FuzzyText";

function App() {
  const [riotId, setRiotId] = useState("");
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
  setLoading(true);
  setError("");
  setProfile(null);

  try {
    const res = await fetch("http://localhost:3000/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ riotId }), // <-- ez megy a backendnek
    });

    const data = await res.json();

    if (data.error) {
      setError(data.error);
    } else {
      setProfile(data);
    }
  } catch (err) {
    setError("Nem sikerült lekérni az adatokat.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center">
      <nav className="w-full bg-gray-900/70 backdrop-blur-md border-b border-fuchsia-700/40 fixed top-0 left-0 flex items-center justify-between px-8 py-3 z-50">
        <FuzzyText text="Octopus" color="#f0abfc" hoverColor="#c084fc" fontSize="2.5rem" intensity={5} />

        <div className="flex gap-2">
          <input
            type="text"
            value={riotId}
            onChange={(e) => setRiotId(e.target.value)}
            placeholder="Game Name#Tagline"
            className="p-2 rounded bg-gray-800 text-gray-200 border border-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
          />
          <button
            onClick={handleSearch}
            className="bg-fuchsia-600 hover:bg-fuchsia-700 px-4 py-2 rounded transition"
          >
            Keresés
          </button>
        </div>
      </nav>

      {/* 🔹 MAIN CONTENT */}
      <main className="flex flex-col items-center justify-center flex-grow pt-28">
        {loading && <p className="text-gray-400 mt-8">Betöltés...</p>}
        {error && <p className="text-red-500 mt-8">{error}</p>}

        {profile && (
          <div className="p-6 bg-gray-800 rounded-lg text-center mt-8 shadow-lg border border-fuchsia-700/40">
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/14.7.1/img/profileicon/${profile.profileIconId}.png`}
              alt="icon"
              className="mx-auto w-24 h-24 rounded-full mb-3 border-2 border-fuchsia-500"
            />
            <h2 className="text-2xl font-semibold text-fuchsia-300">{profile.name}</h2>
            <p>Szint: {profile.level}</p>
            <p>Régió: {profile.region}</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
