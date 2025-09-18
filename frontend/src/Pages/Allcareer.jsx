

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { CareerRecommendation } from "../Entities/CareerRecommendation.js";
import { User } from "../Entities/User.js";
import { Button } from "../Components/ui/button.jsx";
import { ArrowLeft } from "lucide-react";

import CareerCard from "../Components/recommendations/CareerCard.jsx";
import CareerDetailsModal from "../Components/recommendations/CareerDetailsModal.jsx";

export default function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCareer, setSelectedCareer] = useState(null);

  useEffect(() => {
    const loadRecommendations = async () => {
      setIsLoading(true);
      try {
        const currentUser = await User.me();
        const allRecommendations = await CareerRecommendation.getAll(currentUser._id);
        setRecommendations(allRecommendations || []);
      } catch (error) {
        console.error("Error loading recommendations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRecommendations();
  }, []);

  const handleSaveCareer = async (rec) => {
    try {
      await CareerRecommendation.update(rec.id, {
        is_saved: !rec.is_saved,
      });
      setRecommendations((prev) =>
        prev.map((r) =>
          r.id === rec.id ? { ...r, is_saved: !r.is_saved } : r
        )
      );
    } catch (error) {
      console.error("Error saving career:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading recommendations…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 md:p-10 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            All Career Recommendations
          </h1>
          <Link to="/">
            <Button variant="outline" size="sm" className="rounded-full">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        {/* Recommendations Grid */}
        {recommendations.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No recommendations yet.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((rec, index) => (
              <div>
                <motion.div>
                  <CareerCard
                    key={index}
                    career={rec}
                    onViewDetails={(career) => setSelectedCareer(career)}
                    onSaveCareer={handleSaveCareer}
                  />
                </motion.div>
              </div>

            ))}
          </div>
        )}

        {/* Career Details Modal */}
        {selectedCareer && (
          <CareerDetailsModal
            career={selectedCareer}
            onClose={() => setSelectedCareer(null)}
          />
        )}
      </div>
    </div>
  );
}
