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
    </div>
  );
};

export default ChartDisplay;
