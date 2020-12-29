"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.devolverEmpresas = exports.loginEmpresa = exports.crearEmpresa = void 0;
const mongoose_1 = require("../config/mongoose");
var crearEmpresa = (req, res) => {
    let objEmpresa = new mongoose_1.Empresa(req.body);
    objEmpresa.cifrarContraseña(req.body.password);
    objEmpresa.save((error, nuevaEmpresa) => {
        if (error) {
            res.status(500).json({
                ok: false,
                content: error,
                message: 'Hubo un error al registrar la empresa'
            });
        }
        else {
            res.status(201).json({
                ok: true,
                content: nuevaEmpresa,
                message: 'Empresa registrada exitosamente'
            });
        }
    });
};
exports.crearEmpresa = crearEmpresa;
var loginEmpresa = (req, res) => {
    let { email, password } = req.body;
    mongoose_1.Empresa.findOne({ emp_emal: email }, (error, empresa) => {
        if (empresa) {
            let validacion = empresa.validarContraseña(password);
            if (validacion) {
                let token = empresa.generarJWT();
                let nombre = empresa.emp_nomb;
                let id = empresa._id;
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
                res.status(400).json({
                    ok: false,
                    content: null,
                    message: 'Contraseña incorrecta'
                });
            }
        }
        else {
            res.status(404).json({
                ok: false,
                content: null,
                message: 'Usuario inexistente'
            });
        }
    });
};
exports.loginEmpresa = loginEmpresa;
var devolverEmpresas = (req, res) => {
    mongoose_1.Empresa.find((error, empresas) => {
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
                content: empresas,
                message: null
            });
        }
    });
};
exports.devolverEmpresas = devolverEmpresas;
