
const Mongoose = require('mongoose')


const dbConnection = async() => {

    try {
       await Mongoose.connect( process.env.DB_CNN,{
           useNewUrlParser: true,
           useUnifiedTopology: true
         
       });
       console.log('DB Online');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error de Base de Datos')
    }

}

module.exports = {
    dbConnection
}