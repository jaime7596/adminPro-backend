const { Router } = require('express');
const expressFileUpload = require('express-fileupload');
const { validarJWT } = require('../middlewares/validar-jw');
const { fileUpload, retornaImagen } = require('../controllers/uploads');

const router = Router();
router.use(expressFileUpload());

router.put('/:tipo/:id', fileUpload);
router.get('/:tipo/:img', retornaImagen);








module.exports = router;
