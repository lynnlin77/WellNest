import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react"; // Import the useUser hook
import StyledButton from "../StyledButton";
import "../../styles/CheckUserLocationsPage.css"; // Import the specific CSS
import { getAllowedUsers, getLocation } from "../../components/api"; 

interface CheckUserLocationsPageProps {
  onBack: () => void;
}

interface User {
  id: string;
  allowedUser: string;
}

function CheckUserLocationsPage({ onBack }: CheckUserLocationsPageProps) {
  const { user } = useUser(); // Fetch the logged-in user
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserLocation, setSelectedUserLocation] = useState<any>(null); 
  const [error, setError] = useState<string | null>(null);

  // Fetch email from emailAddresses (assuming the user has emailAddresses)
  const loggedInUserEmail = user?.emailAddresses[0]?.emailAddress || ""; // Access email through emailAddresses array

  useEffect(() => {
    if (!loggedInUserEmail) {
      setError("User is not logged in or email is not available.");
      return;
    }

    // Fetch the allowed users for the logged-in user using their email
    const fetchAllowedUsers = async () => {
      const response = await getAllowedUsers(loggedInUserEmail); // Pass the email directly

      if (response.success && response.data) {
        setUsers(response.data); // Set the allowed users in state
      } else {
        setUsers([]); // Default to an empty array if no data
        setError(response.message || "Failed to fetch allowed users.");
      }
    };

    fetchAllowedUsers();
  }, [loggedInUserEmail]);

  // Handle user selection to fetch their location
  const handleUserClick = async (userId: string) => {
    try {
      const locationData = await getLocation(userId);
      console.log(locationData); 
      if (locationData && locationData.data && locationData.data.lat && locationData.data.long) {
        setSelectedUserLocation({
          userId: userId, 
          latitude: locationData.data.lat,
          longitude: locationData.data.long,
        });
      } else {
        setError("Location data is missing for this user.");
      }
    } catch (err) {
      console.error(err); 
      setError("Failed to fetch location data. Please try again.");
    }
  };

  return (
    <div className="check-user-locations-page">
      <header className="check-user-locations-header">
        <h1>WellNest Check User Locations</h1>
      </header>

      <div className="user-container">
        <h2>View Users Location</h2>
        {/* Display users in boxes */}
        {users.length > 0 ? (
          users.map((user, index) => (
            <div
              key={index}
              className="user-box"
              onClick={() => handleUserClick(user.id)} // Pass the userId to handle click
            >
              <p className="user-name">{user.allowedUser}</p>
            </div>
          ))
        ) : (
          <p>No allowed users found.</p>
        )}
      </div>

      {/* Display selected user's location */}
      {selectedUserLocation ? (
        <div className="location-details">
          <h3>Location of {users.find(u => u.id === selectedUserLocation?.userId)?.allowedUser}</h3>
          <p>Latitude: {selectedUserLocation.latitude}</p>
          <p>Longitude: {selectedUserLocation.longitude}</p>
          
          {/* Button to view selected user's location on Google Maps */}
          <button
            className="map-button"
            onClick={() =>
              window.open(`https://maps.google.com/?q=${selectedUserLocation.latitude},${selectedUserLocation.longitude}`, "_blank")
            }
          >
            <img src="/path-to-map-icon.svg" alt="Map Icon" className="map-icon" />
            View on Map
          </button>
        </div>
      ) : null}

      {/* Go Back Button */}
      <div className="go-back-button-container">
        <StyledButton onClick={onBack} color="purple">
          Go Back
        </StyledButton>
      </div>
    </div>
  );
}

export default CheckUserLocationsPage;
