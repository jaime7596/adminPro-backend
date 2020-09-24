const { response } = require('express');
const { validationResult } = require ('express-validator');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const {generarJWT} = require('../helpers/jwt')

const getUsuarios = async (req, res) => {
    const desde = Number(req.query.desde) || 0;

    const [usuarios, total] = await Promise.all([
        Usuario
            .find({}, 'nombre email role google img')
            .skip(desde)
            .limit(5),

        Usuario.countDocuments()
    ]);



    res.json({
        ok:true,
        usuarios,
        uid: req.uid,
        total: total
    })
}

const crearUsuario = async (req, res = response) => {
    console.log(req.body);
    const {email, password} = req.body;

    try {
        const existeEmail =  await Usuario.findOne({email});
        if( existeEmail ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            })
        }

        const usuario = new Usuario(req.body);
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        // Guardar Usuario
        await usuario.save();
        const token = await generarJWT(usuario._id)
        res.json({
            ok:true,
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado'
        });
    }
}

const actualizarUsuario = async (req, res = response) => {
    console.log(req.body);
    try {
        const uid = req.params.id;
        const usuarioDB = await Usuario.findById(uid);
        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg: 'No existe usuario por ese id'
            })
        }
        // toDo: Validar Token y comprobar  si es usuario es correcto 
        // Actualizar
        const {password, google, email, ...campos} = req.body;
        if(usuarioDB.email !== email){
            const existeEmail = await Usuario.findOne({email});
            if(existeEmail){
                return res.status(400).json({
                    ok:false,
                    msg: 'Ya existe un usuario con ese email'
                })
            }
        }
        if(!usuarioDB.google) {
            campos.email;
        }else if(usuarioDB.email !== email) {
            return res.status(400).json({
                ok:false,
                msg: 'Usuario de google no puede cambiar correo'
            });
        }



        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true});
        res.json({
            ok: true,
            usuario: usuarioActualizado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado'
        });
    }
}  

const borrarUsuario = async (req, res) => {
    try {
        const uid = req.params.id;
        console.log(uid);
        
        const usuarioDB = await Usuario.findById(uid);
        if(!usuarioDB){
            return res.status(404).json({
                ok: true,
                msg: 'Usuario a borrar no encontrado'
            });
        }

        await Usuario.findByIdAndDelete(uid);
        res.json({
            ok: true,
            usuario: 'Usuario eliminado correctamente'
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: error
        });
    }
}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}