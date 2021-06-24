import React from "react";
import "../styles/components/Button.css";

const Button = ({ className, style, onClick, onSubmit, ...props }) => {
  return (
    <button
      className={`main-button ${className}`}
      style={style}
      onClick={onClick}
      onSubmit={onSubmit}
    >
      {props.children}
    </button>
  );
};

export default Button;
