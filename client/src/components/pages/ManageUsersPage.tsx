

// export default ManageUsersPage;

import React, { useState, useEffect } from "react";
import StyledButton from "../StyledButton";
import "../../styles/ManageUsersPage.css"; // Import CSS specific to the Manage Users page
import { useUser } from "@clerk/clerk-react";
import { addAllowedUserAPI } from "../api";

interface ManageUsersPageProps {
  onBack: () => void;
}

interface User {
  name: string;
  email: string;
  userId: string;
}

function ManageUsersPage({ onBack }: ManageUsersPageProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [newUserEmail, setNewUserEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  useEffect(() => {
    // Whenever the user changes, reset to an empty state
    if (user) {
      const storageKey = `allowedUsers-${user.primaryEmailAddress?.emailAddress}`;
      const savedUsers = localStorage.getItem(storageKey);

      if (savedUsers) {
        // Load existing users for this user
        setUsers(JSON.parse(savedUsers));
      } else {
        // Reset users list for new user
        setUsers([]);
        localStorage.setItem(storageKey, JSON.stringify([]));
      }
    }
  }, [user]);

  const handleAddUser = async () => {
    if (!newUserEmail) {
      setError("Please enter a valid email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newUserEmail)) {
      setError("Invalid email format. Please enter a valid email address.");
      return;
    }

    try {
      const userEmail = user.primaryEmailAddress?.emailAddress;
      const storageKey = `allowedUsers-${userEmail}`;
      const response = await addAllowedUserAPI(userEmail || "", newUserEmail);

      if (response.success) {
        const newUser = { name: "New User", email: newUserEmail, userId: `user-${Date.now()}` };
        setUsers((prevUsers) => {
          const updatedUsers = [...prevUsers, newUser];
          localStorage.setItem(storageKey, JSON.stringify(updatedUsers));
          return updatedUsers;
        });
        setNewUserEmail("");
        setError(null);
      } else {
        setError(response.message || "Failed to add user. Please try again.");
      }
    } catch (err) {
      console.error("Error in handleAddUser:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="manage-users-page">
      <header className="manage-users-header">
        <h1>WellNest Manage Users</h1>
      </header>

      <div className="user-container">
        <h2>Current Allowed Users</h2>
        {users.map((user, index) => (
          <div key={index} className="user-box">
            <p className="user-name">{user.name}</p>
            <p className="user-email">{user.email}</p>
          </div>
        ))}

        <input
          type="email"
          value={newUserEmail}
          onChange={(e) => setNewUserEmail(e.target.value)}
          placeholder="Enter email to add user"
          className="email-input"
        />
      </div>

      <div className="add-user-container">
        <button onClick={handleAddUser} className="add-user-button">
          Add User
        </button>
        {error && <p className="error-message">{error}</p>}
      </div>

      <div className="go-back-button-container">
        <StyledButton onClick={onBack} color="purple">
          Go Back
        </StyledButton>
      </div>
    </div>
  );
}

export default ManageUsersPage;




// CLERK
// import React, { useState, useEffect } from "react";
// import StyledButton from "../StyledButton";
// import "../../styles/ManageUsersPage.css"; // Import CSS specific to the Manage Users page
// import { ClerkProvider, useClerk, useUser } from "@clerk/clerk-react";

// interface ManageUsersPageProps {
//   onBack: () => void;
// }

// interface User {
//   name: string;
//   email: string;
//   userId: string;
// }

// function ManageUsersPage({ onBack }: ManageUsersPageProps) {
//   const [users, setUsers] = useState<User[]>([]);
//   const [newUserEmail, setNewUserEmail] = useState("");
//   const [error, setError] = useState<string | null>(null);
//   const [userId, setUserId] = useState<string>("");

//   const { user } = useUser(); // Fetch the logged-in user
//   const { client } = useClerk();

//   useEffect(() => {
//     if (user) {
//       setUserId(user.id);
//       // Fetch the list of users from the backend (instead of directly from Clerk)
//       fetch("http://localhost:3000/get-users")
//         .then((response) => response.json())
//         .then((data) => {
//           // Assuming the backend returns a list of users in the same format
//           setUsers(data.users);
//         })
//         .catch((err) => {
//           console.error("Error fetching users:", err);
//           setError("Failed to load users.");
//         });
//     }
//   }, [user]); // Fetch users whenever the logged-in user changes

//   // Handle adding a new user
//   const handleAddUser = async () => {
//     if (!newUserEmail) {
//       setError("Please enter a valid email address.");
//       return;
//     }

//     try {
//       // Fetch the list of users from the backend again (you could optimize this)
//       const response = await fetch("http://localhost:3000/get-users");
//       const data = await response.json();
//       const userToAdd = data.users.find(
//         (u: User) => u.email === newUserEmail
//       );

//       if (!userToAdd) {
//         setError("This email is not registered in our system.");
//         return;
//       }

//       // Call the backend API to add the user to the allowed list
//       const addUserResponse = await fetch("http://localhost:3000/add-allowed-user", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           userId,
//           userToAddEmail: newUserEmail,
//         }),
//       });

//       const addUserData = await addUserResponse.json();
//       if (addUserResponse.ok && addUserData.success) {
//         setUsers((prevUsers) => [
//           ...prevUsers,
//           {
//             name: userToAdd.name || "New User",
//             email: newUserEmail,
//             userId: userToAdd.userId,
//           },
//         ]);
//         setNewUserEmail(""); // Clear the input field
//         setError(null); // Clear any existing error
//       } else {
//         setError(addUserData.error || "Failed to add user. Please try again.");
//       }
//     } catch (err) {
//       console.error(err);
//       setError("An unexpected error occurred. Please try again.");
//     }
//   };

//   return (
//     <div className="manage-users-page">
//       <header className="manage-users-header">
//         <h1>WellNest Manage Users</h1>
//       </header>

//       <div className="user-container">
//         <h2>Current Allowed Users</h2>
//         {/* Display users in boxes */}
//         {users.map((user, index) => (
//           <div key={index} className="user-box">
//             <p className="user-name">{user.name}</p>
//             <p className="user-email">{user.email}</p>
//           </div>
//         ))}

//         {/* Input for adding a new user */}
//         <input
//           type="email"
//           value={newUserEmail}
//           onChange={(e) => setNewUserEmail(e.target.value)}
//           placeholder="Enter email to add user"
//           className="email-input"
//         />
//       </div>

//       <div className="add-user-container">
//         {/* Add User Button */}
//         <button onClick={handleAddUser} className="add-user-button">
//           Add User
//         </button>
//         {/* Error Message */}
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

