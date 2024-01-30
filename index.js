const {connection} = require('./src/model/connect/dataBase.js');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const instituciones = require('./src/routes/institucion.routes.js');
const area = require('./src/routes/area.routes.js');
const subArea = require('./src/routes/subArea.routes.js');
const search = require('./src/routes/buscador.routes.js');
const espacio = require('./src/routes/espacio.routes.js');
const gestion = require('./src/routes/gestion.routes.js');
const modalidad = require('./src/routes/modalidad.routes.js');
const horarios = require('./src/routes/franjaHoraria.routes.js');
const duracion = require('./src/routes/duracion.routes.js');
const filter = require('./src/routes/searchWhitFilter.routes');
const details = require('./src/routes/details.routes.js');
const name = require('./src/routes/name.routes.js');
const address = require('./src/routes/address.routes.js');
const level = require('./src/routes/nivel.routes.js');

const app = express();
dotenv.config();

// Middleware CORS utilizando la biblioteca 'cors'
app.use(cors({
    origin: 'http://172.16.1.48:3000',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//routes
app.use('/api', instituciones);
app.use('/api', area);
app.use('/api', subArea);
app.use('/api', search);
app.use('/api', espacio);
app.use('/api', gestion);
app.use('/api', modalidad);
app.use('/api', horarios);
app.use('/api', duracion);
app.use('/api', filter);
app.use('/api', details);
app.use('/api', name);
app.use('/api',address);
app.use('/api',level);


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

start()
