import React from "react";
import StyledButton from "../../components/StyledButton"; // Import StyledButton if you want consistent button styling

interface UserPageProps {
  onBack: () => void; // Add onBack prop to navigate back
}

function UserPage({ onBack }: UserPageProps) {
  return (
    <div className="user-data-page">
      <div className="user-data-header">
        <h1>WellNest Loved Ones Check</h1>
      </div>
      
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
