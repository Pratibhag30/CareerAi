

import React, { useState } from "react";
import axios from "axios";
import { getRecommendations } from "../../Integrations/Core";
import CareerCard from "../recommendations/CareerCard";
import CareerDetailsModal from "../recommendations/CareerDetailsModal";

export default function ProfileForm2() {
  const [skills, setSkills] = useState("");
  const [interests, setInterests] = useState("");
  const [aptitude, setAptitude] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCareer, setSelectedCareer] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setRecommendations([]);

    try {
      const userInput = { skills, interests, aptitude };
      const result = await getRecommendations(userInput);

      console.log(result);

      const storedUser = JSON.parse(localStorage.getItem("user"));
      const userId = storedUser?._id;
     console.log(userId);
      // //  Save in backend
      await axios.post(
        `http://localhost:5000/api/userCareer/save/${userId}`,
        { careers: result.response.recommendations }
      );
       console.log("saved to database");
      if (result.success && result.response.recommendations) {
        setRecommendations(result.response.recommendations);
      } else {
        setError("No recommendations found. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Tell Us About Yourself
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Enter your skills (comma separated)"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="border border-gray-300 p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
          />
          <input
            type="text"
            placeholder="Enter your interests"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            className="border border-gray-300 p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
          />
          <input
            type="text"
            placeholder="Enter your aptitude"
            value={aptitude}
            onChange={(e) => setAptitude(e.target.value)}
            className="border border-gray-300 p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-xl shadow-md hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 font-semibold"
          >
            {loading ? "Getting Recommendations..." : "Get Recommendations"}
          </button>
        </form>

        {/* Show error */}
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        {/* Show recommendations */}
        <div className="mt-8">
          {recommendations.length > 0 && (
            <h3 className="text-xl font-semibold mb-4 text-gray-700 text-center">
              Top Career Recommendations:
            </h3>
          )}
          <div className="space-y-4">
            {recommendations.map((career, index) => (
              <CareerCard
                key={index}
                career={career}
                onViewDetails={(career) => setSelectedCareer(career)}
              />
            ))}
          </div>
        </div>

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

