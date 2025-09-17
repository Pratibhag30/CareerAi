import React from "react";
import clsx from "clsx";

export const Badge = ({ children, className }) => {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-purple-100 text-purple-800",
        className
      )}
    >
      {children}
    </span>
  );
};
