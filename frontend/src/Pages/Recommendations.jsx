
import React, { useState, useEffect, useContext } from "react";
import { Briefcase, Palette, Laptop, Stethoscope } from "lucide-react";
import ProfileForm2 from "../Components/profile/ProfileForm2.jsx";
import CareerCard from "../Components/recommendations/CareerCard.jsx";
import CareerDetailsModal from "../Components/recommendations/CareerDetailsModal.jsx";
import { User } from "../entities/User.js";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext.jsx";


export default function Recommendations() {
  const [showForm, setShowForm] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [selectedCareer, setSelectedCareer] = useState(null);

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const savedShowForm = localStorage.getItem("showForm");
    if (savedShowForm === "true") setShowForm(true);
  }, []);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const currentUser = await User.me(); 
  //       console.log(currentUser);
  //       setUser(currentUser); // null if not logged in, object if logged in
  //     } catch (err) {
  //       console.error("Error fetching user:", err);
  //       setUser(null);
  //     }
  //   };

  //   fetchUser();
  // }, []);


  //  const handleButtonClick = () => {
  //   if (user) {
  //     setShowForm(!showForm); // toggle form
  //   } else {
  //     navigate("/login"); // redirect if not logged in
  //   }
  // };

  const handleButtonClick = () => {
    if (user) {
      const newState = !showForm;
      setShowForm(newState);
      localStorage.setItem("showForm", newState); // save current state
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-indigo-50 p-10">

      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold text-gray-800">
          🚀 Explore Careers
        </h1>
        <p className="text-gray-600 mt-3 text-lg">
          Discover your perfect career path based on your skills, interests, and goals.
        </p>
      </div>

      {/* Button to show form */}
      <div className="text-center">
        <button
          onClick={handleButtonClick}
          className="mt-8 bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-8 py-3 rounded-xl shadow-md hover:scale-105 transition flex items-center gap-2"
        >
          {showForm ? "Hide Form" : "Get New Suggestion"}
        </button>
      </div>

      {/* Show form */}
      {showForm && user ? (
        <div className="mt-8">
          <ProfileForm2 setRecommendations={setRecommendations} />
        </div>
      ) : <>
        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 w-full max-w-5xl">
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition text-center">
            <Laptop className="w-10 h-10 text-indigo-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold">Technology</h3>
            <p className="text-sm text-gray-500">AI, Web Dev, Data Science</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition text-center">
            <Palette className="w-10 h-10 text-purple-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold">Design</h3>
            <p className="text-sm text-gray-500">UI/UX, Graphic Design</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition text-center">
            <Briefcase className="w-10 h-10 text-green-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold">Business</h3>
            <p className="text-sm text-gray-500">Finance, Marketing, HR</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition text-center">
            <Stethoscope className="w-10 h-10 text-pink-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold">Healthcare</h3>
            <p className="text-sm text-gray-500">Medicine, Nursing, Research</p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center max-w-4xl">
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-bold text-indigo-600">1000+</h2>
            <p className="text-gray-600">Students Guided</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-bold text-purple-600">50+</h2>
            <p className="text-gray-600">Career Paths</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-bold text-green-600">90%</h2>
            <p className="text-gray-600">Success Rate</p>
          </div>
        </div>
      </>}

      {/* Show recommendations */}
      <div className="mt-8">
        {recommendations.length > 0 && (
          <>
            <h3 className="text-xl font-semibold mb-4">Top Career Recommendations:</h3>
            {recommendations.map((career, index) => (
              <CareerCard
                key={index}
                career={career}
                onViewDetails={(career) => {
                  console.log("Clicked Career:", career);
                  setSelectedCareer(career)
                }
                }
              />
            ))}
          </>
        )}
      </div>

      {/* Modal for career details */}
      {selectedCareer && (
        <CareerDetailsModal
          career={selectedCareer}
          onClose={() => setSelectedCareer(null)}
        />
      )}


    </div>
  );
}

