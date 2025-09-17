import React from "react";

export function Select({ children, className = "", ...props }) {
  return <select {...props} className={`px-3 py-2 border rounded ${className}`}>{children}</select>;
}

export function SelectContent({ children }) {
  return <div>{children}</div>;
}

export function SelectItem({ children, value }) {
  return <option value={value}>{children}</option>;
}

export function SelectTrigger({ children, className = "" }) {
  return <div className={`inline-block ${className}`}>{children}</div>;
}

export function SelectValue({ value }) {
  return <span>{value}</span>;
}
