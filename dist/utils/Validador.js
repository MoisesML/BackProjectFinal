"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controladorEmpresa = exports.controladorPersona = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
let verificarToken = (token) => {
    try {
        let resultado = jsonwebtoken_1.verify(token, "proyecto", { algorithm: "RS256" });
        return resultado;
    }
    catch (error) {
        return null;
    }
};
var controladorPersona = (req, res, next) => {
    if (req.headers.authorization) {
        let token = req.headers.authorization.split(" ")[1];
        let verificacion = verificarToken(token);
        if (verificacion) {
            let { tipo } = verificacion;
            if (tipo === "persona") {
                next();
            }
            else {
                res.status(401).json({
                    ok: false,
                    message: "No tiene permitido realizar esta peticion",
                });
            }
        }
        else {
            res.status(401).json({
                ok: false,
                message: "Token vencido o presenta algun fallo",
            });
        }
    }
    else {
        res.status(401).json({
            ok: false,
            message: "Necesitas estar autenticado para realizar esta peticion",
        });
    }
};
exports.controladorPersona = controladorPersona;
var controladorEmpresa = (req, res, next) => {
    if (req.headers.authorization) {
        let token = req.headers.authorization.split(" ")[1];
        let verificacion = verificarToken(token);
        if (verificacion) {
            let { tipo } = verificacion;
            if (tipo === "empresa") {
                next();
            }
            else {
                res.status(401).json({
                    ok: false,
                    message: "No tiene permitido realizar esta peticion",
                });
            }
        }
        else {
            res.status(401).json({
                ok: false,
                message: "Token vencido o presenta algun fallo",
            });
        }
    }
    else {
        res.status(401).json({
            ok: false,
            message: "Necesitas estar autenticado para realizar esta peticion",
        });
    }
};
exports.controladorEmpresa = controladorEmpresa;
