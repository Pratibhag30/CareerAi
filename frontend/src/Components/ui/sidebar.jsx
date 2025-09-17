
import React from "react";

export function Sidebar({ children, className = "" }) {
  return (
    <aside className={`w-72 min-h-screen flex flex-col ${className}`}>
      {children}
    </aside>
  );
}

/* Header / Content / Footer */
export function SidebarHeader({ children, className = "" }) {
  return <div className={`px-4 py-4 ${className}`}>{children}</div>;
}

export function SidebarContent({ children, className = "" }) {
  return <div className={`flex-1 overflow-auto px-2 ${className}`}>{children}</div>;
}

export function SidebarFooter({ children, className = "" }) {
  return <div className={`px-4 py-4 ${className}`}>{children}</div>;
}

/* Grouping helpers */
export function SidebarGroup({ children, className = "" }) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

export function SidebarGroupLabel({ children, className = "" }) {
  return <div className={`px-3 py-2 text-xs font-semibold text-gray-500 ${className}`}>{children}</div>;
}

export function SidebarGroupContent({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

/* Menu/list */
export function SidebarMenu({ children, className = "" }) {
  return <ul className={`space-y-1 ${className}`}>{children}</ul>;
}

export function SidebarMenuItem({ children, className = "" }) {
  return <li className={className}>{children}</li>;
}

/**
 * SidebarMenuButton
 * props:
 *   - asChild: if true, we render children directly (useful when wrapping a <Link/>)
 *   - className: tailwind classes from parent
 */
export function SidebarMenuButton({ children, asChild = false, className = "", ...props }) {
  if (asChild) {
    // Render children (Link) directly — Layout.jsx passes <Link> as child when asChild is true
    const child = React.Children.only(children);
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        className: `${className} ${child.props.className || ""}`.trim(),
        ...props
      });
    }
    return children;
  }

  return (
    <button {...props} className={`w-full text-left px-3 py-2 rounded-lg ${className}`}>
      {children}
    </button>
  );
}


export function SidebarProvider({ children }) {
  return <div className="flex">{children}</div>;
}

export function SidebarTrigger({ children, className = "", ...props }) {
  return (
    <button {...props} className={`p-2 rounded-md ${className}`}>
      {children ?? "☰"}
    </button>
  );
}
