// src/App.jsx
import React, { useEffect, useState } from "react";
import ChartDisplay from "./Components/ChartDisplay";
import Login from "./Components/Login";
import { auth } from "./Services/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // Check localStorage for saved theme
  useEffect(() => {
    const savedMode = localStorage.getItem("theme");
    if (savedMode === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  // Watch for theme toggle
  const toggleTheme = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return newMode;
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currUser) => {
      setUser(currUser);
    });
  }, []);

  if (!user) {
    return <Login onLogin={() => window.location.reload()} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">📊 CollabViz Dashboard</h1>
        <div className="flex gap-2 items-center">
          <button
            onClick={toggleTheme}
            className="bg-yellow-400 dark:bg-purple-600 text-white px-3 py-1 rounded hover:opacity-90"
          >
            {darkMode ? " Light Mode" : " Dark Mode"}
          </button>
          <button
            onClick={() => signOut(auth)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      <ChartDisplay user={user} />
    </div>
  );
}

export default App;
