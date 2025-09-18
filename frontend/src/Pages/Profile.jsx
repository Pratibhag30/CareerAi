import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User } from "@/entities/User.js";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import ProfileForm from "../Components/profile/ProfileForm";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Load user on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await User.me();
        setUser(currentUser);
      } catch (error) {
        console.error("Error loading user:", error);
      } finally {
        setIsInitialLoading(false);
      }
    };

    loadUser();
  }, []);

  // Save profile
  const handleSaveProfile = async (profileData) => {
    setIsLoading(true);
    try {
      if (!user?._id) throw new Error("User ID missing");

      await fetch("https://careerai-5ztl.onrender.com/api/profile/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id, ...profileData }),
      });

      toast.success("Profile saved successfully!");
      // Optionally navigate
      navigate("/");
    } catch (error) {
      console.error("Profile save error:", error);
      toast.error(" Failed to save profile. Try again.");
    }
    setIsLoading(false);
  };



  if (isInitialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 gradient-lavender rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">⚠️ Could not load user data.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="hover:bg-purple-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gradient">Complete Your Profile</h1>
            <p className="text-gray-600 mt-1">
              Fill out your profile so we can save your information
            </p>
          </div>
        </motion.div>

        <ProfileForm
          user={user}
          onSave={handleSaveProfile}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
