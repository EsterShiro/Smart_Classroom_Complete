import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function SDS011Sensor() {
  const [sensorData, setSensorData] = useState({
    labels: [],
    PM25: [],
    PM10: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/sds011");
        const data = await response.json();
        console.log("Data from API:", data); // Debugging

        if (data && data.length > 0) {
          const updatedData = {
            labels: data
              .slice()
              .map((item) =>
                new Date(item.timestamp).toLocaleTimeString("th-TH", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })
              ),

            PM25: data
              .slice()
              .map((item) => item.pm25 ?? 0), // Reverse PM2.5 data to match labels
            PM10: data
              .slice()
              .map((item) => item.pm10 ?? 0), // Reverse PM10 data to match labels
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
        label: "PM2.5",
        data: sensorData.PM25,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "PM10",
        data: sensorData.PM10,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
  };

  return (
    <div
      className="font-kanit bg-white rounded-lg shadow-md"
      style={{
        paddingTop: "10px",
        paddingLeft: "20px",
        paddingRight: "10px",
        marginBottom: "180px",
      }}
    >
      <h2 className="text-xl text-green-20">SDS011 Sensor</h2>
      <h2 className="text-xl font-bold text-black">
      ตรวจค่าฝุ่น PM2.5  และ PM10
      </h2>
      <div
        className=""
        style={{ width: "500px", height: "180px", paddingLeft: "70px" }}
      >
        <Line data={lineData} options={lineOptions} />
      </div>
    </div>
  );
}

export default SDS011Sensor;
