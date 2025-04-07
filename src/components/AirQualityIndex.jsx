import React, { useState, useEffect } from "react";

const AQIChart = () => {
  const [aqi, setAqi] = useState(null); // เก็บค่า AQI
  const [aqiLevel, setAqiLevel] = useState({ color: "", text: "" }); // เก็บระดับ AQI

  useEffect(() => {
    // Fetch AQI data จาก API
    const fetchAQI = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/aqi"); // เปลี่ยนเป็น API endpoint ของคุณ
        const data = await response.json();
        const latestAQI = data[data.length - 1]?.aqiValue || 0; // ดึงค่า AQI ล่าสุด
        setAqi(latestAQI);
        updateAqiLevel(latestAQI); // อัปเดตระดับ AQI
      } catch (error) {
        console.error("Error fetching AQI data:", error);
      }
    };

    fetchAQI();
  }, []);

  // ฟังก์ชันสำหรับอัปเดตระดับ AQI
  const updateAqiLevel = (value) => {
    if (value <= 50) {
      setAqiLevel({ color: "bg-green-200", text: "Good" });
    } else if (value <= 100) {
      setAqiLevel({ color: "bg-yellow-200", text: "Moderate" });
    } else if (value <= 150) {
      setAqiLevel({
        color: "bg-orange-200",
        text: "Unhealthy for Sensitive Groups",
      });
    } else if (value <= 200) {
      setAqiLevel({ color: "bg-red-200", text: "Unhealthy" });
    } else if (value <= 300) {
      setAqiLevel({ color: "bg-purple-200", text: "Very Unhealthy" });
    } else {
      setAqiLevel({ color: "bg-gray-200", text: "Hazardous" });
    }
  };

  return (
    <div
      className="font-kanit bg-white rounded-lg shadow-md"
      style={{
        paddingTop: "10px",
        paddingLeft: "20px",
        paddingRight: "10px",
        paddingBottom: "20px",
        marginBottom: "230px",
      }}
    >
      <h2 className="text-xl text-green-20">AQI ระดับคุณภาพในอากาศ</h2>
      <h2 className="text-xl text-black">Air Quality Index</h2>
      <div
        className={`my-4 border font-bold border-gray-300 rounded-lg p-4 ${aqiLevel.color}`}
      >
        <p className="text-3xl font-bold">
          {aqi !== null ? aqi : "Loading..."}
        </p>
        <p className="text-gray-600">{aqiLevel.text}</p>
      </div>
      <div className="mt-4">
        <button className="bg-green-200 text-gray-800 font-bold py-2 px-4 rounded">
          Good
        </button>
        <button className="bg-yellow-200 text-gray-800 font-bold py-2 px-4 rounded">
          Moderate
        </button>
        <button className="bg-orange-200 text-gray-800 font-bold py-2 px-4 rounded">
          Unhealthy for Sensitive Groups
        </button>
        <br />
        <button className="bg-red-200 text-gray-800 font-bold py-2 px-4 rounded mt-2">
          Unhealthy
        </button>
        <button className="bg-purple-200 text-gray-800 font-bold py-2 px-4 rounded">
          Very Unhealthy
        </button>
        <button className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded">
          Hazardous
        </button>
      </div>
    </div>
  );
};

export default AQIChart;
