const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); // Importa el paquete cors
const app = express();
const port = 3000;

// Configura CORS para permitir solicitudes desde cualquier origen
app.use(cors());

// Resto del código del servidor...

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '12345678',
  database: 'copesj',
});

// Ruta para obtener los datos
app.get('/api/data', (req, res) => {
  const selectQuery = `SELECT * FROM \`import-test\` WHERE id = 1;`;

  connection.query(selectQuery, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al consultar la base de datos' });
    } else {
      console.log(results);
      res.json(results);
    }
  });
});

// Iniciar la conexión a la base de datos y el servidor Express
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos MySQL');
    app.listen(port, () => {
      console.log(`Servidor API REST en funcionamiento en el puerto ${port}`);
    });
  }
});
