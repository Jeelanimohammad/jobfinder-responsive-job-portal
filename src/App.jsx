import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider, useApp } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import SavedJobs from "./pages/SavedJobs";
import ApplicationTracker from "./pages/ApplicationTracker";

function ToastNotification() {
  const { toastMessage } = useApp();
  if (!toastMessage) return null;

  return (
    <div className="toast-container" role="status" aria-live="polite">
      <div className="toast-bubble">{toastMessage}</div>
    </div>
  );
}

function MainLayout() {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/saved" element={<SavedJobs />} />
          <Route path="/tracker" element={<ApplicationTracker />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <ToastNotification />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <MainLayout />
      </AppProvider>
    </BrowserRouter>
  );
}

