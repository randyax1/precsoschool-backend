const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');
require('dotenv').config();

//Creacion del servidor de express
const app = express();

//Base de datos
dbConnection();

//CORS
app.use(cors());

//Lectura y parseo del body
app.use( express.json() );

//Rutas
app.use('/api/auth/teacher', require('./routes/teacher/auth.teacher') );

app.use('/api/auth/student', require('./routes/student/auth.student') );

//Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});