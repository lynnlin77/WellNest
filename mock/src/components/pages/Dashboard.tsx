// import React from "react";
// import StyledButton from "../../components/StyledButton";
// import "../../styles/Dashboard.css";

// interface DashboardProps {
//   onLogout: () => void;
//   onCheckIn: () => void;
// }

// function Dashboard({ onLogout, onCheckIn }: DashboardProps) {
//   return (
//     <div className="dashboard">
//       <header className="dashboard-header">
//         <h1 className="dashboard-header-title">WellNest Dashboard</h1>
//       </header>

//       <h3 className="dashboard-subtitle">
//         Do you want to report your location? <br /> Click Check in
//       </h3>
//       <br></br>
//       <StyledButton onClick={onCheckIn} color="#81f676">
//         Check In
//       </StyledButton>
//       <br></br>
//       <h3 className="dashboard-subtitle">
//         Do you want to check on your loved ones? <br /> Click Manage Users
//       </h3>
//       <br></br>
//       <StyledButton
//         onClick={() => alert("Manage Users button clicked!")}
//         color="#3692fc"
//       >
//         Manage Users
//       </StyledButton>

//       <br />

//       <div className="logout-button-container">
//         <StyledButton onClick={onLogout} color="purple">
//           Logout
//         </StyledButton>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

import React, { useState } from "react";
import StyledButton from "../../components/StyledButton";
import "../../styles/Dashboard.css";
import ManageUsersPage from "./ManageUsersPage"; // Import ManageUsersPage

interface DashboardProps {
  onLogout: () => void;
  onCheckIn: () => void;
}

function Dashboard({ onLogout, onCheckIn }: DashboardProps) {
  const [showManageUsersPage, setShowManageUsersPage] = useState(false);

  const handleManageUsersClick = () => {
    setShowManageUsersPage(true); // Show the Manage Users page when clicked
  };

  const handleGoBack = () => {
    setShowManageUsersPage(false); // Return to the Dashboard when clicked
  };

  return (
    <div className="dashboard">
      {!showManageUsersPage ? (
        // Main Dashboard Content
        <div>
          <header className="dashboard-header">
            <h1 className="dashboard-header-title">WellNest Dashboard</h1>
          </header>

          <h3 className="dashboard-subtitle">
            Do you want to report your location? <br /> Click Check in
          </h3>
          <br />
          <StyledButton onClick={onCheckIn} color="#81f676">
            Check In
          </StyledButton>
          <br />
          <h3 className="dashboard-subtitle">
            Do you want to check on your loved ones? <br /> Click Manage Users
          </h3>
          <br />
          <StyledButton
            onClick={handleManageUsersClick} // Trigger the manage users page
            color="#3692fc"
          >
            Manage Users
          </StyledButton>
          <br />

          <div className="logout-button-container">
            <StyledButton onClick={onLogout} color="purple">
              Logout
            </StyledButton>
          </div>
        </div>
      ) : (
        // Only show ManageUsersPage, no Dashboard content or header
        <ManageUsersPage onBack={handleGoBack} />
      )}
    </div>
  );
}

export default Dashboard;

