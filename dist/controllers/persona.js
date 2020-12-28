"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editarPersona = exports.devolverPersona = exports.devolverPersonas = exports.loginPersona = exports.crearPersona = void 0;
const mongoose_1 = require("../config/mongoose");
var crearPersona = (req, res) => {
    let objPersona = new mongoose_1.Persona(req.body);
    objPersona.cifrarContraseña(req.body.password);
    objPersona.save((error, nuevaPersona) => {
        if (error) {
            res.status(500).json({
                ok: false,
                content: error,
                message: 'Hubo un error al registrar a la persona'
            });
        }
        else {
            res.status(201).json({
                ok: true,
                content: nuevaPersona,
                message: 'Persona registrada exitosamente'
            });
        }
    });
};
exports.crearPersona = crearPersona;
var loginPersona = (req, res) => {
    let { email, password } = req.body;
    mongoose_1.Persona.findOne({ per_emal: email }, (error, persona) => {
        if (persona) {
            let validacion = persona.validarContraseña(password);
            if (validacion) {
                let token = persona.generarJWT();
                let nombre = persona.per_nomb + ' ' + persona.per_apel;
                let id = persona._id;
                res.json({
                    ok: true,
                    content: {
                        nombre,
                        id,
                        token
                    },
                    message: 'Bienvenido'
                });
            }
            else {
                res.json({
                    ok: false,
                    content: null,
                    message: 'Contraseña incorrecta'
                });
            }
        }
        else {
            res.status(200).json({
                ok: false,
                content: null,
                message: 'Usuario inexistente o usuario de empresa'
            });
        }
    });
};
exports.loginPersona = loginPersona;
var devolverPersonas = (req, res) => {
    mongoose_1.Persona.find((error, personas) => {
        if (error) {
            res.status(500).json({
                ok: false,
                content: error,
                message: 'Hubo un error al traer los usuarios'
            });
        }
        else {
            res.json({
                ok: true,
                content: personas,
                message: null
            });
        }
    });
};
exports.devolverPersonas = devolverPersonas;
var devolverPersona = (req, res) => {
    let { id } = req.params;
    mongoose_1.Persona.findById(id, (error, persona) => {
        if (error) {
            res.json({
                ok: false,
                content: null,
                message: 'No se encontro la persona'
            });
        }
        else {
            res.json({
                ok: true,
                content: persona,
                message: 'Se encontro la persona'
            });
        }
    });
};
exports.devolverPersona = devolverPersona;
var editarPersona = (req, res) => {
    let { id } = req.params;
    mongoose_1.Persona.findByIdAndUpdate(id, req.body, { new: true }, (error, usuarioActualizado) => {
        if (error) {
            res.status(400).json({
                ok: false,
                content: error,
                message: 'Hubo un error al actualizar el usuario'
            });
        }
        else {
            res.status(200).json({
                ok: true,
                content: usuarioActualizado,
                message: 'Se actualizo exitosamente el usuario'
            });
        }
    });
};
exports.editarPersona = editarPersona;
