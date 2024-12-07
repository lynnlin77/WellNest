import React from "react";
import "../styles/StyledButton.css";

interface StyledButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  color: string; // Prop to customize button color
}

function StyledButton({ onClick, children, color }: StyledButtonProps) {
  return (
    <button 
      className="styled-button" 
      onClick={onClick} 
      style={{ backgroundColor: color }}
    >
      {children}
    </button>
  );
}

export default StyledButton;
