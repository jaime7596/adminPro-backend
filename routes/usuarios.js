const { Router} = require('express');
const { check } = require ('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jw')
const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const validarJw = require('../middlewares/validar-jw');
const router = Router();


router.get('/', validarJWT, getUsuarios);
router.post('/',
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obigatorio').isEmail(),
        validarCampos
    ], 
    crearUsuario
);
router.put('/:id', 
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obigatorio').isEmail(),
        check('role', 'El role es obigatorio').not().isEmpty(),
        validarCampos
    ], actualizarUsuario
);
router.delete('/:id', validarJWT, borrarUsuario )

















module.exports = router;