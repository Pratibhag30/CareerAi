import React from "react";

export const Card = ({ children, className }) => (
  <div className={`rounded-2xl shadow-md bg-white p-4 ${className || ""}`}>
    {children}
  </div>
);

export const CardHeader = ({ children }) => (
  <div className="mb-2 font-bold text-gray-800">{children}</div>
);

export const CardContent = ({ children }) => (
  <div className="text-sm text-gray-600">{children}</div>
);

export const CardTitle = ({ children }) => (
  <h3 className="text-lg font-semibold text-gray-900">{children}</h3>
);
