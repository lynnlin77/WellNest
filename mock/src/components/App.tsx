import React, { useState } from "react";
import LoginPage from "./LoginPage";
import Dashboard from "../components/pages/Dashboard";
import CheckInPage from "../components/pages/CheckInPage";

function App() {
  const [currentPage, setCurrentPage] = useState("login"); // Tracks the current page

  const handleLogin = () => setCurrentPage("dashboard");
  const handleLogout = () => setCurrentPage("login");
  const goToCheckInPage = () => setCurrentPage("checkin");
  const goToDashboard = () => setCurrentPage("dashboard");

  if (currentPage === "login") {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (currentPage === "checkin") {
    return <CheckInPage onBack={goToDashboard} />;
  }

  return <Dashboard onLogout={handleLogout} onCheckIn={goToCheckInPage} />;
}

export default App;