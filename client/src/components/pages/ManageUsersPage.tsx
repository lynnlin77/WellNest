// // import React, { useState } from "react";
// // import StyledButton from "../StyledButton";
// // import "../../styles/ManageUsersPage.css"; // Import CSS specific to the Manage Users page
// // import UserPage from "./UserPage"; // Import UserPage for conditional rendering

// // interface ManageUsersPageProps {
// //   onBack: () => void;
// // }

// // interface User {
// //   name: string;
// //   email: string;
// // }

// // function ManageUsersPage({ onBack }: ManageUsersPageProps) {
// //   const [users, setUsers] = useState<User[]>([
// //     { name: "John Doe", email: "johndoe@example.com" },
// //     { name: "Jane Smith", email: "janesmith@example.com" },
// //   ]);
// //   const [newUserEmail, setNewUserEmail] = useState("");
// //   const [selectedUser, setSelectedUser] = useState<User | null>(null); // Track the selected user

// //   // Handle adding a new user
// //   const handleAddUser = () => {
// //     if (newUserEmail) {
// //       setUsers([
// //         ...users,
// //         { name: "New User", email: newUserEmail },
// //       ]);
// //       setNewUserEmail("");
// //     } else {
// //       alert("Please enter a valid email address.");
// //     }
// //   };

// //   // Function to handle user click and navigate to UserPage
// //   const handleUserClick = (user: User) => {
// //     setSelectedUser(user); // Set the selected user
// //   };

// //   // If a user is selected, show the UserPage
// //   if (selectedUser) {
// //     return <UserPage user={selectedUser} onBack={() => setSelectedUser(null)} />;
// //   }

// //   return (
// //     <div className="manage-users-page">
// //       <header className="manage-users-header">
// //         <h1>WellNest Manage Users</h1>
// //       </header>

// //       <div className="user-container">
// //         <h2>Current Allowed Users</h2>
// //         {/* Display users in boxes */}
// //         {users.map((user, index) => (
// //           <div
// //             key={index}
// //             className="user-box"
// //             onClick={() => handleUserClick(user)} // Handle user click
// //           >
// //             <p className="user-name">{user.name}</p>
// //             <p className="user-email">{user.email}</p>
// //           </div>
// //         ))}

// //         {/* Empty box for adding a new user */}
// //         <input
// //           type="email"
// //           value={newUserEmail}
// //           onChange={(e) => setNewUserEmail(e.target.value)}
// //           placeholder="Enter email to add user"
// //           className="email-input"
// //         />
// //       </div>

// //       <div className="add-user-container">
// //         <button onClick={handleAddUser} className="add-user-button">
// //           Add User
// //         </button>
// //         <p className="add-user-text">Click to add a user</p>
// //       </div>

// //       <div className="go-back-button-container">
// //         <StyledButton onClick={onBack} color="purple">
// //           Go Back
// //         </StyledButton>
// //       </div>
// //     </div>
// //   );
// // }

// // export default ManageUsersPage;

// import React, { useState, useEffect } from "react";
// import StyledButton from "../StyledButton";
// import "../../styles/ManageUsersPage.css"; // Import CSS specific to the Manage Users page
// import UserPage from "./UserPage";

// interface ManageUsersPageProps {
//   onBack: () => void;
// }

// interface User {
//   name: string;
//   email: string;
//   userId: string;
// }

// function ManageUsersPage({ onBack }: ManageUsersPageProps) {
//   const [users, setUsers] = useState<User[]>([
//     { name: "John Doe", email: "johndoe@example.com", userId: "1" },
//     { name: "Jane Smith", email: "janesmith@example.com", userId: "2" },
//   ]);
//   const [newUserEmail, setNewUserEmail] = useState("");
//   const [selectedUser, setSelectedUser] = useState<User | null>(null); 
//   const [error, setError] = useState<string | null>(null);
//   const [userId, setUserId] = useState<string>("");

//   const getLoggedInUserId = () => {
//     const userId = localStorage.getItem("loggedInUserId");
//     return userId || "";
//   };

