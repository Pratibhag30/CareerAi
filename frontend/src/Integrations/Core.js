// Core.js placeholder
export function InvokeLLM(prompt) {
  console.log("InvokeLLM called with prompt:", prompt);
  return Promise.resolve("This is a dummy response");
}

// src/Integrations/Core.js
export async function getRecommendations(userInput) {
  const response = await fetch("http://localhost:5000/api/predict-career", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userInput),
  });
  return response.json();
}

