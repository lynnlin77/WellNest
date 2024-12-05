import React from "react";
import { LoginButton } from "./LoginButton";
import RegisterButton from "./RegisterButton";
import "../styles/LoginPage.css"; // Import the styles

interface LoginPageProps {
  onLogin: () => void;
}

function LoginPage({ onLogin }: LoginPageProps) {
  return (
    <div className="login-page">
      <h1>WellNest</h1>
      <h2>Welcome to Senior Safety Check</h2>
      <h3>
        A community platform for senior citizens to check in and <br />
        stay connected with their loved ones.
      </h3>
      <div className="login-buttons-container">
        {/* Left Component */}
        <div>
          <h3>Is it your first time <br /> using this site?</h3>
          <RegisterButton onClick={() => alert('Register button clicked!')} />
        </div>

        {/* Right Component */}
        <div>
          <h3>Already a user?</h3>
          <br />
          <LoginButton isLoggedIn={false} setIsLoggedIn={onLogin} />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
