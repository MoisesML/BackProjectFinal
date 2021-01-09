"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.devolverEmpresa = exports.devolverEmpresas = exports.loginEmpresa = exports.crearEmpresa = void 0;
const mongoose_1 = require("../config/mongoose");
var crearEmpresa = (req, res) => {
    let { emp_emal } = req.body;
    mongoose_1.Empresa.findOne({ emp_emal: emp_emal }, (error, empresa) => {
        if (empresa) {
            res.json({
                ok: false,
                content: null,
                message: "El correo ingresado ya esta en uso",
            });
        }
        else {
            let objEmpresa = new mongoose_1.Empresa(req.body);
            objEmpresa.cifrarContraseña(req.body.password);
            objEmpresa.save((error, nuevaEmpresa) => {
                if (error) {
                    res.status(200).json({
                        ok: false,
                        content: error,
                        message: "Hubo un error al registrar la empresa",
                    });
                }
                else {
                    res.status(201).json({
                        ok: true,
                        content: nuevaEmpresa,
                        message: "Empresa registrada exitosamente",
                    });
                }
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
                let tipo = "empresa";
                res.json({
                    ok: true,
                    content: {
                        nombre,
                        id,
                        tipo,
                        token,
                    },
                    message: "Bienvenido",
                });
            }
            else {
                res.status(200).json({
                    ok: false,
                    content: null,
                    message: "Contraseña incorrecta",
                });
            }
        }
        else {
            res.status(200).json({
                ok: false,
                content: error,
                message: "Usuario inexistente",
            });
        }
    });
};
exports.loginEmpresa = loginEmpresa;
var devolverEmpresas = (req, res) => {
    mongoose_1.Empresa.find((error, empresas) => {
        if (error) {
            res.status(200).json({
                ok: false,
                content: error,
                message: "Hubo un error al traer los usuarios",
            });
        }
        else {
            res.json({
                ok: true,
                content: empresas,
                message: null,
            });
        }
    });
};
exports.devolverEmpresas = devolverEmpresas;
var devolverEmpresa = (req, res) => {
    let { id } = req.params;
    mongoose_1.Empresa.findById(id, (error, empresa) => {
        if (error) {
            res.json({
                ok: false,
                content: error,
                message: "No se encontro la empresa",
            });
        }
        else {
            res.json({
                ok: true,
                content: empresa,
                message: "Se encontro la empresa",
            });
        }
    });
};
exports.devolverEmpresa = devolverEmpresa;
