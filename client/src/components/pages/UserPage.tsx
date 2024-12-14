// import React, { useEffect, useState } from "react";
// import StyledButton from "../StyledButton"; // Import StyledButton if you want consistent button styling
// import "../../styles/UserPage.css"; // Import CSS specific to the User Page
// import { getLocation } from "../../components/api"; // Import the handler function

// interface UserPageProps {
//   user: { name: string; email: string; userId: string }; // Add userId to the user prop
//   onBack: () => void; // Function to go back to the previous page
// }

// function UserPage({ user, onBack }: UserPageProps) {
//   const [locationData, setLocationData] = useState<{ lat: number; long: number; time: string } | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   // Fetch location and check-in time when the component mounts
//   useEffect(() => {
//     const fetchLocation = async () => {
//       const { success, data, message } = await getLocation(user.userId);

//       if (success && data) {
//         setLocationData(data); // Set the fetched location and check-in time
//       } else {
//         setError(message || "Failed to fetch location.");
//       }
//     };

//     fetchLocation();
//   }, [user.userId]); // Re-fetch when userId changes

//   return (
//     <div className="user-data-header">
//       <h1>WellNest Loved Ones Check</h1>
//       <div className="user-data-container">
//         <p>User Name: {user.name}</p>
//         <p>User Email: {user.email}</p>

//         {/* Display Last Check-In and Location */}
//         {locationData ? (
//           <>
//             <p><strong>Last Check-In:</strong> {new Date(locationData.time).toLocaleString()}</p>
//             <p><strong>Location:</strong> Latitude: {locationData.lat}, Longitude: {locationData.long}</p>
//           </>
//         ) : (
//           <p>{error || "Loading location data..."}</p>
//         )}
//       </div>

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
  user: { name: string; email: string; userId: string }; // Expecting the selected user data (name, email, userId)
  onBack: () => void; // Function to go back to the previous page
}

interface LocationData {
  lat: number;
  long: number;
  time: string;
}

function UserPage({ user, onBack }: UserPageProps) {
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the location of the user when the userId changes
    const fetchLocation = async () => {
      const { success, data, message } = await getLocation(user.userId);

      if (success && data) {
        setLocationData(data); // Set the fetched location and check-in time
      } else {
        setError(message || "Failed to fetch location.");
      }
    };

    fetchLocation();
  }, [user.userId]); // Trigger re-fetch when userId changes

  return (
    <div className="user-data-header">
      <h1>WellNest Loved Ones Check</h1>
      <div className="user-data-container">
        {/* Display the selected user's data */}
        <p>User Name: {user.name}</p>
        <p>User Email: {user.email}</p>
        <p>User ID: {user.userId}</p>

        {/* Display the location and check-in time of the selected user */}
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
