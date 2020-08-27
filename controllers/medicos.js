const { response } = require('express');
const Medico = require('../models/medico');
const hospital = require('../models/hospital');


const getMedicos = async(req, res= response) => {
    const medicos = await Medico.find()
                                .populate('usuario', 'nombre')
                                .populate('hospital', 'nombre')
    res.json({
        ok:true,
       medicos,
    });
}
const crearMedico = async (req, res= response) => {
    const uid = req.uid;
    console.log(req.uid);


    const medico = new Medico({
        usuario: uid,
        ...req.body
    });

    try {
        const medicoDB = await medico.save();
        return res.status(201).json({
            ok:true,
            medico: medicoDB
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador del Sistema' + error
        });
    }

}
const actualizarMedico = (req, res= response) => {
    res.json({
        ok:true,
        msg: 'Actualizar Medico',
    });
}
const borrarMedico = (req, res= response) => {
    res.json({
        ok:true,
        msg: 'Eliminar Medico',
    });
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}