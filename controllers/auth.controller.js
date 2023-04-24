
const { response } = require('express')
const Usuario = require('../models/Usuario')
const bcrypt = require('bcryptjs')
const { generarJWT, generateJWT } = require('../helpers/jwt')


const register = async (req, res = response)=>{
   
   const {email, name, password } = req.body   

   try {    
       // verificar que no existe el email
       const usuario = await Usuario.findOne({ email })
       if ( usuario ){
        return res.status(400).json({
            ok: false,
            msg: 'Este email ya esta en uso'
        })
       };    
       //generar usuario
       const dbUser = new Usuario( req.body )

       // Hashear la contraseña
       const salt = bcrypt.genSaltSync();
       dbUser.password = bcrypt.hashSync( password, salt );      
    
       // Generar JWT     
       const token = await generarJWT(dbUser._id, name)

    
       // Grabar usuario en DB
       await dbUser.save()
       
    
       // Generar respuesa exitosa
       return res.status(201).json({
        ok: true,
        uid: dbUser._id,
        name, 
        email: dbUser.email,
        token
       })


   } catch (error) {
      console.log(error)
      return res.status(500).json({
        ok: false,
        msg: 'Por favor hable con el administrador'
      })    
   }
}

const login = async (req, res = response)=>{
    const {email, password} = req.body 
    
    try {
      // comprobar si existe el user     
      const dbUser = await Usuario.findOne({ email });

      if(!dbUser) {
        return res.status(400)
                 .json({
                    ok:false,
                    msg: 'Email no registrado en la base de datos'
                });
      };
      
      // comprobar contraseña
      const validPassword = bcrypt.compareSync(password, dbUser.password)
      if(!validPassword){
        return res.status(400)
                 .json({
                    ok:false,
                    msg: 'password inválido'
                });
      };

    //generar el jwt    
    const token = await generateJWT(dbUser._id, dbUser.name)
    
    //generar respuesta
    return res.json({
        ok:true,
        uid: dbUser._id,
        name: dbUser.name,
        email: dbUser.email,
        token,
      })
        
    } catch (error) {       
       console.log(error); 
       return res.status(500).json({
           ok: false,
           msg:'Hable con el administrador',   
       })
    }
}

const renew = async (req, res = response) =>{   
    const {_id, name, email } = req.user    
    const token = await generateJWT(_id, name)
    return res.json({
        ok: true,
        name,
        uid: _id,
        email,
        token  
    })
}

module.exports = {
    register,
    login,
    renew
}