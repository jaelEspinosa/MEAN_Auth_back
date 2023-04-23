const { Router } = require('express')
const { register, login, renew } = require('../controllers/auth.controller')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')


const router=Router()


// Crear un nuevo usuario
router.post('/new',[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('name', 'El nombre es demasiado corto').isLength({min:4}),
    check('email', 'El email es requerido').not().isEmpty(),
    check('email', 'El email no tiene un formato válido').isEmail(),
    check('password', 'La contraseña es obligatoria').isLength({min: 6}),
    validarCampos

],register)

// login de usuario
router.post('/',[
    check('email', 'El email es requerido').not().isEmpty(),
    check('email', 'El email no tiene un formato válido').isEmail(),
    check('password', 'La contraseña es obligatoria').isLength({min: 6}),
    validarCampos
   ] ,login)

// Validar y revalidar token
router.get('/renew', validarJWT ,renew )










module.exports= router;