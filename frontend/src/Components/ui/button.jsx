import React from "react";
import clsx from "clsx";

export const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={clsx(
        "px-4 py-2 rounded-xl shadow-sm font-medium transition bg-purple-600 text-white hover:bg-purple-700 focus:ring-2 focus:ring-purple-500",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
