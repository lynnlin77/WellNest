import React from "react";
import { LoginButton } from "./LoginButton";
import RegisterButton from "./RegisterButton";
import "../styles/LoginPage.css"; // Import the styles
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
  SignUpButton,
} from "@clerk/clerk-react";

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
          <div className="register-button">
            <SignUpButton />
          </div>
          {/* <RegisterButton onClick={() => alert('Register button clicked!')} /> */}
        </div>

        {/* Right Component */}
        <div>
          <h3>Already a user?</h3>
          <br />
          <SignedOut>
            <SignInButton></SignInButton>
          </SignedOut>
          <SignedIn>
            <SignOutButton></SignOutButton>
            <br />
            <LoginButton isLoggedIn={false} setIsLoggedIn={onLogin} />
          </SignedIn>
          {/* <LoginButton isLoggedIn={false} setIsLoggedIn={onLogin} /> */}
        </div>

      </div>
    </div>
  );
}

export default LoginPage;


