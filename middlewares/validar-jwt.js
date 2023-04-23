const { response } = require("express");
const jwt = require('jsonwebtoken');
const Usuario = require("../models/Usuario");


const validarJWT = async (req, res = response, next)=>{
    
    const token = req.header('x-token');

    if(!token) {
        return res.status(401).json({
            ok:false,
            msg:'token no válido    '
        })
    }
    
    try {
       const {uid, name} = jwt.verify(token, process.env.SECRET_JWT_SEED)

       req.user = await Usuario.findById({_id:uid })       
               
    } catch (error) {
        console.log(error)
       return res.status(401).json({
            ok: false,
            msg: 'Token  inválido'
        })
    }
    
    next();

}




module.exports = {
    validarJWT
}