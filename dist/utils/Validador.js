"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controlador = void 0;
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
var controlador = (req, res, next) => {
    if (req.headers.authorization) {
        let token = req.headers.authorization.split(" ")[1];
        let verificacion = verificarToken(token);
        if (verificacion) {
            next();
        }
        else {
            res.status(401).json({
                ok: false,
                message: "No estas autorizado para realizar esta solicitud",
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
exports.controlador = controlador;
