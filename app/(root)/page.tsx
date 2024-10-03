"use client";
import React from "react";
import { Bar, Line, Pie } from "react-chartjs-2"; // Import different chart components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement, // Add PointElement for the Line chart
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement, // Register PointElement
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Dummy Data for the Cards and Charts
const dataItems = [
  { title: "Réponses précises et personnalisées ", description: "Service 24/7" },
  { title: "Assistance virtuelle intelligente", description: "Comprendre et interpréter les demandes des clients" },
  { title: "Collecte et analyse des données ", description: "Optimiser les processus" },
  { title: "Un listing prédéfini, ", description: "Les réseaux sociaux ou tout autre canal digital" },
];

// Different Chart Data for Chart.js
const chartData = [
  {
    type: "bar",
    data: {
      labels: ["Info commerciale", "Reclamations", "Prise de commande", "Prise rendez-vous", "Service apres vente"],
      datasets: [
        {
          label: "Modules les plus utilisée",
          data: [15, 44, 18, 38, 5],
          backgroundColor: "rgba(54, 162, 235, 0.5)",
        },
      ],
    },
  },
  {
    type: "line",
    data: {
      labels: ["January", "February", "March", "April", "May"],
      datasets: [
        {
          label: "Utilisateurs",
          data: [40, 50, 60, 70, 90],
          fill: false,
          borderColor: "rgba(255, 99, 132, 1)",
        },
      ],
    },
  },
  {
    type: "pie",
    data: {
      labels: ["Push", "Pull", "Sondage"],
      datasets: [
        {
          label: "Revenue",
          data: [98, 15, 0],
          backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(153, 102, 255, 0.6)", "rgba(255, 205, 86, 0.6)"],
        },
      ],
    },
  },
];

// Carousel Component for Cards Only (Horizontal Scroll)
const CardCarousel = () => {
  return (
    <div className="relative w-full max-w-full mx-auto p-4">
      <div className="flex overflow-x-auto space-x-4 p-4">
        {dataItems.map((item, index) => (
          <div
            key={index}
            className="flex-1 bg-white shadow-lg p-6 rounded-lg flex-shrink-0 hover:shadow-xl transition-shadow duration-300 w-full"
          >
            <h2 className="text-2xl font-bold mb-4">{item.title}</h2>
            <p className="text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Grid Layout for Charts (2 per row, with different chart types)
const ChartGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4">
      {chartData.map((chart, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-lg flex justify-center items-center min-h-96">
          {chart.type === "bar" && <Bar data={chart.data} options={chartOptions} />}
          {chart.type === "line" && <Line data={chart.data} options={chartOptions} />}
          {chart.type === "pie" && <Pie data={chart.data} options={chartOptions} />}
        </div>
      ))}
    </div>
  );
};

// Chart.js options
const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top", // Correct usage of 'position'
    },
    title: {
      display: true,
      text: "ShadCN Chart.js Visualizations",
    },
  },
};

// Home Component to render Carousel and Chart Grid
const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Render Horizontal Carousel for Cards */}
      <CardCarousel />

      {/* Render Chart Grid */}
      <ChartGrid />
    </div>
  );
};

export default Home;