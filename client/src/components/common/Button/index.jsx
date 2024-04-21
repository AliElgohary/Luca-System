import React from "react";
import styles from "./Button.module.css";
const Button = ({
  children,
  className = "",
  type,
  variant = "default",
  disabled,
  onClick,
  rounded,
}) => {
  // types are primary/ secondary / warning /error /dark

  return (
    <button
      role={"button"}
      type={type}
      className={`
      transition-all
       duration-500 
       ${rounded ? "rounded-2xl" : ""}
         ${styles.btn}
        ${className}
        ${variant == "error" ? "bg-red-700" : ""}
        ${variant == "info" ? "bg-secondary-1" : ""}
        ${variant == "default" ? "bg-primary-2" : ""}
        ${variant == "success" ? "bg-green-700" : ""}
        ${variant == "warning" ? "bg-amber-400" : ""}
        `}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
