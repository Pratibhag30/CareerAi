import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Plus, Sparkles } from "lucide-react";


// Popular skills and personality traits
const SKILL_SUGGESTIONS = ["JavaScript", "Python", "React", "Node.js", "SQL", "Data Analysis", "Project Management", "UX Design", "Marketing", "Sales", "Communication", "Leadership", "Problem Solving", "Creativity", "Analytics", "Machine Learning"];
const PERSONALITY_TRAITS = ["Creative", "Analytical", "Leadership", "Team Player", "Detail-Oriented", "Innovative", "Adaptable", "Goal-Oriented", "Collaborative", "Strategic", "Empathetic", "Organized", "Risk-Taker", "Patient", "Decisive"];

// Helper functions to map full text to Select values
const mapEducation = (text) => {
  switch (text) {
    case "High School": return "high_school";
    case "Bachelor's Degree": return "bachelor";
    case "Master's Degree": return "master";
    case "PhD": return "phd";
    case "Bootcamp/Certificate": return "bootcamp";
    case "Self-Taught": return "self_taught";
    default: return "";
  }
};
const mapExperience = (text) => {
  switch (text) {
    case "Entry Level (0-2 years)": return "entry";
    case "Junior (2-4 years)": return "junior";
    case "Mid Level (4-7 years)": return "mid";
    case "Senior (7+ years)": return "senior";
    case "Expert/Leadership (10+ years)": return "expert";
    default: return "";
  }
};
const mapWorkStyle = (text) => {
  switch (text) {
    case "Remote": return "remote";
    case "Hybrid": return "hybrid";
    case "Office": return "office";
    case "No Preference": return "no_preference";
    default: return "";
  }
};

