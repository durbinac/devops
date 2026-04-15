const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('<h1>¡Hola DevOps! Despliegue Exitoso</h1>');
});

app.listen(PORT, () => {
    console.log(`App corriendo en http://localhost:${PORT}`);
});