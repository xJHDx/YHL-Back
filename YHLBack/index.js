require('dotenv').config();

const express = require ('express');
const cors = require('cors')

const { dbconexion } = require('./database/config')

// Servidor de expres
const app = express();

// Conexion DB
dbconexion();

// Configuracion de CORS 
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// Rutas
app.use('/api/user', require('./routes/user.routes'));
app.use('/api/login', require('./routes/auth.routes'));

app.listen( process.env.PORT , () => {
    console.log("Run server port " + process.env.PORT )
});