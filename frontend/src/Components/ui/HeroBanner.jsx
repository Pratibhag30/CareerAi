

export default function HeroBanner({ user }) {
  return (
    <section className="bg-gradient-to-r from-purple-400 via-pink-300 to-blue-400 text-white p-8 rounded-2xl shadow-md">
      <h2 className="text-3xl font-bold mb-2">
        {user ? `Welcome, ${user.full_name} 👋` : "Welcome 👋"}
      </h2>
      <p className="text-lg mb-6">
        Ready to discover your perfect career path? Let our AI analyze your skills,
        interests, and goals to provide personalized recommendations.
      </p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-700 max-w-3xl">
        <div className="p-4 bg-white rounded-xl shadow-md">
          <h3 className="font-semibold text-purple-600">AI Career Match</h3>
          <p className="text-sm">Get personalized career paths based on your skills & interests.</p>
        </div>
        <div className="p-4 bg-white rounded-xl shadow-md">
          <h3 className="font-semibold text-purple-600">Step-by-Step Roadmap</h3>
          <p className="text-sm">Follow a clear learning & growth plan for your chosen career.</p>
        </div>
        <div className="p-4 bg-white rounded-xl shadow-md">
          <h3 className="font-semibold text-purple-600">Future Growth Insights</h3>
          <p className="text-sm">Know which careers are in demand and have long-term potential.</p>
        </div>
      </div>

    </section>
  );
}
