import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const lineData = {
  labels: ['15:41:30', '15:42:00', '15:42:30', '15:43:00', '15:43:30', '15:44:00', '15:44:30', '15:45:00'],
  datasets: [
    {
      label: 'SO2 Levels',
      data: [1890, 1895, 1900, 1895, 1890, 1895, 1900, 1895],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      fill: true,
    },
  ],
};

const barData = {
  labels: ['15:41:30', '15:42:00', '15:42:30', '15:43:00', '15:43:30', '15:44:00', '15:44:30', '15:45:00'],
  datasets: [
    {
      label: 'Air Quality',
      data: [1890, 1895, 1900, 1895, 1890, 1895, 1900, 1895],
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'SO2 Levels',
    },
  },
};

function MQ135Sensor() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">เซ็นเซอร์ MQ135</h2>
      <div className="h-48">
        <Line data={lineData} options={options} />
      </div>
      <div className="h-48 mt-4">
        <Bar data={barData} options={options} />
      </div>
    </div>
  );
}

export default MQ135Sensor;