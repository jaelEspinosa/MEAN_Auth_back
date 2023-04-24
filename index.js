
const express = require('express')
const cors = require('cors');
const { dbConnection } = require('./db/config');

require('dotenv').config();

// Crear el servidor/aplicacion de express
const app = express()

// conexion db

dbConnection();

//Directorio público
app.use(express.static('public'))

 

// Cors
app.use( cors() );

//lectura y parseo del body
app.use( express.json() )

//rutas
app.use('/api/auth', require('./routes/auth.route'))

// Manejar demás rutas
/* app.get('*', (req, res)=>{
    res.sendFile(patch.resolve(__dirname, 'public/index.html'))
} ) */



const PORT = process.env.PORT || 4000


app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en puerto ${PORT}`);
})


