import React from 'react';

const AQIChart = () => {
  return (
    <div className="relative w-96 h-64 bg-white rounded-lg shadow-md">
      <div className="absolute top-4 left-4 text-lg font-semibold text-gray-800">
        AQI ระดับคุณภาพในอากาศ
      </div>
      <div className="absolute top-8 left-4 text-sm text-gray-600">
        Air Quality Index
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex">
        <div className="w-12 h-8 bg-green-500 rounded-l-lg flex items-center justify-center text-sm text-white">
          0
        </div>
        <div className="w-12 h-8 bg-yellow-500 flex items-center justify-center text-sm">
          50
        </div>
        <div className="w-12 h-8 bg-orange-500 flex items-center justify-center text-sm">
          100
        </div>
        <div className="w-12 h-8 bg-red-500 flex items-center justify-center text-sm text-white">
          150
        </div>
        <div className="w-12 h-8 bg-red-700 flex items-center justify-center text-sm text-white">
          200
        </div>
        <div className="w-12 h-8 bg-purple-800 rounded-r-lg flex items-center justify-center text-sm text-white">
          300
        </div>
        <div className="w-12 h-8 bg-gray-900 rounded-r-lg flex items-center justify-center text-sm text-white">
          500
        </div>
      </div>
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex">
        <div className="w-12 text-sm text-center">Good</div>
        <div className="w-12 text-sm text-center">Moderate</div>
        <div className="w-12 text-xs text-center leading-4">
          Unhealthy <br /> for <br /> Sensitive <br /> Groups
        </div>
        <div className="w-12 text-sm text-center">Unhealthy</div>
        <div className="w-12 text-sm text-center">Very Unhealthy</div>
        <div className="w-12 text-sm text-center">Hazardous</div>
      </div>
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 w-0.5 h-20 bg-gray-800 origin-bottom rotate-45"></div>
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-800 rounded-full"></div>
    </div>
  );
};

export default AQIChart;