const express = require('express');
const app = express();
const port = 3000;

// ERROR DE SINTAXIS PROVOCADO: Se eliminó el cierre }); de la ruta
app.get('/', (req, res) => {
  res.send(`
    <html>
      <body style="background: #7f1d1d; color: white; text-align: center;">
        <h1>ERROR DE SINTAXIS</h1>
        <p>Este mensaje no debería verse si el Pipeline funciona.</p>
      </body>
    </html>
  `);

app.listen(port, () => {
  console.log(`Servicio corriendo en puerto ${port}`);
});