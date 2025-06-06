import PropTypes from "prop-types";
import React, { useMemo } from "react";
import { Link } from "react-router-dom";

/**
 * Logo component with responsive sizing and optimization
 * Uses modern React 19 patterns and Context7 best practices
 */
export default function Logo({
  size = "medium",
  variant = "primary",
  linkTo = "/",
  className = "",
  withText = false,
}) {
  // Define sizes based on Tailwind classes
  const sizeClasses = useMemo(
    () => ({
      small: "h-8 w-8",
      medium: "h-10 w-10",
      large: "h-12 w-12",
    }),
    []
  );

  // Get size class or default to medium
  const sizeClass = sizeClasses[size] || sizeClasses.medium;

  // Define alt text
  const altText = "BevArena";

  // For B-Circle logo variant
  if (variant === "circle") {
    return (
      <Link to={linkTo} className="font-bold text-xl flex items-center">
        <span className="flex items-center">
          <div className="bg-white rounded-full h-8 w-8 flex items-center justify-center mr-2">
            <span className="text-blue-700 font-bold text-xl">B</span>
          </div>
          {withText && <span>BevArena</span>}
        </span>
      </Link>
    );
  }

  // Choose image source based on variant
  const imageSrc =
    variant === "user"
      ? "/images/bevarena-logo.png"
      : "/images/logo-icon-small.png";

  // Build class names for the image wrapper and image
  const wrapperClasses =
    variant === "user"
      ? "flex items-center justify-center rounded-full border border-gray-300 overflow-hidden"
      : "";
  const wrapperSizeClass = variant === "user" ? sizeClass : "";

  // Image classes - for user variant we enforce square aspect ratio and object-cover
  const imageClasses = `${variant === "user" ? "h-full w-full object-cover" : sizeClass} ${className}`;

  // With container or just the image
  const logoImage =
    variant === "user" ? (
      <div className={`${wrapperSizeClass} ${wrapperClasses}`}>
        <img
          src={imageSrc}
          alt={altText}
          className={imageClasses}
          loading="eager"
          fetchPriority="high"
        />
      </div>
    ) : (
      <img
        src={imageSrc}
        alt={altText}
        className={imageClasses}
        loading="eager"
        fetchPriority="high"
      />
    );

  // Return with or without link wrapper
  if (linkTo) {
    return (
      <Link to={linkTo} className="flex items-center">
        {logoImage}
        {withText && (
          <span
            className={`ml-2 font-bold ${size === "small" ? "text-base" : "text-xl"}`}
          >
            BevArena
          </span>
        )}
      </Link>
    );
  }

  return logoImage;
}

Logo.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  variant: PropTypes.oneOf(["primary", "user", "circle"]),
  linkTo: PropTypes.string,
  className: PropTypes.string,
  withText: PropTypes.bool,
};
