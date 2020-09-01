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
const actualizarHospital = async (req, res= response) => {
    const hospitalId = req.params.id;
    const uid = req.uid;
    try {
        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }
        const hospital = await Hospital.findOneAndUpdate({_id: hospitalId}, cambiosHospital, {new: true});

        res.json({
            ok:true,
            hospital
        });
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador',
            error
        });
    }
}
const borrarHospital = async (req, res= response) => {
    const hospitalId = req.params.id;
    try {
        const hospitalDB = await Hospital.findOneAndDelete({_id: hospitalId});
        res.json({
            ok:true,
            hospitalEliminado: hospitalDB
        });
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador',
            error
        });
    }
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}