import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import CareerCard from "../recommendations/CareerCard";
import CareerDetailsModal from "../recommendations/CareerDetailsModal";
import { 
  ArrowRight, 
  TrendingUp, 
  Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "/src/utils.js";
import { useState } from "react";
export default function RecentRecommendations({ 
  onViewDetails = onViewDetails,
  recommendations = [], 
  onSaveCareer, 
  isLoading = false 
}) {

  const [selectedCareer, setSelectedCareer] = useState(null);
  const getGrowthColor = (growth) => {
    switch (growth) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'average': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatSalary = (salaryRange) => {
    if (!salaryRange) return 'Salary varies';
    return `$${salaryRange.min?.toLocaleString()} - $${salaryRange.max?.toLocaleString()}`;
  };

  if (isLoading) {
    return (
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            AI Career Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-24 bg-gray-200 rounded-2xl"></div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Sparkles className="w-5 h-5 text-purple-600" />
            AI Career Recommendations
          </CardTitle>
          <Link to={createPageUrl("Allcareer")}>
            <Button variant="outline" size="sm" className="rounded-full">
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {recommendations.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 gradient-lavender rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <p className="text-gray-600 mb-4">No recommendations yet!</p>
            <Link to={createPageUrl("recommendations")}>
              <Button className="gradient-mint text-white shadow-lg">
                 get started
              </Button>
            </Link>
          </div>
        ) : (
          recommendations.slice(-3).map((rec, index) => (
            <CareerCard
                key={index}
                career={rec}
                onViewDetails={(career) => setSelectedCareer(career)}
            />
          ))
        )}

          {/* Career Details Modal */}
                {selectedCareer && (
                  <CareerDetailsModal
                    career={selectedCareer}
                    onClose={() => setSelectedCareer(null)}
                  />
                )}
       
      </CardContent>
    </Card>
  );
}
