// // import React from "react";
// // import StyledButton from "../StyledButton";
// // import "../../styles/CheckInPage.css"; // Import the CSS file
// // import { addLocation } from "../../components/api";

// // interface CheckInPageProps {
// //   onBack: () => void;
// // }

// // function CheckInPage({ onBack }: CheckInPageProps) {
// //   return (
// //     <div className="checkin-page">
// //       <h1>WellNest Check In</h1>
// //       <h3>Update check in by clicking</h3>

// //       <div className="button-container">
// //         <StyledButton
// //           onClick={() => alert("Check-in completed!")}
// //           color="#81f676"
// //         >
// //           Check-In
// //         </StyledButton>

// //         <div className="paragraph-container">
// //           <p>Last checked in: 11/26/2024, 5:29:04 PM</p>
// //           <p>Location: 40.7129, -74.0061</p>
// //         </div>
// //         <button className="map-button">View on Map</button>

// //         <div className="go-back-button-container">
// //           <StyledButton onClick={onBack} color="purple">
// //             Go Back
// //           </StyledButton>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default CheckInPage;

// import React, { useState } from "react";
// import { useUser } from "@clerk/clerk-react"; // Import Clerk's useUser hook
// import StyledButton from "../StyledButton";
// import "../../styles/CheckInPage.css";
// import { addLocation } from "../../components/api";

// interface CheckInPageProps {
//   onBack: () => void;
// }

// function CheckInPage({ onBack }: CheckInPageProps) {
//   const { user } = useUser(); // Retrieve the logged-in user details
//   const [lastCheckIn, setLastCheckIn] = useState<{ lat: number; long: number; time: string }>({
//     lat: 0,
//     long: 0,
//     time: "",
//   });

//   const handleCheckIn = async () => {
//     if (!user || !user.emailAddresses || user.emailAddresses.length === 0) {
//       alert("User information not found. Please log in again.");
//       return;
//     }

//     const userId = user.id; // Clerk's unique ID for the user
//     const email = user.emailAddresses[0].emailAddress; // The user's email address

//     if (!navigator.geolocation) {
//       alert("Geolocation is not supported by your browser.");
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const lat = position.coords.latitude;
//         const long = position.coords.longitude;
//         const time = new Date().toISOString(); // Current timestamp in ISO format

//         try {
//           // Call the addLocation function to send data to the backend
//           const result = await addLocation(userId, lat, long, time); // Corrected function call

//           if (result.success) {
//             // If successful, update the check-in information
//             setLastCheckIn({ lat, long, time });
//             alert("Check-in completed!");
//           } else {
//             alert(`Error: ${result.message}`);
//           }
//         } catch (error) {
//           console.error("Error during check-in:", error);
//           alert("An unexpected error occurred. Please try again.");
//         }
//       },
//       (error) => {
//         console.error("Error getting location:", error);
//         alert("Unable to retrieve your location.");
//       }
//     );
//   };

//   return (
//     <div className="checkin-page">
//       <h1>WellNest Check In</h1>
//       <h3>Update check-in by clicking</h3>

//       <div className="button-container">
//         <StyledButton onClick={handleCheckIn} color="#81f676">
//           Check-In
//         </StyledButton>

//         <div className="paragraph-container">
//           <p>Last checked in: {lastCheckIn.time || "N/A"}</p>
//           <p>
//             Location: {lastCheckIn.lat !== 0 && lastCheckIn.long !== 0
//               ? `${lastCheckIn.lat}, ${lastCheckIn.long}`
//               : "N/A"}
//           </p>
//         </div>
//         <button className="map-button">View on Map</button>

//         <div className="go-back-button-container">
//           <StyledButton onClick={onBack} color="purple">
//             Go Back
//           </StyledButton>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CheckInPage;



// // import React, { useState } from "react";
// // import StyledButton from "../StyledButton";
// // import "../../styles/CheckInPage.css"; // Import the CSS file
// // import { addLocation } from "../../components/api"; // Import the addLocation function

// // interface CheckInPageProps {
// //   onBack: () => void;
// // }

// // function CheckInPage({ onBack }: CheckInPageProps) {
// //   const [lastCheckIn, setLastCheckIn] = useState<{ lat: number; long: number; time: string }>({
// //     lat: 0,
// //     long: 0,
// //     time: "",
// //   });

// //   const handleCheckIn = async () => {
// //     const userId = "jonie"; // Replace with dynamic user information
// //     const lat = 40.7129; // Replace with dynamic latitude (e.g., from a geolocation API)
// //     const long = -74.0061; // Replace with dynamic longitude
// //     const time = new Date().toISOString(); // Current timestamp in ISO format

// //     // Call the addLocation function to send data to the backend
// //     const result = await addLocation(userId, lat, long, time);

// //     if (result.success) {
// //       // If successful, update the check-in information
// //       setLastCheckIn({ lat, long, time });
// //       alert("Check-in completed!");
// //     } else {
// //       alert(`Error: ${result.message}`);
// //     }
// //   };

// //   return (
// //     <div className="checkin-page">
// //       <h1>WellNest Check In</h1>
// //       <h3>Update check in by clicking</h3>

// //       <div className="button-container">
// //         <StyledButton onClick={handleCheckIn} color="#81f676">
// //           Check-In
// //         </StyledButton>

// //         <div className="paragraph-container">
// //           <p>Last checked in: {lastCheckIn.time || "N/A"}</p>
// //           <p>Location: {lastCheckIn.lat}, {lastCheckIn.long}</p>
// //         </div>
// //         <button className="map-button">View on Map</button>

// //         <div className="go-back-button-container">
// //           <StyledButton onClick={onBack} color="purple">
// //             Go Back
// //           </StyledButton>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default CheckInPage;

import React, { useState } from "react";
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

  const handleCheckIn = async () => {
    if (!user || !user.emailAddresses || user.emailAddresses.length === 0) {
      alert("User information not found. Please log in again.");
      return;
    }
  
    const userId = user.id;
  
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
  
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        const time = new Date().toISOString();
  
        console.log("Geolocation:", lat, long); // Debugging geolocation
  
        try {
          const result = await addLocation(userId, lat, long, time);
          console.log("API Response:", result); // Debugging API response
  
          if (result.success && result.data) {
            const { lat = 0, long = 0, time = "N/A" } = result.data;
            setLastCheckIn({ lat, long, time });
            console.log("Updated State:", { lat, long, time }); // Debugging updated state
            alert("Check-in completed!");
          } else {
            // this part edited
            setLastCheckIn({ lat, long, time });
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
        <button className="map-button" onClick={() =>
          window.open(`https://maps.google.com/?q=${lastCheckIn.lat},${lastCheckIn.long}`, "_blank")
        }>
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
