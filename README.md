# 🐙 Octopus

**Octopus** is a full-stack web application built with **React (Vite)** and **Node.js (Express)** that allows users to look up **League of Legends player profiles** via the official **Riot Games API**.

Users can enter their **Riot ID** (e.g. `Game Name#Tagline`) and view profile information such as **summoner name, level, region, and profile icon**.

---

## ⚙️ Technologies Used

### Frontend

* ⚛️ **React.js** (Vite)
* 🎨 **Tailwind CSS** for styling

### Backend

* 🟢 **Node.js + Express**
* 🌍 **CORS** for cross-origin requests
* 🔐 **dotenv** for environment variable management
* 🌐 **node-fetch** for Riot API requests

---

## 📦 Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/<username>/<repository-name>.git
cd Octopus
```

### 2️⃣ Install backend dependencies

```bash
cd backend
npm install
```

### 3️⃣ Create a `.env` file in the `backend` folder:

```bash
RIOT_API_KEY=your_riot_api_key_here
```

### 4️⃣ Install frontend dependencies

```bash
cd ../frontend-react
npm install
```

---

## 🚀 Running the Project (Development Mode)

### Start the backend server:

```bash
cd backend
node server.js
```

Expected message:

```
Backend running on http://localhost:3000
```

### Start the frontend:

```bash
cd ../frontend-react
npm run dev
```

Open in your browser:
👉 [http://localhost:5173](http://localhost:5173)

---

## 🧠 How It Works

* The React frontend sends a **POST** request to:
  `http://localhost:3000/api/profile`
* The Express backend queries the **Riot API** to fetch player data:

  * Summoner level
  * Region
  * Profile icon
* The backend returns the data as JSON, and the React app renders it nicely with Tailwind.

---

## 🌍 Project Structure

```
Octopus/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend-react/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/FuzzyText.jsx
│   │   └── index.css
│   └── package.json
│
└── README.md
```

---

## ✨ Future Plans

* 📊 Match history integration
* 🧩 Ranked stats and league data
* 🌐 Production deployment (Render + Vercel)
* 🌓 Dark / light theme toggle

---

## 👨‍💻 Author

**Zalán Krecsmarik (2025)**
Full-stack developer | Riot API integration | React + Express project
