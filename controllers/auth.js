const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const {generarJWT} = require('../helpers/jwt');
const {googleVerify} = require('../helpers/google-verify');

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

const googleSingIn = async(req, res = response) => {

    const googleToken = req.body.token;

    try {
        const {name, email, picture} = await googleVerify(googleToken);
        const usuarioDB = await Usuario.findOne({email});

        let usuario;
        if(!usuarioDB){
            // Si no existe el usuario
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        }else {
            //  Existe usuario
            usuario = usuarioDB;
            usuario.google = true;
        }

        // Guardar en DB
        await usuario.save();

        // Generar Token
        const token = await generarJWT(usuario._id)

        res.json({
            ok:true,
            token
        });

    } catch (error) {

        res.status(401).json({
            ok: false,
            msg: 'Token Invalido',
        });
        
    }
}

const renewToken = async (req, res = response) => {

    const uid = req.uid;

    // Generar Token
    const token = await generarJWT(uid);

    res.json({
        ok:true,
        token
    });

}

module.exports = {
    login,
    googleSingIn,
    renewToken
}