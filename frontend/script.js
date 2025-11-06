document.getElementById("searchForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const riotId = document.getElementById("riotId").value.trim();
  const resDiv = document.getElementById("result");
  const loader = document.getElementById("loader");

  if (!riotId.includes("#")) {
    alert("Kérlek add meg helyesen a Riot ID-t (pl.: SummonerName#EUNE)");
    return;
  }

  resDiv.innerHTML = "";
  loader.style.display = "flex";

  try {
    const response = await fetch("http://localhost:3000/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ riotId }),
    });

    const data = await response.json();
    loader.style.display = "none";

    if (!response.ok || data.error) {
      resDiv.innerHTML = `<p style="color:red;">${
        data.error || "Ismeretlen hiba"
      }</p>`;
      return;
    }

    const iconUrl = `https://ddragon.leagueoflegends.com/cdn/14.20.1/img/profileicon/${data.profileIconId}.png`;

    resDiv.innerHTML = `
      <img src="${iconUrl}" alt="Profil ikon" class="profile-icon">
      <h2>${data.name}</h2>
      <p>Szint: ${data.level}</p>
      <p>Régió: ${data.region}</p>
    `;
  } catch (err) {
    loader.style.display = "none";
    resDiv.innerHTML = `<p style="color:red;">Hiba: ${err.message}</p>`;
  }
});
