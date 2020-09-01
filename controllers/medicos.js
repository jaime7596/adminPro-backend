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
const actualizarMedico = async (req, res= response) => {
    const medicoId = req.params.id;
    const uid = req.uid;
    try {
        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }
        const medico = await Hospital.findOneAndUpdate({_id: medicoId}, cambiosMedico, {new: true});

        res.json({
            ok:true,
            medico
        });
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador',
            error
        });
    }
}
const borrarMedico = (req, res= response) => {

    const medicoId = req.params.id;
    try {
        const medicoDB = await Hospital.findOneAndDelete({_id: medicoId});
        res.json({
            ok:true,
            medicoEliminado: medicoDB
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
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}