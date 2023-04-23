const jwt = require('jsonwebtoken')


//!! manera complicada

const generateJWT = ( uid, name )=>{

   const payload = {uid, name};


   return new Promise((resolve, reject) =>{

       jwt.sign(payload, process.env.SECRET_JWT_SEED,{
           expiresIn:'2h',        
       },(err, token) =>{
                if( err ){
                   //todo mal
                   reject( err )
                } else {
                   // todo ok
                   resolve( token )
                }
       })
   })
}

//!! manera sencilla

const generarJWT = ( uid, name) => {
    return jwt.sign({ uid, name}, process.env.SECRET_JWT_SEED, {
      expiresIn: '3h'
     })
  }

  module.exports = {
         generateJWT,
         generarJWT
}
    
  
