// import React from "react";
// import { motion } from "framer-motion";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { 
//   Target, 
//   TrendingUp, 
//   BookOpen, 
//   MessageCircle,
//   Sparkles
// } from "lucide-react";

// export default function StatsGrid({ 
//   recommendationsCount = 0, 
//   savedCareersCount = 0, 
//   completionScore = 0,
//   chatSessionsCount = 0 
// }) {
//   const stats = [
//     {
//       title: "AI Recommendations",
//       value: recommendationsCount,
//       subtitle: "Personalized suggestions",
//       icon: Target,
//       gradient: "from-green-400 to-blue-500",
//       bgGradient: "from-green-50 to-blue-50"
//     },
//     {
//       title: "Saved Careers",
//       value: savedCareersCount,
//       subtitle: "Your favorites",
//       icon: BookOpen,
//       gradient: "from-purple-400 to-pink-500",
//       bgGradient: "from-purple-50 to-pink-50"
//     },
//     {
//       title: "Profile Score",
//       value: `${completionScore}%`,
//       subtitle: "Completion rate",
//       icon: TrendingUp,
//       gradient: "from-amber-400 to-orange-500",
//       bgGradient: "from-amber-50 to-orange-50"
//     },
//     {
//       title: "Mentor Chats",
//       value: chatSessionsCount,
//       subtitle: "AI conversations",
//       icon: MessageCircle,
//       gradient: "from-indigo-400 to-purple-500",
//       bgGradient: "from-indigo-50 to-purple-50"
//     }
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//       {stats.map((stat, index) => (
//         <motion.div
//           key={stat.title}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: index * 0.1 }}
//         >
//           <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
//             <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-50`} />
//             <CardContent className="relative p-6">
//               <div className="flex items-start justify-between mb-4">
//                 <div className={`p-3 rounded-2xl bg-gradient-to-r ${stat.gradient} shadow-lg`}>
//                   <stat.icon className="w-6 h-6 text-white" />
//                 </div>
//                 <Sparkles className="w-4 h-4 text-gray-400" />
//               </div>
              
//               <div className="space-y-2">
//                 <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
//                 <p className="font-semibold text-gray-700">{stat.title}</p>
//                 <p className="text-sm text-gray-500">{stat.subtitle}</p>
//               </div>
              
//               {stat.title === "Profile Score" && completionScore < 100 && (
//                 <Badge variant="secondary" className="mt-3 bg-yellow-100 text-yellow-800">
//                   Complete for better suggestions
//                 </Badge>
//               )}
//             </CardContent>
//           </Card>
//         </motion.div>
//       ))}
//     </div>
//   );
// }

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, TrendingUp, BookOpen, MessageCircle, Sparkles } from "lucide-react";

export default function StatsGrid({
  recommendationsCount = 0,
  savedCareersCount = 0,
  completionScore = 0,
  chatSessionsCount = 0
}) {
  const stats = [
    {
      title: "AI Recommendations",
      value: recommendationsCount,
      subtitle: "Personalized suggestions",
      icon: Target,
      gradient: "from-green-400 to-blue-500",
      bgGradient: "from-green-50 to-blue-50"
    },
    {
      title: "Saved Careers",
      value: savedCareersCount,
      subtitle: "Your favorites",
      icon: BookOpen,
      gradient: "from-purple-400 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50"
    },
    {
      title: "Profile Score",
      value: `${completionScore}%`,
      subtitle: "Completion rate",
      icon: TrendingUp,
      gradient: "from-amber-400 to-orange-500",
      bgGradient: "from-amber-50 to-orange-50"
    },
    {
      title: "Mentor Chats",
      value: chatSessionsCount,
      subtitle: "AI conversations",
      icon: MessageCircle,
      gradient: "from-indigo-400 to-purple-500",
      bgGradient: "from-indigo-50 to-purple-50"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card
          key={stat.title}
          as={motion.div} // animate the card itself
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {/* Gradient overlay behind content */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-30 -z-10`}
          />

          <CardContent className="relative p-6">
            {/* Top icons row */}
            <div className="flex items-start justify-between mb-4">
              <div
                className={`p-3 rounded-2xl bg-gradient-to-r ${stat.gradient} shadow-lg relative z-10`}
              >
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <Sparkles className="w-4 h-4 text-gray-400 relative z-10" />
            </div>

            {/* Stats content */}
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="font-semibold text-gray-700">{stat.title}</p>
              <p className="text-sm text-gray-500">{stat.subtitle}</p>

              {/* Badge for incomplete profile */}
              {stat.title === "Profile Score" && completionScore < 100 && (
                <Badge
                  variant="secondary"
                  className="mt-3 bg-yellow-100 text-yellow-800 relative z-10"
                >
                  Complete for better suggestions
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
