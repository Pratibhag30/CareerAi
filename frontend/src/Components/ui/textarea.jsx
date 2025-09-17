import React from "react";

export const Textarea = ({ className, ...props }) => (
  <textarea
    className={`w-full rounded-xl border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm ${className}`}
    rows={4}
    {...props}
  />
);
