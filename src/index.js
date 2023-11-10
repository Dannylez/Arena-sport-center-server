const express = require('express');
const app = express();

// Ruta para la página de inicio (index)
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la página de inicio!');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`El servidor está escuchando en el puerto ${PORT}`);
});
