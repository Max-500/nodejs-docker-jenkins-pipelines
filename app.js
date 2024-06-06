const express = require('express');
const app = express();

// Middleware
app.use(express.json());

app.post('/api/v1/login', (req, res) => {
  const {username, password} = req.body;
  if (username === 'user' && password === 'pass') {
    res.status(200).json({ message: 'user logged' });
  } else {
    res.status(401).json({ error: 'invalid credentials' });
  }
});

app.get('/api/v1/users/:user', (req, res) => {
  if (req.params.user === 'user') {
    res.status(200).json({ message: 'user obtained' });
  } else {
    res.status(401).json({ error: 'user not found' });
  }
});

app.get('/api/v1/welcome', (req, res) => {
  res.status(200).json({ message: 'Welcome to this Api ya 4' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app;