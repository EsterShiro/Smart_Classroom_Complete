import React from 'react';

const AirQualityDisplay = ({ aqiValue }) => {
  let qualityLevel;
  let emoji;
  let description;
  let bgColorClass = 'bg-green-200'; // Default ดี

  if (aqiValue <= 50) {
    qualityLevel = 'ดี';
    emoji = '😊';
    description = 'คุณภาพอากาศดีมาก';
    bgColorClass = 'bg-green-200';
  } else if (aqiValue <= 100) {
    qualityLevel = 'ปานกลาง';
    emoji = '😐';
    description = 'คุณภาพอากาศปานกลาง';
    bgColorClass = 'bg-yellow-200';
  } else {
    qualityLevel = 'แย่';
    emoji = '😟';
    description = 'คุณภาพอากาศไม่ดีต่อสุขภาพ';
    bgColorClass = 'bg-red-200';
  }

  return (
    <div className={`rounded-md shadow-md p-4 ${bgColorClass}`}>
      <h2 className="text-xl font-bold mb-2">คุณภาพอากาศ</h2>
      <div className="flex items-center space-x-4">
        <span className="text-3xl">{emoji}</span>
        <div>
          <p className="font-semibold">{qualityLevel}</p>
          <p className="text-gray-600">{description}</p>
          <p className="text-sm text-gray-500">ค่า AQI: {aqiValue}</p>
        </div>
      </div>
    </div>
  );
};

export default AirQualityDisplay;