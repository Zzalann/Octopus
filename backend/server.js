import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.RIOT_API_KEY;

// Riot routing táblák
const PLATFORM_ROUTING = {
  BR: "br1",
  EUNE: "eun1",
  EUW: "euw1",
  JP: "jp1",
  KR: "kr",
  LAN: "la1",
  LAS: "la2",
  NA: "na1",
  OCE: "oc1",
  TR: "tr1",
  RU: "ru",
};

const REGIONAL_ROUTING = {
  BR: "americas",
  EUNE: "europe",
  EUW: "europe",
  JP: "asia",
  KR: "asia",
  LAN: "americas",
  LAS: "americas",
  NA: "americas",
  OCE: "sea",
  TR: "europe",
  RU: "europe",
};

// ✅ POST endpoint – a frontend küldi a Riot ID-t
app.post("/api/profile", async (req, res) => {
  try {
    const { riotId } = req.body;
    if (!riotId || !riotId.includes("#")) {
      return res
        .status(400)
        .json({ error: "Hibás Riot ID formátum (pl. Név#TAG)" });
    }

    const [gameName, tagLine] = riotId.split("#");

    let regionalRoute = "europe";
    let platformRoute = "eun1";

    // Próbáljuk felismerni a régiót a tagline-ból
    for (const [key, value] of Object.entries(REGIONAL_ROUTING)) {
      if (tagLine.toUpperCase().includes(key)) {
        regionalRoute = value;
        platformRoute = PLATFORM_ROUTING[key];
        break;
      }
    }

    // Account adat lekérés
    const accountUrl = `https://${regionalRoute}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(
      gameName
    )}/${encodeURIComponent(tagLine)}`;

    const accountRes = await fetch(accountUrl, {
      headers: { "X-Riot-Token": API_KEY },
    });

    if (!accountRes.ok) {
      return res.status(accountRes.status).json({
        error: "Nem található ez a játékos. Ellenőrizd a Riot ID-t!",
      });
    }

    const account = await accountRes.json();

    // Summoner adat lekérés
    const summonerUrl = `https://${platformRoute}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${account.puuid}`;
    const summonerRes = await fetch(summonerUrl, {
      headers: { "X-Riot-Token": API_KEY },
    });

    if (!summonerRes.ok) {
      return res.status(summonerRes.status).json({
        error: "Nem sikerült lekérni a summoner adatokat.",
      });
    }

    const summoner = await summonerRes.json();

    // ✅ JSON válasz vissza a frontendnek
    res.json({
      name: account.gameName,
      level: summoner.summonerLevel,
      profileIconId: summoner.profileIconId,
      region: platformRoute,
    });
  } catch (err) {
    console.error("API hiba:", err);
    res.status(500).json({ error: "Szerverhiba", message: err.message });
  }
});

// ✅ Backend indítása (NINCS több statikus fájl)
app.listen(3000, () => console.log("Backend fut: http://localhost:3000"));
