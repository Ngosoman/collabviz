// src/components/ChartDisplay.jsx
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { db } from "../Services/firebase";
import { ref, onValue, set } from "firebase/database";
import { get, child } from "firebase/database";

const [dashboardName, setDashboardName] = useState("");
const [savedDashboards, setSavedDashboards] = useState([]);
{/* Save Dashboard */}
<div className="mt-6 bg-gray-50 p-4 rounded shadow">
  <h3 className="font-semibold mb-2">💾 Save Current Dashboard</h3>
  <input
    type="text"
    placeholder="Enter dashboard name"
    value={dashboardName}
    onChange={(e) => setDashboardName(e.target.value)}
    className="w-full p-2 border rounded mb-2"
  />
  <button
    onClick={handleSaveDashboard}
    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
  >
    Save Dashboard
  </button>
</div>

{/* Load Dashboard */}
<div className="mt-4 bg-gray-50 p-4 rounded shadow">
  <h3 className="font-semibold mb-2">📂 Load Saved Dashboard</h3>
  <select
    value=""
    onChange={(e) => handleLoadDashboard(e.target.value)}
    className="w-full p-2 border rounded"
  >
    <option value="">-- Select Dashboard --</option>
    {savedDashboards.map((name, i) => (
      <option key={i} value={name}>{name}</option>
    ))}
  </select>
</div>
const handleSaveDashboard = async () => {
  if (!dashboardName || !labels.length) return alert("Missing dashboard name or data");

  const chartRef = ref(db, "chartData");
  const commentsRef = ref(db, "comments");

  const [chartSnap, commentsSnap] = await Promise.all([
    get(chartRef),
    get(commentsRef),
  ]);

  const dashboardData = {
    chartData: chartSnap.val(),
    comments: commentsSnap.val(),
  };

  const saveRef = ref(db, `dashboards/${user.uid}/${dashboardName}`);
  await set(saveRef, dashboardData);

  alert("Dashboard saved!");
  fetchDashboards(); // refresh list
};

const handleLoadDashboard = async (name) => {
  const snap = await get(ref(db, `dashboards/${user.uid}/${name}`));
  const data = snap.val();
  if (!data) return;

  await set(ref(db, "chartData"), data.chartData || {});
  await set(ref(db, "comments"), data.comments || {});
};

const fetchDashboards = async () => {
  const snap = await get(ref(db, `dashboards/${user.uid}`));
  if (snap.exists()) {
    setSavedDashboards(Object.keys(snap.val()));
  }
};

useEffect(() => {
  if (user?.uid) {
    fetchDashboards();
  }
}, [user]);


ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const ChartDisplay = ({ user }) => {
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);

  useEffect(() => {
    const chartRef = ref(db, "chartData");

    const unsubscribe = onValue(chartRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setLabels(data.labels || []);
        setValues(data.values || []);
      }
    });

    return () => unsubscribe();
  }, []);

  const updateData = () => {
    const newData = {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      values: Array.from({ length: 6 }, () => Math.floor(Math.random() * 300)),
    };

    set(ref(db, "chartData"), newData);
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Live Traffic",
        data: values,
        borderColor: "rgb(59, 130, 246)",
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
  };

  const [selectedLabel, setSelectedLabel] = useState("");


  return (
  <div className="p-4 bg-white rounded-xl shadow-md">
    <div className="flex justify-between items-center mb-2">
      <h2 className="text-lg font-semibold">📈 Live Chart</h2>
      <button
        onClick={updateData}
        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Randomize Data
      </button>
    </div>
    <Line data={data} options={options} />
    <div className="mt-4">
      <label className="block text-sm font-medium mb-1">🗓 Select Day to Comment On:</label>
      <select
        value={selectedLabel}
        onChange={(e) => setSelectedLabel(e.target.value)}
        className="border p-2 rounded w-full"
      >
        <option value="">-- choose a day --</option>
        {labels.map((label, idx) => (
          <option key={idx} value={label}>
            {label}
          </option>
        ))}
      </select>
      {selectedLabel && <CommentBox label={selectedLabel} userEmail={user.email} />}
    </div>
  </div>
);
}

export default ChartDisplay;
