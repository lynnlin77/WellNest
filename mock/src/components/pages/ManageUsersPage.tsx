// import React, { useState } from "react";
// import StyledButton from "../../components/StyledButton";
// import "../../styles/ManageUsersPage.css"; // Import CSS specific to the Manage Users page

// interface ManageUsersPageProps {
//   onBack: () => void;
// }

// interface User {
//   name: string;
//   email: string;
// }

// function ManageUsersPage({ onBack }: ManageUsersPageProps) {
//   const [users, setUsers] = useState<User[]>([
//     { name: "John Doe", email: "johndoe@example.com" },
//     // You can add initial users here
//   ]);
//   const [newUserEmail, setNewUserEmail] = useState("");

//   // Function to handle adding a new user
//   const handleAddUser = () => {
//     if (newUserEmail) {
//       setUsers([
//         ...users,
//         { name: "New User", email: newUserEmail },
//       ]);
//       setNewUserEmail(""); // Clear input after adding
//     } else {
//       alert("Please enter a valid email address.");
//     }
//   };

//   return (
//   <div className="manage-users-page">
//     <header className="manage-users-header">
//       <h1>WellNest Manage Users</h1>
//     </header>

//     <h2>Current Allowed Users</h2>

//     <div className="user-container">
//       {/* Display users in boxes */}
//       {users.map((user, index) => (
//         <div key={index} className="user-box">
//           <p className="user-name">{user.name}</p>
//           <p className="user-email">{user.email}</p>
//         </div>
//       ))}

//       {/* Empty box for adding a new user */}
//       {/* <div className="user-box"> */}
//         <input
//           type="email"
//           value={newUserEmail}
//           onChange={(e) => setNewUserEmail(e.target.value)}
//           placeholder="Enter email to add user"
//           className="email-input"
//         />
//       {/* </div> */}

//       <div className="button-container">
//         <StyledButton onClick={handleAddUser} color="#81f676">
//           Add User
//         </StyledButton>
//       </div>

//       <div className="go-back-button-container">
//         <StyledButton onClick={onBack} color="purple">
//           Go Back
//         </StyledButton>
//       </div>
//     </div>
//   </div>

//   );
// }

// export default ManageUsersPage;

import React, { useState } from "react";
import StyledButton from "../../components/StyledButton";
import "../../styles/ManageUsersPage.css"; // Import CSS specific to the Manage Users page

interface ManageUsersPageProps {
  onBack: () => void;
}

interface User {
  name: string;
  email: string;
}

function ManageUsersPage({ onBack }: ManageUsersPageProps) {
  const [users, setUsers] = useState<User[]>([
    { name: "John Doe", email: "johndoe@example.com" },
    // You can add initial users here
  ]);
  const [newUserEmail, setNewUserEmail] = useState("");

  // Function to handle adding a new user
  const handleAddUser = () => {
    if (newUserEmail) {
      setUsers([
        ...users,
        { name: "New User", email: newUserEmail },
      ]);
      setNewUserEmail(""); // Clear input after adding
    } else {
      alert("Please enter a valid email address.");
    }
  };

  return (
    <div className="manage-users-page">
      <header className="manage-users-header">
        <h1>WellNest Manage Users</h1>
      </header>

      <div className="user-container">
        <h2>Current Allowed Users</h2>
        {/* Display users in boxes */}
        {users.map((user, index) => (
          <div key={index} className="user-box">
            <p className="user-name">{user.name}</p>
            <p className="user-email">{user.email}</p>
          </div>
        ))}

        {/* Empty box for adding a new user */}
        <input
          type="email"
          value={newUserEmail}
          onChange={(e) => setNewUserEmail(e.target.value)}
          placeholder="Enter email to add user"
          className="email-input"
        />

        {/* Button and text */}
      </div>

      <div className="add-user-container">
        <button onClick={handleAddUser} className="add-user-button">
          Add User
        </button>
        <p className="add-user-text">Click to add a user</p>
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
