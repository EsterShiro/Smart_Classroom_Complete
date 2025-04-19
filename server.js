const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 5001;

const cors = require("cors");

app.use(cors());

// เชื่อมต่อ MongoDB Atlas
mongoose.connect(
  "mongodb+srv://bank:bank@aqi-senors-rf.xk5y8sk.mongodb.net/CPE495final",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// กำหนด Schema
const Model_ResultSchema = new mongoose.Schema({
  timestamp: { type: Date, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  sensor_data: {
    temperature: { type: Number, required: true },
    humidity: { type: Number, required: true },
    co: { type: Number, required: true },
    so2: { type: Number, required: true },
    ozone: { type: Number, required: true },
    pm2_5: { type: Number, required: true },
    pm10: { type: Number, required: true },
  },
  prediction:{
    aqi_class: {type: Number, required: true},
  },
});

// สร้าง Model
const ModelResult = mongoose.model("ModelResult", Model_ResultSchema);

// API Endpoint
app.get("/api/ModelResult", async (req, res) => {
  try {
    // ดึงข้อมูลจาก MongoDB และกรองเฉพาะฟิลด์ที่ต้องการ
    const data = await ModelResult.find()
      .sort({ timestamp: 1 }) // เรียงตาม timestamp
      .select(
        "timestamp sensor_data.temperature sensor_data.humidity sensor_data.co sensor_data.so2 sensor_data.ozone sensor_data.pm2_5 sensor_data.pm10 prediction.aqi_class"
      ); // เลือกเฉพาะฟิลด์ที่ต้องการ

    // แปลงข้อมูลให้อยู่ในรูปแบบที่ต้องการ
    const formattedData = data.map((item) => ({
      timestamp: item.timestamp,
      temperature: item.sensor_data.temperature,
      humidity: item.sensor_data.humidity,
      co: item.sensor_data.co,
      so2: item.sensor_data.so2,
      ozone: item.sensor_data.ozone,
      pm2_5: item.sensor_data.pm2_5,
      pm10: item.sensor_data.pm10,
      aqi_class: item.prediction.aqi_class,
    }));

    res.json(formattedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// เริ่มต้นเซิร์ฟเวอร์
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
