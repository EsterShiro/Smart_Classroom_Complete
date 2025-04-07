const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

const cors = require('cors');

app.use(cors());

mongoose.connect('mongodb://localhost:27017/CPE495', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const bme280Schema = new mongoose.Schema({
    timestamp: { type: Date, required: true }, // ต้องเป็น Date
    temperature: { type: Number, required: true }, // ต้องเป็น Number
    humidity: { type: Number, required: true }, // ต้องเป็น Number
  });

const BME280 = mongoose.model('BME280', bme280Schema);

app.get('/api/bme280', async (req, res) => {
  try {
    const data = await BME280.find().sort({ timestamp: 1 });
    res.json(data); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const sds011Schema = new mongoose.Schema({
  timestamp: { type: Date, required: true },
  pm25: { type: Number, required: true },
  pm10: { type: Number, required: true },
});

const SDS011 = mongoose.model('SDS011', sds011Schema);

app.get('/api/sds011', async (req, res) => {
  try {
    const data = await SDS011.find().sort({ timestamp: 1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const mq7Schema = new mongoose.Schema({
  timestamp: { type: Date, required: true },
  co: { type: Number, required: true },
});

const MQ7 = mongoose.model('MQ7', mq7Schema);

app.get('/api/mq7', async (req, res) => {
  try {
    const data = await MQ7.find().sort({ timestamp: 1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const mq135Schema = new mongoose.Schema({
  timestamp: { type: Date, required: true },
  so2: { type: Number, required: true },
});

const MQ135 = mongoose.model('MQ135', mq135Schema);

app.get('/api/mq135', async (req, res) => {
  try {
    const data = await MQ135.find().sort({ timestamp: 1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const mq131Schema = new mongoose.Schema({
  timestamp: { type: Date, required: true },
  o3: { type: Number, required: true },
});

const MQ131 = mongoose.model('MQ131', mq131Schema);

app.get('/api/mq131', async (req, res) => {
  try {
    const data = await MQ131.find().sort({ timestamp: 1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const AQISchema = new mongoose.Schema({
  aqiValue: Number,
  timestamp: { type: Date, required: true }, // เพิ่มฟิลด์ timestamp
});

const AQI = mongoose.model('AQI', AQISchema);

// สร้าง API Endpoint
app.get('/api/aqi', async (req, res) => {
  try {
    const aqiData = await AQI.find().sort({ timestamp: 1 }); // เรียงตามเวลาล่าสุด (timestamp)
    res.json(aqiData); // ส่งคืนข้อมูลทั้งหมดในรูปแบบอาร์เรย์
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch AQI data' });
  }
});




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});