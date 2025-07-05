// src/App.jsx
import React from "react";
import ChartDisplay from "./Components/ChartDisplay";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">📊 CollabViz Dashboard</h1>
      <ChartDisplay />
    </div>
  );
}

export default App;
