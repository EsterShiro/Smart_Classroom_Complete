import React, { useState, useEffect } from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function BME280Sensor() {
  const [sensorData, setSensorData] = useState({
    labels: [],
    temperature: [],
    humidity: [],
    latestTemperature: 0,
    latestHumidity: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/bme280");
        const data = await response.json();
        console.log("Data from API:", data); // Debugging

        if (data && data.length > 0) {
          const updatedData = {
            labels: data
            .slice()
            .reverse()
            .map((item) =>
            new Date(item.timestamp).toLocaleTimeString("th-TH", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
    })
  ),
            temperature: data.map((item) => item.temp ?? 0), // ป้องกัน undefined
            humidity: data.map((item) => item.humid ?? 0), // ป้องกัน undefined
            latestTemperature: data[data.length - 1]?.temp ?? 0,
            latestHumidity: data[data.length - 1]?.humid ?? 0,
          };

          setSensorData(updatedData);
          console.log("Updated sensorData:", updatedData); // Debugging
        } else {
          console.error("No data received from API");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const lineData = {
    labels: sensorData.labels,
    datasets: [
      {
        label: "Temperature",
        data: sensorData.temperature,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Humidity",
        data: sensorData.humidity,
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Temperature and Humidity" },
    },
  };

  const doughnutData = (value, label, color) => ({
    datasets: [
      {
        data: [value, 100 - value],
        backgroundColor: [color, "rgba(0, 0, 0, 0.1)"],
        borderWidth: 0,
      },
    ],
    labels: [label],
  });

  const doughnutOptions = {
    cutout: "80%",
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">เซ็นเซอร์ BME280</h2>
      <div className="h-48">
        <Line data={lineData} options={lineOptions} />
      </div>
      <div className="flex justify-around mt-4">
        <div className="relative h-36 w-36">
          <Doughnut
            data={doughnutData(
              sensorData.latestTemperature,
              "Temperature",
              "rgb(255, 99, 132)"
            )}
            options={doughnutOptions}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-lg font-bold">{sensorData.latestTemperature}°C</p>
          </div>
        </div>
        <div className="relative h-36 w-36">
          <Doughnut
            data={doughnutData(
              sensorData.latestHumidity,
              "Humidity",
              "rgb(54, 162, 235)"
            )}
            options={doughnutOptions}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-lg font-bold">{sensorData.latestHumidity}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BME280Sensor;
