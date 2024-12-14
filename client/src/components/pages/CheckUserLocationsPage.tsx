// import React, { useState, useEffect } from "react";
// import StyledButton from "../StyledButton";
// import "../../styles/CheckUserLocationsPage.css"; // Import CSS specific to the Check User Locations page
// import UserPage from "./UserPage";

// interface CheckUserLocationsPageProps {
//   onBack: () => void;
// }

// interface User {
//   name: string;
//   email: string;
//   userId: string;
// }

// function CheckUserLocationsPage({ onBack }: CheckUserLocationsPageProps) {
//   const [users, setUsers] = useState<User[]>([
//     { name: "John Doe", email: "johndoe@example.com", userId: "1" },
//     { name: "Jane Smith", email: "janesmith@example.com", userId: "2" },
//   ]);
//   const [newUserEmail, setNewUserEmail] = useState("");
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [userId, setUserId] = useState<string>("");

//   // Fetch the logged-in user's ID from localStorage
//   const getLoggedInUserId = () => {
//     const userId = localStorage.getItem("loggedInUserId");
//     return userId || "";
//   };

//   useEffect(() => {
//     const loggedInUserId = getLoggedInUserId();
//     setUserId(loggedInUserId);
//   }, []);

//   // Handle adding a new user
//   const handleAddUser = async () => {
//     if (newUserEmail) {
//       try {
//         const response = await fetch("http://localhost:3000/add-allowed-user", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             userId,
//             userToAdd: newUserEmail,
//           }),
//         });

//         const data = await response.json();

//         if (response.ok && data.success) {
//           // Update the user list with the new user
//           setUsers([
//             ...users,
//             { name: "New User", email: newUserEmail, userId: "new_user_id" },
//           ]);
//           setNewUserEmail(""); // Clear the input field
//           setError(null); // Clear any existing error
//         } else {
//           setError(data.error || "Failed to add user. Please try again.");
//         }
//       } catch (err) {
//         setError("Failed to add user. Please try again.");
//       }
//     } else {
//       setError("Please enter a valid email address.");
//     }
//   };

//   // Handle user selection to navigate to the UserPage
//   const handleUserClick = (user: User) => {
//     setSelectedUser(user);
//   };

//   // Render the UserPage if a user is selected
//   if (selectedUser) {
//     return <UserPage user={selectedUser} onBack={() => setSelectedUser(null)} />;
//   }

//   return (
//     <div className="check-user-locations-page">
//       <header className="check-user-locations-header">
//         <h1>WellNest Check User Locations</h1>
//       </header>

//       <div className="user-container">
//         <h2>Current Allowed Users</h2>
//         {/* Display users in boxes */}
//         {users.map((user, index) => (
//           <div
//             key={index}
//             className="user-box"
//             onClick={() => handleUserClick(user)}
//           >
//             <p className="user-name">{user.name}</p>
//             <p className="user-email">{user.email}</p>
//           </div>
//         ))}
//       </div>

//       {/* Go Back Button */}
//       <div className="go-back-button-container">
//         <StyledButton onClick={onBack} color="purple">
//           Go Back
//         </StyledButton>
//       </div>
//     </div>
//   );
// }

// export default CheckUserLocationsPage;
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react"; // Import the useUser hook
import StyledButton from "../StyledButton";
import "../../styles/CheckUserLocationsPage.css"; // Import the specific CSS
import { getAllowedUsers } from "../../components/api";

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

  // Handle user selection to navigate to the UserPage
  const handleUserClick = (userId: string) => {
    alert(`Selected user with ID: ${userId}`);
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




