const { response } = require('express');
const path = require('path');
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-img');

const fileUpload = (req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    // Validar tipo
    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];
    if( !tiposValidos.includes(tipo)){
        return res.status(400).json({
            ok: false,
            msg: 'No es un medico, usuario u hospital'
        });
    }

    // Validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send({
            ok:false,
            msg: 'No hay ningun archivo'
        });
    }

    // Procesar la imagen
    const file = req.files.imagen;
    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[ nombreCortado.length -1 ];

    // Validar extensiones 
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if(!extensionesValidas.includes(extensionArchivo)){
        return res.status(400).send({
            ok:false,
            msg: 'No hay ningun archivo'
        });
    }

    // Generar el nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    // Path para guardar la imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;
    // Mover la imagen
    file.mv(path, function(err) {
        if (err){
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen',
            });
        }


        // Actualizar base de datos
        actualizarImagen(tipo, id, path, nombreArchivo);



        res.json({
            ok: true,
            nombreArchivo,
            msg: 'Archivo Subido'
        });

      });
}


const retornaImagen = (req, res) => {
    const tipo = req.params.tipo;
    const img = req.params.img;

    const pathImg = path.join(__dirname, `../uploads/${tipo}/${img}`);

    // imagen por defecto
    if(fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        const pathImg = path.join(__dirname, `../uploads/noImg.png`);
        res.sendFile(pathImg);
    }

}


module.exports = {
    fileUpload,
    retornaImagen
}