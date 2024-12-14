
// export default CheckInPage;

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import StyledButton from "../StyledButton";
import "../../styles/CheckInPage.css";
import { addLocation } from "../../components/api";

interface CheckInPageProps {
  onBack: () => void;
}

function CheckInPage({ onBack }: CheckInPageProps) {
  const { user } = useUser();
  const [lastCheckIn, setLastCheckIn] = useState<{ lat: number; long: number; time: string }>({
    lat: 0,
    long: 0,
    time: "",
  });

  // Load last check-in data for the specific user from localStorage
  useEffect(() => {
    if (user) {
      const userKey = `lastCheckIn_${user.id}`;
      const savedCheckIn = localStorage.getItem(userKey);
      if (savedCheckIn) {
        setLastCheckIn(JSON.parse(savedCheckIn));
      } else {
        setLastCheckIn({ lat: 0, long: 0, time: "" }); // Reset for new users
      }
    }
  }, [user]);

  const handleCheckIn = async () => {
    if (!user || !user.emailAddresses || user.emailAddresses.length === 0) {
      alert("User information not found. Please log in again.");
      return;
    }

    const userId = user.id;
    const userEmail = user.primaryEmailAddress?.emailAddress;

    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        const time = new Date().toISOString();

        try {
          const result = await addLocation(userEmail, lat, long, time);
          if (result.success && result.data) {
            const { lat = 0, long = 0, time = "N/A" } = result.data;
            setLastCheckIn({ lat, long, time });

            // Store the updated check-in data in localStorage with user-specific key
            const userKey = `lastCheckIn_${userId}`;
            localStorage.setItem(userKey, JSON.stringify({ lat, long, time }));
            alert("Check-in completed!");
          } else {
            alert(`Error: ${result.message || "Unknown error."}`);
          }
        } catch (error) {
          console.error("Error during check-in:", error);
          alert("An unexpected error occurred. Please try again.");
        }
      },
      (error) => {
        console.error("Geolocation Error:", error.message);
        alert("Unable to retrieve your location.");
      }
    );
  };

  return (
    <div className="checkin-page">
      <h1>WellNest Check In</h1>
      <h3>Update check-in by clicking</h3>

      <div className="button-container">
        <StyledButton onClick={handleCheckIn} color="#81f676">
          Check-In
        </StyledButton>

        <div className="paragraph-container">
          <p>Last checked in: {lastCheckIn.time || "N/A"}</p>
          <p>
            Location: {lastCheckIn.lat !== 0 && lastCheckIn.long !== 0
              ? `${lastCheckIn.lat}, ${lastCheckIn.long}`
              : "N/A"}
          </p>
        </div>
        <button
          className="map-button"
          onClick={() =>
            window.open(`https://maps.google.com/?q=${lastCheckIn.lat},${lastCheckIn.long}`, "_blank")
          }
        >
          View on Map
        </button>

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
