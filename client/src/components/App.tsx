import { initializeApp } from "firebase/app";
import React, { useState } from "react";
import LoginPage from "./LoginPage";
import Dashboard from "./pages/Dashboard";
import CheckInPage from "./pages/CheckInPage";
import UserPage from "./pages/UserPage";

const firebaseConfig = {
  apiKey: import.meta.env.API_KEY,
  authDomain: import.meta.env.AUTH_DOMAIN,
  projectId: import.meta.env.PROJECT_ID,
  storageBucket: import.meta.env.STORAGE_BUCKET,
  messagingSenderId: import.meta.env.MESSAGING_SENDER_ID,
  appId: import.meta.env.APP_ID,
};

initializeApp(firebaseConfig);

function App() {
  const [currentPage, setCurrentPage] = useState("login"); // Tracks the current page

  const handleLogin = () => setCurrentPage("dashboard");
  const handleLogout = () => setCurrentPage("login");
  const goToCheckInPage = () => setCurrentPage("checkin");
  const goToDashboard = () => setCurrentPage("dashboard");
  const goToDataPage = () => setCurrentPage("userData"); // Navigate to User Data page
  const goBackToDashboard = () => setCurrentPage("dashboard"); // Go back to Dashboard

  if (currentPage === "login") {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (currentPage === "checkin") {
    return <CheckInPage onBack={goToDashboard} />;
  }

  if (currentPage === "userData") {
    return <UserPage onBack={goBackToDashboard} />; // Pass goBack as a prop to UserPage
  }

  return (
    <Dashboard
      onLogout={handleLogout}
      onCheckIn={goToCheckInPage}
      onUserData={goToDataPage} // Pass the function to navigate to User Data page
    />
  );
}

export default App;
