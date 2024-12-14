import React, { useState } from "react";
import StyledButton from "../StyledButton";
import "../../styles/Dashboard.css";
import ManageUsersPage from "./ManageUsersPage"; // Import ManageUsersPage
import CheckUserLocationsPage from "./CheckUserLocationsPage"; // Import CheckUserLocationsPage

interface DashboardProps {
  onLogout: () => void;
  onCheckIn: () => void;
}

function Dashboard({ onLogout, onCheckIn }: DashboardProps) {
  const [view, setView] = useState<"dashboard" | "manageUsers" | "checkLocations">(
    "dashboard"
  );

  const handleGoBack = () => setView("dashboard");

  return (
    <div className="dashboard">
      {view === "dashboard" && (
        <div>
          <header className="dashboard-header">
            <h1 className="dashboard-header-title">WellNest Dashboard</h1>
          </header>

          <h3 className="dashboard-subtitle">
            Do you want to report your location? <br /> Click Check in
          </h3>
          <br/>
          <StyledButton onClick={onCheckIn} color="#81f676">
            Check In
          </StyledButton>
          <br/>

          <h3 className="dashboard-subtitle">
            Do you want to add allowed users? <br /> Click Manage Users
          </h3>
          <br/>
          <StyledButton
            onClick={() => setView("manageUsers")} // Navigate to ManageUsersPage
            color="#3692fc"
          >
            Manage Users
          </StyledButton>
          <br/>

          <h3 className="dashboard-subtitle">
            Do you want to check on your loved ones? <br /> Click Check Locations
          </h3>
          <br/>
          <StyledButton
            onClick={() => setView("checkLocations")} // Navigate to CheckUserLocationsPage
            color="#f6a242"
          >
            Check Locations
          </StyledButton>
          <br/>

          <div className="logout-button-container">
            <StyledButton onClick={onLogout} color="purple">
              Logout
            </StyledButton>
          </div>
        </div>
      )}

      {view === "manageUsers" && <ManageUsersPage onBack={handleGoBack} />}
      {view === "checkLocations" && <CheckUserLocationsPage onBack={handleGoBack} />}
    </div>
  );
}

export default Dashboard;
