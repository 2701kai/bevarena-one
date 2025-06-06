import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

/**
 * Button component with various styles and link capabilities
 * Uses React 19 patterns with Context7 best practices
 */
export default function Button({
  children,
  variant = "primary",
  size = "medium",
  to,
  onClick,
  className = "",
  type = "button",
  disabled = false,
  external = false,
  ...props
}) {
  // Tailwind classes based on variant
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50",
    accent: "bg-blue-100 text-blue-600 hover:bg-blue-200",
    danger: "bg-red-600 text-white hover:bg-red-700",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-700",
  };

  // Tailwind classes based on size
  const sizeClasses = {
    small: "px-3 py-1 text-xs",
    medium: "px-4 py-1 text-sm",
    large: "px-5 py-2 text-base",
  };

  // Base classes that apply to all buttons
  const baseClasses =
    "rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50";

  // Combine all classes
  const buttonClasses = `
    ${baseClasses}
    ${variantClasses[variant] || variantClasses.primary}
    ${sizeClasses[size] || sizeClasses.medium}
    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
    ${className}
  `
    .trim()
    .replace(/\s+/g, " ");

  // If it's a link (internal)
  if (to && !external) {
    return (
      <Link to={to} className={buttonClasses} {...props}>
        {children}
      </Link>
    );
  }

  // If it's an external link
  if (to && external) {
    return (
      <a
        href={to}
        className={buttonClasses}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  }

  // Regular button
  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "accent",
    "danger",
    "ghost",
  ]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  to: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  external: PropTypes.bool,
};
