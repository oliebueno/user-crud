const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
});

// Verificación de la conexión con la bd
pool.connect()
    .then(() => console.log('Conectado a la base de datos'))
    .catch(err => console.error('Error de conexión a la base de datos', err.stack));

module.exports = pool;