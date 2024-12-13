// import React from "react";
// import StyledButton from "../StyledButton"; // Import StyledButton if you want consistent button styling
// import "../../styles/UserPage.css"; // Import CSS specific to the Manage Users page

// interface UserPageProps {
//   onBack: () => void; // Add onBack prop to navigate back
// }

// function UserPage({ onBack }: UserPageProps) {
//   return (
//       <div className="user-data-header">
//         <h1>WellNest Loved Ones Check</h1>
//       {/* Go Back button */}
//       <div className="go-back-button-container">
//         <StyledButton onClick={onBack} color="purple">
//           Go Back
//         </StyledButton>
//       </div>
//     </div>
//   );
// }

// export default UserPage;

import React, { useEffect, useState } from "react";
import StyledButton from "../StyledButton"; // Import StyledButton if you want consistent button styling
import "../../styles/UserPage.css"; // Import CSS specific to the User Page
import { getLocation } from "../../components/api"; // Import the handler function

interface UserPageProps {
  user: { name: string; email: string; userId: string }; // Add userId to the user prop
  onBack: () => void; // Function to go back to the previous page
}

function UserPage({ user, onBack }: UserPageProps) {
  const [locationData, setLocationData] = useState<{ lat: number; long: number; time: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch location and check-in time when the component mounts
  useEffect(() => {
    const fetchLocation = async () => {
      const { success, data, message } = await getLocation(user.userId);

      if (success && data) {
        setLocationData(data); // Set the fetched location and check-in time
      } else {
        setError(message || "Failed to fetch location.");
      }
    };

    fetchLocation();
  }, [user.userId]); // Re-fetch when userId changes

  return (
    <div className="user-data-header">
      <h1>WellNest Loved Ones Check</h1>
      <div className="user-data-container">
        <p>User Name: {user.name}</p>
        <p>User Email: {user.email}</p>

        {/* Display Last Check-In and Location */}
        {locationData ? (
          <>
            <p><strong>Last Check-In:</strong> {new Date(locationData.time).toLocaleString()}</p>
            <p><strong>Location:</strong> Latitude: {locationData.lat}, Longitude: {locationData.long}</p>
          </>
        ) : (
          <p>{error || "Loading location data..."}</p>
        )}
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


