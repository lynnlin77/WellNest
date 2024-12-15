import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import StyledButton from "../StyledButton";
import "../../styles/CheckUserLocationsPage.css";
import { getAllowedUsers, getLocation } from "../../components/api";

interface CheckUserLocationsPageProps {
  onBack: () => void;
}

interface User {
  id: string;
  allowedUser: string;
  lastCheckedIn: string;
}

function CheckUserLocationsPage({ onBack }: CheckUserLocationsPageProps) {
  const { user } = useUser();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserLocation, setSelectedUserLocation] = useState<{
    userId: string;
    latitude: number;
    longitude: number;
    time: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loggedInUserEmail = user?.emailAddresses[0]?.emailAddress || "";

  useEffect(() => {
    if (!loggedInUserEmail) {
      setError("User is not logged in or email is not available.");
      return;
    }

    const fetchAllowedUsers = async () => {
      try {
        const response = await getAllowedUsers(loggedInUserEmail);
        if (response.success && response.data) {
          setUsers(
            response.data.map((user: any) => ({
              id: user.id,
              allowedUser: user.allowedUser,
              lastCheckedIn: user.lastCheckedIn,
            }))
          );
        } else {
          setUsers([]);
          setError(response.message || "Failed to fetch allowed users.");
        }
      } catch (err) {
        console.error(err);
        setError("An error occurred while fetching allowed users.");
      }
    };

    fetchAllowedUsers();
  }, [loggedInUserEmail]);

  const handleUserClick = async (userId: string) => {
    const userKey = `lastLocation_${userId}`;

    // Check localStorage for cached location
    const cachedLocation = localStorage.getItem(userKey);
    if (cachedLocation) {
      setSelectedUserLocation(JSON.parse(cachedLocation));
      return;
    }

    try {
      const locationData = await getLocation(userId);
      if (locationData && locationData.data && locationData.data.lat && locationData.data.long) {
        const location = {
          userId,
          latitude: locationData.data.lat,
          longitude: locationData.data.long,
          time: locationData.data.time || "Unknown time",
        };
        setSelectedUserLocation(location);
        // Cache the location in localStorage
        localStorage.setItem(userKey, JSON.stringify(location));
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
        {users.length > 0 ? (
          users.map((user, index) => (
            <div
              key={index}
              className="user-box"
              onClick={() => handleUserClick(user.id)}
            >
              <p className="user-name">{user.allowedUser}</p>
            </div>
          ))
        ) : (
          <p>No allowed users found.</p>
        )}
      </div>

      {selectedUserLocation && (
        <div className="location-details">
          <h3>
            Location of {users.find((u) => u.id === selectedUserLocation.userId)?.allowedUser}
          </h3>
          <p>Latitude: {selectedUserLocation.latitude}</p>
          <p>Longitude: {selectedUserLocation.longitude}</p>
          <p>Last Checked In: {new Date(selectedUserLocation.time).toLocaleString()}</p>
          <button
            className="map-button"
            onClick={() =>
              window.open(
                `https://maps.google.com/?q=${selectedUserLocation.latitude},${selectedUserLocation.longitude}`,
                "_blank"
              )
            }
          >
            View on Map
          </button>
        </div>
      )}

      <div className="go-back-button-container">
        <StyledButton onClick={onBack} color="purple">
          Go Back
        </StyledButton>
      </div>
    </div>
  );
}

export default CheckUserLocationsPage;

