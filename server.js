const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

const cors = require('cors');

app.use(cors());

mongoose.connect('mongodb://localhost:27017/BME280', {
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
    const data = await BME280.find().sort({ timestamp: 1 }).limit(8); // ดึงข้อมูล 10 รายการล่าสุด
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});