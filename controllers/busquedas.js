const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');




const BusquedaGeneral = async (req, res) => {

    try {
        const busqueda = req.params.busqueda;
        const regex = new RegExp(busqueda, 'i');

        const [usuarios, medicos, hospitales] = Promise.all([
            Usuario.find({nombre: regex}),
            Medico.find({nombre: regex}),
            Hospital.find({nombre: regex}),
        ])
        
        res.json({
            ok:true,
            usuarios: usuarios,
            medicos,
            hospitales
        });
    } catch (error) {
        
    }
}

const BusquedaColeccion = async (req, res) => {

    try {
        const busqueda = req.params.busqueda;
        const tabla = req.params.tabla;
        const regex = new RegExp(busqueda, 'i');
        let data = []

        switch (tabla) {


            case 'medicos':
                data = await Medico.find({ nombre: regex})
                                    .populate('usuario', 'nombre img')
                                    .populate('hospital', 'nombre img')
                break;

            case 'hospitales':
                data = await Hospital.find({ nombre: regex})
                                        .populate('usuario', 'nombre img')
                break;

            case 'usuarios':
                data = await Usuario.find({ nombre: regex});
                break;
        
            default:
                return res.status(404).json({
                    ok:false,
                    msg: 'La table tiene que ser usuarios/medicos/hospitales'
                })
        }

        res.json({
            ok:true,
            resultados: data
        });
    } catch (error) {
        
    }
}

module.exports = {
    BusquedaGeneral,
    BusquedaColeccion
}