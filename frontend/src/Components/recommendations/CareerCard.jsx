import React from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Bookmark, BookmarkCheck, TrendingUp } from "lucide-react";

export default function CareerCard({ career, onViewDetails, onSaveCareer }) {
  // Growth color
  const getGrowthColor = (growth) => {
    switch (growth?.toLowerCase()) {
      case "excellent":
        return "bg-green-100 text-green-800";
      case "high":
        return "bg-blue-100 text-blue-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Salary formatting
  const formatSalary = (salary) => {
    if (!salary) return "Salary varies";
    if (salary.min && salary.max) {
      return `₹${salary.min.toLocaleString()} - ₹${salary.max.toLocaleString()} ${salary.currency || "INR"}`;
    }
    return "Salary varies";
  };

  return (
    <Card className="shadow-md border border-purple-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
      <CardContent className="p-5">
        {/* Header row */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-bold text-lg text-gray-900">
                {career.careerTitle || career.title}
              </h3>
              {career.match_score && (
                <Badge className="bg-purple-100 text-purple-700 text-xs font-semibold">
                  {career.match_score}% Match
                </Badge>
              )}
            </div>
            <p className="text-gray-600 text-sm line-clamp-2">
              {career.description || career.fitReason}
            </p>
          </div>

          {/* Save Career */}
          {onSaveCareer && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onSaveCareer(career)}
              className="hover:bg-purple-100 text-purple-600"
            >
              {career.is_saved ? (
                <BookmarkCheck className="w-5 h-5" />
              ) : (
                <Bookmark className="w-5 h-5" />
              )}
            </Button>
          )}
        </div>

        {/* Salary + Growth */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="px-3 py-1 bg-green-50 rounded-lg text-green-700 font-medium">
            💰 Salary Range: {formatSalary(career.salary || career.salary_range)}
          </div>
          <Badge className={getGrowthColor(career.growth_outlook || career.growthPotential)}>
            <TrendingUp className="w-4 h-4 mr-1" />
            Growth: {career.growth_outlook || career.growthPotential || "N/A"}
          </Badge>
        </div>

        {/* View Details Button */}
        {onViewDetails && (
          <Button
            onClick={() => onViewDetails(career)}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 rounded-xl shadow-md hover:opacity-90"
          >
            View Details
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
