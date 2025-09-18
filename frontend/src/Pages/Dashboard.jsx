

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import HeroBanner from "../Components/ui/HeroBanner";
import StatsGrid from "../Components/dashboard/StatsGrid";
import RecentRecommendations from "../Components/dashboard/RecentRecommendations";

import { User } from "../entities/User.js";
import { CareerRecommendation } from "../entities/CareerRecommendation.js";
import { ChatMessage } from "../entities/ChatMessage.js";
import { createPageUrl } from "../utils.js";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    recommendationsCount: 0,
    savedCareersCount: 0,
    completionScore: 0,
    chatSessionsCount: 0
  });

  const calculateProfileCompletion = useCallback((user) => {
    if (!user) return 0;
    let score = 0;
    const fields = [
      "full_name",
      "skills",
      "interests",
      "education_level",
      "experience_level",
      "career_goals",
      "personality_traits"
    ];
    fields.forEach((field) => {
      if (user[field]) {
        score += Array.isArray(user[field])
          ? user[field].length > 0 ? 100 / fields.length : 0
          : 100 / fields.length;
      }
    });
    return Math.round(score);
  }, []);

  const loadDashboardData = useCallback(async () => {
    setIsLoading(true);
    try {
      // Get current user
      const currentUser = await User.me();
      console.log(currentUser);
      setUser(currentUser);
      if (!currentUser) return;

      // Fetch recommendations via frontend API wrapper
      const userRecommendations = await CareerRecommendation.getAll(currentUser._id); // limit 10
      setRecommendations(userRecommendations || []);

      // Fetch chat messages (optional)
      let chatMessages = [];
      try {
        chatMessages = (await ChatMessage.filter({ created_by: currentUser.email }, "-created_date", 100)) || [];
      } catch (e) {
        console.warn("ChatMessage.filter failed", e);
      }

      const uniqueSessions = new Set(chatMessages.map((m) => m.chat_session_id)).size;
      const savedCareers = (userRecommendations || []).filter((rec) => rec.is_saved).length;
      const completionScore = calculateProfileCompletion(currentUser);

      setStats({
        recommendationsCount: (userRecommendations || []).length,
        savedCareersCount: savedCareers,
        completionScore,
        chatSessionsCount: uniqueSessions
      });
    } catch (error) {
      console.error("Error loading dashboard:", error);
    } finally {
      setIsLoading(false);
    }
  }, [calculateProfileCompletion]);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);


  // Toggle is_saved on a recommendation
  const handleSaveCareer = async (recommendation) => {
    try {
      const updated = await CareerRecommendation.update(recommendation._id, {
        is_saved: !recommendation.is_saved
      });

      setRecommendations((prev) =>
        prev.map((rec) =>
          rec._id === recommendation._id ? updated : rec
        )
      );

      loadDashboardData(); // refresh stats
    } catch (error) {
      console.error("Error toggling save:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-400 to-indigo-400 animate-pulse mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          key={`${stats.recommendationsCount}-${stats.savedCareersCount}-${stats.completionScore}-${stats.chatSessionsCount}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <HeroBanner user={user} />
          <StatsGrid
            recommendationsCount={stats.recommendationsCount}
            savedCareersCount={stats.savedCareersCount}
            completionScore={stats.completionScore}
            chatSessionsCount={stats.chatSessionsCount}
          />
        </motion.div>


        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            <RecentRecommendations
              recommendations={recommendations}
              onSaveCareer={handleSaveCareer}
              onViewDetails={(career) => setSelectedCareer(career)}
            />
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-6 border border-purple-100"
            >
              <h3 className="font-bold text-lg mb-4 text-gray-900">Quick Actions</h3>

              <div className="space-y-3">
                <Link
                  to={createPageUrl("Chatbot")}
                  className="block p-4 bg-white rounded-2xl hover:shadow-md transition-all duration-300 border border-purple-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <span className="text-white text-sm">🤖</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Chat with AI Mentor</p>
                      <p className="text-xs text-gray-600">Get personalized guidance</p>
                    </div>
                  </div>
                </Link>

                <Link
                  to={createPageUrl("Profile")}
                  className="block p-4 bg-white rounded-2xl hover:shadow-md transition-all duration-300 border border-purple-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                      <span className="text-white text-sm">👤</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Update Profile</p>
                      <p className="text-xs text-gray-600">Improve recommendations</p>
                    </div>
                  </div>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

