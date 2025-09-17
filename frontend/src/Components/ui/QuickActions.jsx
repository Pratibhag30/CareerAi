import React from "react";
import { Button } from "./button";
import { MessageCircle, User } from "lucide-react";

export default function QuickActions() {
  return (
    <div className="rounded-2xl p-6 bg-gradient-to-br from-purple-50 to-indigo-50 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
      <div className="flex flex-col gap-3">
        <Button className="flex items-center gap-2 bg-purple-600 text-white hover:bg-purple-700">
          <MessageCircle size={18} /> Chat with AI Mentor
        </Button>
        <Button className="flex items-center gap-2 bg-indigo-600 text-white hover:bg-indigo-700">
          <User size={18} /> Update Profile
        </Button>
      </div>
    </div>
  );
}
