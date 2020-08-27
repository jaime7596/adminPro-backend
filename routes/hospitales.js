const { Router} = require('express');
const { check } = require ('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jw');
const { getHospitales, crearHospital, actualizarMedico, borrarMedico } = require('../controllers/hospitales');
const router = Router();


router.get('/', validarJWT, getHospitales);

router.post('/',
    [
        validarJWT,
        check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
        validarCampos

    ], crearHospital
);

router.put('/:id', 
    [], actualizarMedico
);

router.delete('/:id', validarJWT, borrarMedico )

















module.exports = router;