const { connection } = require('./src/model/connect/dataBase.js');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const instituciones = require('./src/routes/institucion.routes.js');
const area = require('./src/routes/area.routes.js');
const subArea = require('./src/routes/subArea.routes.js');


const app = express();
dotenv.config();

// Middlewares
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//routes
app.use('/api', instituciones);
app.use('/api', area);
app.use('/api',subArea);

//connection;
const start = async () => {
    try {
        await connection();
        app.listen(process.env.PORT, () => {
            console.log(`Escuchando en el puerto ${process.env.PORT}`);
        });
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
    }
};

start();
