const { Router } = require('express');
const { BusquedaGeneral, BusquedaColeccion } = require('../controllers/busquedas');
const {} = require('../middlewares/validar-jw');

const router = Router();

router.get('/:busqueda', BusquedaGeneral);
router.get('/coleccion/:tabla/:busqueda', BusquedaColeccion);

module.exports = router