//   useEffect(() => {
//     const loggedInUserId = getLoggedInUserId();
//     setUserId(loggedInUserId);
//   }, []);

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
//           setUsers([
//             ...users,
//             { name: "New User", email: newUserEmail, userId: "new_user_id" },
//           ]);
//           setNewUserEmail("");
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

//   const handleUserClick = (user: User) => {
//     setSelectedUser(user);
//   };

//   if (selectedUser) {
//     return <UserPage user={selectedUser} onBack={() => setSelectedUser(null)} />;
//   }

//   return (
//     <div className="manage-users-page">
//       <header className="manage-users-header">
//         <h1>WellNest Manage Users</h1>
//       </header>

//       <div className="user-container">
//         <h2>Current Allowed Users</h2>
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
//         {/* User email input */}
//         <input
//           type="email"
//           value={newUserEmail}
//           onChange={(e) => setNewUserEmail(e.target.value)}
//           placeholder="Enter email to add user"
//           className="email-input"
//         />
//       </div>

//       {/* Add User Button and Error Message */}
//       <div className="add-user-container">
//         <button onClick={handleAddUser} className="add-user-button">
//           Add User
//         </button>
//         {error && <p className="error-message">{error}</p>}
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

// export default ManageUsersPage;

import React, { useState, useEffect } from "react";
import StyledButton from "../StyledButton";
import "../../styles/ManageUsersPage.css"; // Import CSS specific to the Manage Users page
import UserPage from "./UserPage";

interface ManageUsersPageProps {
  onBack: () => void;
}

interface User {
  name: string;
  email: string;
  userId: string;
}

function ManageUsersPage({ onBack }: ManageUsersPageProps) {
  const [users, setUsers] = useState<User[]>([
    { name: "John Doe", email: "johndoe@example.com", userId: "1" },
    { name: "Jane Smith", email: "janesmith@example.com", userId: "2" },
  ]);
  const [newUserEmail, setNewUserEmail] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string>("");

  // Fetch the logged-in user's ID from localStorage
  const getLoggedInUserId = () => {
    const userId = localStorage.getItem("loggedInUserId");
    return userId || "";
  };

  useEffect(() => {
    const loggedInUserId = getLoggedInUserId();
    setUserId(loggedInUserId);
  }, []);

  // Handle adding a new user
  const handleAddUser = async () => {
    if (newUserEmail) {
      try {
        const response = await fetch("http://localhost:3000/add-allowed-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            userToAdd: newUserEmail,
          }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          // Update the user list with the new user
          setUsers([
            ...users,
            { name: "New User", email: newUserEmail, userId: "new_user_id" },
          ]);
          setNewUserEmail(""); // Clear the input field
          setError(null); // Clear any existing error
        } else {
          setError(data.error || "Failed to add user. Please try again.");
        }
      } catch (err) {
        setError("Failed to add user. Please try again.");
      }
    } else {
      setError("Please enter a valid email address.");
    }
  };

  // Handle user selection to navigate to the UserPage
  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  // Render the UserPage if a user is selected
  if (selectedUser) {
    return <UserPage user={selectedUser} onBack={() => setSelectedUser(null)} />;
  }

  return (
    <div className="manage-users-page">
      <header className="manage-users-header">
        <h1>WellNest Manage Users</h1>
      </header>

      <div className="user-container">
        <h2>Current Allowed Users</h2>
        {/* Display users in boxes */}
        {users.map((user, index) => (
          <div
            key={index}
            className="user-box"
            onClick={() => handleUserClick(user)}
          >
            <p className="user-name">{user.name}</p>
            <p className="user-email">{user.email}</p>
          </div>
        ))}

        {/* Input for adding a new user */}
        <input
          type="email"
          value={newUserEmail}
          onChange={(e) => setNewUserEmail(e.target.value)}
          placeholder="Enter email to add user"
          className="email-input"
        />
      </div>

      <div className="add-user-container">
        {/* Add User Button */}
        <button onClick={handleAddUser} className="add-user-button">
          Add User
        </button>
        {/* Error Message */}
        {error && <p className="error-message">{error}</p>}
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

export default ManageUsersPage;
