const mysql = require('mysql2');
const path = require('path');
// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '12345678',
  database: 'copesj'
});

/* const directorioActual = "C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/EvoHtmlToPdf1.pdf";
const selectQuery = `SELECT * FROM \`import-test\` WHERE id = 1;`;
const downloadQuery = `SELECT pdf INTO DUMPFILE './archivo.pdf'
FROM \`import-test\` WHERE id = 1;` */

const queryArray = []
for (let i = 0; i < 3; i++) {
  queryArray[i] = `UPDATE \`import-test\` SET pdf = LOAD_FILE("C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/EvoHtmlToPdf${i + 1}.pdf")
  WHERE id = ${i + 1};`
}

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos MySQL');
    queryArray.forEach((updateQuery) => {
      connection.query(updateQuery, (err, results) => {
        if (err) {
          console.error(err);
        } else {
          console.log(results);
        }
      });
    })
  }
  connection.end();
});