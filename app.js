const express = require('express');
const app = express();

// Middleware
app.use(express.json());


app.get('/api/v1/welcome', (req, res) => {
  res.status(200).json({ message: 'Welcome to this Api ya 4' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app;