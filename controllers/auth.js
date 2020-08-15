const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const {generarJWT} = require('../helpers/jwt')

const login = async(req, res = response) => {
    const { email, password } = req.body;
    try {

        const usuarioDB = await Usuario.findOne({email});
        // Verificar Email
        if(!usuarioDB)  {
            res.status(404).json({
                ok:false,
                msg: 'Email no valido'
            });
        }
        // Verificar Contraseña
        const validadPassword = bcrypt.compareSync(password, usuarioDB.password);
        if(!validadPassword)  {
            res.status(404).json({
                ok:false,
                msg: 'Password no valido'
            });
        }

        // Generar Token

        const token = await generarJWT(usuarioDB._id)

        res.json({
            ok:true,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: error
        });
    }
} 



module.exports = {
    login
}