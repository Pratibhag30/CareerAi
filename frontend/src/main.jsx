import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./Layout.jsx";


// Pages
import Dashboard from "./Pages/Dashboard.jsx";
import Chatbot from "./Pages/Chatbot.jsx";
import Profile from "./Pages/Profile.jsx";
import Allcareer from "./Pages/Allcareer.jsx";
import Register from "./Pages/Register.jsx";
import Login from "./Pages/Login.jsx";
import Recommendations from "./Pages/Recommendations.jsx"
import { Toaster } from "react-hot-toast";


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext.jsx"; 

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthProvider>
  <Router>
    <Routes>
      <Route path="/" element={<Layout><Dashboard /></Layout>} />
      <Route path="/chatbot" element={<Layout><Chatbot /></Layout>} />
      <Route path="/profile" element={<Layout><Profile /></Layout>} />
      <Route path="/Allcareer" element={<Layout><Allcareer /></Layout>} />
      <Route path="/recommendations" element={<Layout> <Recommendations/></Layout>} />
       <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
    </Routes>
     <Toaster position="top-right" reverseOrder={false} />
 </Router>
 </AuthProvider>
);
