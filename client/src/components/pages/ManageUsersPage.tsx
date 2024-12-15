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