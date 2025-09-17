export const User = {
  me: async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return null;

      const response = await fetch("http://localhost:5000/api/auth/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
      });

      if (!response.ok) throw new Error("Failed to fetch user");

      const data = await response.json();
      return data; 
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  },

  updateMyUserData: async (profileData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No auth token");

      const res = await fetch("http://localhost:5000/api/profile/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      if (!res.ok) throw new Error("Failed to save profile");

      const data = await response.json();
      return data.profile; 
 
    } catch (err) {
      console.error("Error saving user data:", err);
      throw err;
    }
  },
};



