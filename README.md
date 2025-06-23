**🌦️ Weather App -LSF Task🌦️**

> A clean, responsive React app built with Vite, Tailwind CSS, and TanStack Query to give you real-time weather updates, ambient effects, and seamless performance.

---

## 📋 Table of Contents

1. [Features](#-features)
2. [Demo & Screenshots](#-demo--screenshots)
3. [Getting Started](#-getting-started)

   * [Prerequisites](#-prerequisites)
   * [Installation](#-installation)
   * [Running the App](#-running-the-app)
4. [App Design & Caching](#-app-design--caching)
5. [Error Handling](#-error-handling)
6. [Tech Stack](#-tech-stack)
7. [Future Improvements](#-future-improvements)
8. [License](#-license)

---

## ✨ Features

* 🌍 **Geolocation Fetching** — Automatically detect your location and fetch local weather.
* 🔍 **Search & History** — Search other cities and store recent searches in local storage.
* ☀️🌙 **Day & Night Modes** — Dynamic icons and backgrounds based on time of day.
* 🌧️ **Ambient Effects & Music** — Rain, snow, and clear-day backround ambient effect with matching background audio (rain,snow).
* 🔇 **Audio Control** — Mute/unmute ambient sounds anytime.
* 🌈 **Glassmorphic UI** — Modern translucent cards and panels with smooth shadows.
* 📱 **Responsive Design** — Works on mobile, tablet, and desktop.
* ⚡ **Caching with TanStack Query** — Cache API responses for 5 minutes to reduce network calls and speed up UI.
* 📈 **7-Day Forecast** — View today's weather highlights and upcoming week’s forecast.
* 🎞️ **Framer Motion Transitions** — Subtle animations for a polished feel.

---

## 📸 Demo & Screenshots

> *Add your screenshots here.*

```
![Home Screen](./screenshots/home.png)
![Search & Results](./screenshots/search.png)
![Forecast & Highlights](./screenshots/forecast.png)
```

---

## 🚀 Getting Started

### 🛠️ Prerequisites

* Node.js (v19 or later)
* npm or yarn

### 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/weatherly.git
cd weatherly

# Install dependencies
npm install
# or
# yarn install
```

### 🏃 Running the App

```bash
# Start the development server
npm run dev
# or
# yarn dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser. The app will auto-reload on code changes.

---

## 🏗️ App Design Details

* **Modular Components**: The UI is broken into small, reusable React components (CurrentWeather, WeatherHighlights, ForecastList) for easy maintenance.
* **State Management**: Local component state handles UI interactions (mute toggle, search input), while global data fetching is managed by TanStack Query.
* **Input Sanitization**: All user inputs (e.g., city names) are client-side trimmed and validated to strip out unwanted characters and ensure only well-formed API requests are sent, reducing errors and improving reliability.
* **Caching Strategy**: We use TanStack Query to cache weather API responses for **5 minutes**. This:

  1. Reduces unnecessary API calls ⏱️
  2. Improves load times on repeated searches ⚡
  3. Provides stale-while-revalidate behavior for a snappier UI
* **Why This Design?**

  * **Performance**: Caching and debounced search requests keep the app fast.
  * **Scalability**: Modular code makes it easy to add features like hourly forecasts or air quality.
  * **User Experience**: Smooth animations and ambient cues keep users engaged.

---

## 🚨 Error Handling

The app displays friendly messages for different error scenarios:

* **Network Errors**: "Unable to fetch weather. Check your connection. 🌐"
* **Location Denied**: "Permission denied. Please allow location or search manually. 📍"
* **Invalid Search**: "City not found. Try again with a different name. 🔍"

All errors appear in a clear alert box at the top, with an icon, short description, and retry button when applicable.

---

## 🔧 Tech Stack

| Layer             | Technology           |
| ----------------- | -------------------- |
| **Framework**     | React v19            |
| **Bundler**       | Vite                 |
| **Styling**       | Tailwind CSS v4      |
| **Data Fetching** | TanStack Query       |
| **API**           | WeatherAPI.com       |
| **Animations**    | Framer Motion        |
| **Icons**         | Lucide Icons         |



## 📜 License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.
