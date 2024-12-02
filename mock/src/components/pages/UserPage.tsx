import React from "react";
import StyledButton from "../../components/StyledButton"; // Import StyledButton if you want consistent button styling
import "../../styles/UserPage.css"; // Import CSS specific to the Manage Users page

interface UserPageProps {
  onBack: () => void; // Add onBack prop to navigate back
}

function UserPage({ onBack }: UserPageProps) {
  return (
      <div className="user-data-header">
        <h1>WellNest Loved Ones Check</h1>
      {/* Go Back button */}
      <div className="go-back-button-container">
        <StyledButton onClick={onBack} color="purple">
          Go Back
        </StyledButton>
      </div>
    </div>
  );
}

export default UserPage;
