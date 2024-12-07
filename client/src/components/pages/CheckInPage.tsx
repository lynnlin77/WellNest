import React from "react";
import StyledButton from "../StyledButton";
import "../../styles/CheckInPage.css"; // Import the CSS file

interface CheckInPageProps {
  onBack: () => void;
}

function CheckInPage({ onBack }: CheckInPageProps) {
  return (
    <div className="checkin-page">
      <h1>WellNest Check In</h1>
      <h3>Update check in by clicking</h3>

      <div className="button-container">
        <StyledButton
          onClick={() => alert("Check-in completed!")}
          color="#81f676"
        >
          Check-In
        </StyledButton>

        <div className="paragraph-container">
          <p>Last checked in: 11/26/2024, 5:29:04 PM</p>
          <p>Location: 40.7129, -74.0061</p>
        </div>
        <button className="map-button">View on Map</button>

        <div className="go-back-button-container">
          <StyledButton onClick={onBack} color="purple">
            Go Back
          </StyledButton>
        </div>
      </div>
    </div>
  );
}

export default CheckInPage;
