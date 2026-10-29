# JobFinder - Responsive Job Portal & Application Tracker

A modern, responsive, and feature-rich Job Search Portal and Career Application Tracker built with **React 19**, **Vite**, and **Vanilla CSS**.

---

## 🌟 Key Features

- 🔍 **Live Search & Multi-Criteria Filtering**: Filter jobs instantly by role title, keywords, location, employment type (Full-time, Part-time, Contract, Remote, Internship), and experience level.
- 📑 **Comprehensive Job Details**: Deep-dive views with company overviews, core responsibilities, candidate requirements, tech stack tags, and instant apply links.
- 📌 **Saved Bookmarks**: Save and organize jobs you are interested in with persistent storage (`localStorage`).
- 📊 **Candidate Application Tracker**: Full lifecycle pipeline tracking (Interested, Applied, Interviewing, Offered, Rejected) with customizable notes and timestamp logs.
- 📱 **Fully Responsive Modern UI**: Clean typography (Plus Jakarta Sans & Space Grotesk), glassmorphism accents, accessible color contrast, and smooth mobile drawer navigation.
- ⚡ **Zero-Config State Persistence**: Saves your bookmarked jobs and tracker status directly in the browser.

---

## 🚀 Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vite.dev/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Styling**: Vanilla CSS (CSS Variables, Flexbox, CSS Grid)

---

## 📦 Getting Started

### 1. Prerequisites
Ensure you have **Node.js** (v18 or newer) installed.

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/Jeelanimohammad/jobfinder-responsive-job-portal.git
cd jobfinder-responsive-job-portal
npm install
```

### 3. Development Server
Start the local Vite dev server:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 4. Production Build
Create an optimized production bundle:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

---

## 📂 Project Structure

```
├── public/                 # Static assets and icons
├── src/
│   ├── assets/             # Logos and imagery
│   ├── components/         # Reusable UI components
│   │   ├── ApplicationStatus.jsx
│   │   ├── FilterPanel.jsx
│   │   ├── Footer.jsx
│   │   ├── JobCard.jsx
│   │   ├── JobList.jsx
│   │   ├── Navbar.jsx
│   │   ├── SaveJobButton.jsx
│   │   └── SearchBar.jsx
│   ├── context/            # React Context & State Management
│   │   └── AppContext.jsx
│   ├── data/               # Job dataset & categories
│   │   └── jobsData.js
│   ├── pages/              # Portal views & routes
│   │   ├── Home.jsx
│   │   ├── Jobs.jsx
│   │   ├── JobDetails.jsx
│   │   ├── SavedJobs.jsx
│   │   └── ApplicationTracker.jsx
│   ├── App.jsx             # Route definitions & layout
│   ├── index.css           # Global design system & theme tokens
│   └── main.jsx            # Application entry point
├── package.json
└── vite.config.js
```

---

## 📄 License
This project is open source and available under the [MIT License](LICENSE).
