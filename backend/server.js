const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const pool = require('./database');

// Inicializar express
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});