import React from "react";
import { X, TrendingUp, BookOpen, Briefcase, Map, IndianRupee } from "lucide-react";

export default function CareerDetailsModal({ career, onClose }) {
  if (!career) return null;

  const renderBoldText = (text) => {
  if (typeof text !== "string") {
    return text;
  }

  return text.split("**").map((part, idx) =>
    idx % 2 === 1 ? <strong key={idx}>{part}</strong> : part
  );
};


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full overflow-y-auto max-h-[90vh] relative animate-fadeIn">

        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-t-2xl flex justify-between items-center">
          <h2 className="text-2xl font-bold">{career.careerTitle}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Fit Reason */}

          <h3 className="font-semibold mt-2">Why This Career Fits You:</h3>
          <div className="space-y-2 text-gray-700">
         {career.fitReason
                ?.split("-")
                .filter((point) => point.trim() !== "")
                .map((point, i) => (
                  <p key={i}>{renderBoldText(point.trim())}</p>
                ))}
          </div>


          {/* Roadmap */}
          <div>
            <h3 className="flex items-center font-semibold text-lg text-purple-700 mb-2">
              <Map className="mr-2 text-purple-600" size={20} /> Roadmap
            </h3>
            <p className="whitespace-pre-line text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border-l-4 border-purple-500">
              {renderBoldText(career.roadmap)}
            </p>
          </div>

          {/* Salary */}
          <div>
            <h3 className="flex items-center font-semibold text-lg text-purple-700 mb-2">
              <IndianRupee className="mr-2 text-green-600" size={20} /> Salary
            </h3>
            <p className="font-medium text-gray-800">
              ₹{career.salary?.min?.toLocaleString()} – ₹
              {career.salary?.max?.toLocaleString()} {career.salary?.currency}
            </p>
            <p className="text-sm text-gray-500">{career.salary?.note}</p>
          </div>

          {/* Growth Potential */}
          <div>
            <h3 className="flex items-center font-semibold text-lg text-purple-700 mb-2">
              <TrendingUp className="mr-2 text-blue-600" size={20} /> Growth Potential
            </h3>
            <p className="text-gray-700">{career.growthPotential}</p>
          </div>

          {/* Courses */}
          <div>
            <h3 className="flex items-center font-semibold text-lg text-purple-700 mb-2">
              <BookOpen className="mr-2 text-orange-500" size={20} /> Recommended Courses
            </h3>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              {career.courses?.map((c, i) => (
                <li key={i} className="hover:text-purple-600 transition">
                  <span className="font-medium">{c.title}</span> <span className="text-sm text-gray-500">({c.platform})</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-100 rounded-b-2xl flex justify-end">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-5 py-2 rounded-lg shadow hover:bg-red-600 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