export default function ProfileForm({ user, onSave, isLoading }) {
  const [formData, setFormData] = useState({
    skills: [],
    interests: [],
    education_level: "",
    experience_level: "",
    preferred_work_style: "",
    career_goals: "",
    personality_traits: [],
    bio: ""
  });

  const [newSkill, setNewSkill] = useState("");
  const [newInterest, setNewInterest] = useState("");

  // Load user data on mount
  useEffect(() => {
    if (user) {
      setFormData({
        skills: user.skills || [],
        interests: user.interests || [],
        education_level: mapEducation(user.education_level),
        experience_level: mapExperience(user.experience_level),
        preferred_work_style: mapWorkStyle(user.preferred_work_style),
        career_goals: user.career_goals || "",
        personality_traits: user.personality_traits || [],
        bio: user.bio || ""
      });
    }
  }, [user]);

  // Skills
  const addSkill = (skill = newSkill) => {
    if (skill.trim() && !formData.skills.includes(skill.trim())) {
      setFormData(prev => ({ ...prev, skills: [...prev.skills, skill.trim()] }));
      setNewSkill("");
    }
  };
  const removeSkill = (skill) => setFormData(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }));

  // Interests
  const addInterest = () => {
    if (newInterest.trim() && !formData.interests.includes(newInterest.trim())) {
      setFormData(prev => ({ ...prev, interests: [...prev.interests, newInterest.trim()] }));
      setNewInterest("");
    }
  };
  const removeInterest = (interest) => setFormData(prev => ({ ...prev, interests: prev.interests.filter(i => i !== interest) }));

  // Personality Traits
  const togglePersonalityTrait = (trait) => {
    setFormData(prev => ({
      ...prev,
      personality_traits: prev.personality_traits.includes(trait)
        ? prev.personality_traits.filter(t => t !== trait)
        : [...prev.personality_traits, trait].slice(0, 5) // max 5 traits
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("⚠️ User data is not loaded yet.");
    if (onSave) onSave(formData);
  };

  return (
    <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">

      {/* Bio */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-purple-50/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" /> About You
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Label htmlFor="bio">Tell us about yourself</Label>
          <Textarea
            id="bio"
            placeholder="Share a brief description about yourself..."
            value={formData.bio}
            onChange={e => setFormData(prev => ({ ...prev, bio: e.target.value }))}
            className="mt-2 min-h-[100px]"
          />
        </CardContent>
      </Card>

      {/* Skills */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-blue-50/30">
        <CardHeader><CardTitle>Your Skills</CardTitle></CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input placeholder="Add a skill..." value={newSkill} onChange={e => setNewSkill(e.target.value)}
              onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addSkill())} />
            <Button type="button" onClick={addSkill} disabled={!newSkill.trim()}><Plus className="w-4 h-4" /></Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.skills.map(skill => (
              <Badge key={skill} variant="secondary" className="bg-blue-100 text-blue-800">
                {skill} <X className="w-3 h-3 ml-1 cursor-pointer hover:text-red-600" onClick={() => removeSkill(skill)} />
              </Badge>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-2">Quick add popular skills:</p>
          <div className="flex flex-wrap gap-2 mt-1">
            {SKILL_SUGGESTIONS.filter(skill => !formData.skills.includes(skill)).slice(0, 8).map(skill => (
              <Button key={skill} type="button" size="sm" variant="outline" onClick={() => addSkill(skill)} className="text-xs hover:bg-blue-50 border-blue-200">{skill}</Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Career Information */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-green-50/30">
        <CardHeader><CardTitle>Career Information</CardTitle></CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6">
          {/* Education */}
          <div>
            <Label>Education Level</Label>
            <Select defaultValue={formData.education_level} onValueChange={v => setFormData(prev => ({ ...prev, education_level: v }))}>
              <SelectTrigger><SelectValue placeholder="Select education level" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="high_school">High School</SelectItem>
                <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                <SelectItem value="master">Master's Degree</SelectItem>
                <SelectItem value="phd">PhD</SelectItem>
                <SelectItem value="bootcamp">Bootcamp/Certificate</SelectItem>
                <SelectItem value="self_taught">Self-Taught</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Experience */}
          <div>
            <Label>Experience Level</Label>
            <Select defaultValue={formData.experience_level} onValueChange={v => setFormData(prev => ({ ...prev, experience_level: v }))}>
              <SelectTrigger><SelectValue placeholder="Select experience level" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                <SelectItem value="junior">Junior (2-4 years)</SelectItem>
                <SelectItem value="mid">Mid Level (4-7 years)</SelectItem>
                <SelectItem value="senior">Senior (7+ years)</SelectItem>
                <SelectItem value="expert">Expert/Leadership (10+ years)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Work Style */}
          <div className="md:col-span-2">
            <Label>Preferred Work Style</Label>
            <Select defaultValue={formData.preferred_work_style} onValueChange={v => setFormData(prev => ({ ...prev, preferred_work_style: v }))}>
              <SelectTrigger><SelectValue placeholder="Select work preference" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
                <SelectItem value="office">Office</SelectItem>
                <SelectItem value="no_preference">No Preference</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Interests & Goals */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-yellow-50/30">
        <CardHeader><CardTitle>Interests & Career Goals</CardTitle></CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-2">
            <Input placeholder="Add interest..." value={newInterest} onChange={e => setNewInterest(e.target.value)}
              onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addInterest())} />
            <Button type="button" onClick={addInterest} disabled={!newInterest.trim()}><Plus className="w-4 h-4" /></Button>
          </div>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.interests.map(i => (
              <Badge key={i} variant="secondary">{i} <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => removeInterest(i)} /></Badge>
            ))}
          </div>
          <Label>Career Goals</Label>
          <Textarea placeholder="Describe your career goals..." value={formData.career_goals}
            onChange={e => setFormData(prev => ({ ...prev, career_goals: e.target.value }))} className="mt-2" />
        </CardContent>
      </Card>

      {/* Personality Traits */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-pink-50/30">
        <CardHeader>
          <CardTitle>Personality Traits</CardTitle>
          <p className="text-sm text-gray-600">Select traits that best describe you (choose up to 5)</p>
        </CardHeader>
        <CardContent> <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {PERSONALITY_TRAITS.map(trait => (<Button key={trait} type="button" variant={formData.personality_traits.includes(trait) ? "default" : "outline"}
            size="sm" onClick={() => togglePersonalityTrait(trait)}
            disabled={!formData.personality_traits.includes(trait) && formData.personality_traits.length >= 5}
            className={formData.personality_traits.includes(trait) ? "bg-pink-500 hover:bg-pink-600 text-white" : "hover:bg-pink-50 border-pink-200"} >
            {trait} </Button>))}
        </div>
        </CardContent>
      </Card>
      {/* Submit */}
      <div className="flex justify-end">
        <Button type="submit" 
        disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Profile"}</Button>
      </div>

    </motion.form>
  );
}
