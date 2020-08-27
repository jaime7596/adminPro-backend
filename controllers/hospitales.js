const { response } = require('express')
const Hospital = require('../models/hospital');


const getHospitales = async (req, res= response) => {
    
    const hospitales = await Hospital.find()
                                    .populate('usuario', 'nombre')
    
    res.json({
        ok:true,
        hospitales
    });
}
const crearHospital = async (req, res= response) => {
    const uid = req.uid;
    console.log(uid);
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });
    console.log('Hospital',  hospital);
    try {
        const hospitalDB = await hospital.save();
        res.json({
            ok:true,
            hospital: hospitalDB
        });
        
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador',
            error
        });
    }
}
const actualizarMedico = (req, res= response) => {
    res.json({
        ok:true,
        msg: 'Actualizar Hospital',
    });
}
const borrarMedico = (req, res= response) => {
    res.json({
        ok:true,
        msg: 'Eliminar Hospital',
    });
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarMedico,
    borrarMedico
}