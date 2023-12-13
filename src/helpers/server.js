const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/recoverRadio/:stationName', async (req, res) => {
    const { stationName } = req.params;
  
    try {
      const response = await axios.get(`https://at1.api.radio-browser.info/json/stations/byname/${stationName}`);
      const data = response.data;
  
      // Limita la cantidad de datos (opcional)
      const first200Data = data.slice(0, 200);
  
      res.json(first200Data);
    } catch (error) {
      console.error('Error al realizar la solicitud a la API externa:', error.message);
      res.status(500).json({ error: 'Error al obtener datos de la API externa' });
    }
  });
  
  app.listen(PORT, () => {
    console.log(`Servidor proxy escuchando en el puerto ${PORT}`);
  });