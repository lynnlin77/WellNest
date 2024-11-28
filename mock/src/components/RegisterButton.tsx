import React from 'react';
import '../styles/RegisterButton.css';

type RegisterButtonProps = {
  onClick: () => void; // Type for a function with no arguments and no return value
};

const RegisterButton: React.FC<RegisterButtonProps> = ({ onClick }) => {
  return (
    <button className="register-button" onClick={onClick}>
      Register
    </button>
  );
};

export default RegisterButton;
