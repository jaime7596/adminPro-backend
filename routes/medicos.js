const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jw');
const { getMedicos, crearMedico, actualizarMedico, borrarMedico} = require('../controllers/medicos')
const router = Router();

router.get('/', validarJWT, getMedicos);
router.post('/',
    [
        validarJWT,
        check('nombre', 'El nombre del medico es necesario').not().isEmpty(),
        check('hospital', 'El hospital is debe de ser valido').isMongoId(),
        validarCampos

    ], crearMedico
);
router.put('/:id', 
    [], actualizarMedico
);
router.delete('/:id', validarJWT, borrarMedico );



module.exports = router;