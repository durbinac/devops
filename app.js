const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => 
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>DevOps Solutions - Diego Urbina</title>
        <style>
            body { font-family: 'Segoe UI', sans-serif; background: #0f172a; color: white; margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; }
            .card { background: #1e293b; padding: 40px; border-radius: 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); text-align: center; border-top: 5px solid #38bdf8; }
            h1 { color: #38bdf8; margin-bottom: 10px; }
            .status { background: #22c55e; color: white; padding: 5px 15px; border-radius: 50px; font-size: 0.9em; display: inline-block; margin-bottom: 20px; }
            .feature { margin-top: 20px; font-size: 1.1em; color: #94a3b8; }
            .highlight { color: #f472b6; font-weight: bold; }
        </style>
    </head>
    <body>
        <div class="card">
            <div class="status">● Sistema Online</div>
            <h1>DevOps Automation Pro</h1>
            <p class="feature">Pipeline CI/CD ejecutado por <span class="highlight">Jenkins</span></p>
            <p class="feature">Contenedor desplegado en <span class="highlight">Docker</span></p>
            <hr style="border: 0; border-top: 1px solid #334155; margin: 20px 0;">
            <p>Estado del Despliegue: <b>Exitoso</b></p>
            <p style="font-size: 0.8em; color: #475569;">Versión de la App: 2.1.0</p>
        </div>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Servicio corriendo en puerto ${port}`);
});