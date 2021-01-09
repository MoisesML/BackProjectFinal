"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postulacion_router = void 0;
const express_1 = require("express");
const postulacion_1 = require("../controllers/postulacion");
const Validador_1 = require("../utils/Validador");
exports.postulacion_router = express_1.Router();
exports.postulacion_router.post('/postulante/:id', Validador_1.controladorPersona, postulacion_1.agregarPostulante);
exports.postulacion_router.get('/postulantes/anuncio/:id', postulacion_1.postulacionAnuncio);
exports.postulacion_router.get('/postulaciones/persona/:id', Validador_1.controladorPersona, postulacion_1.postulacionesPersona);
exports.postulacion_router.get('/postulacion/:id/:idAn', Validador_1.controladorPersona, postulacion_1.postulacionExacta);
exports.postulacion_router.get('/postulaciones/empresa/:id', Validador_1.controladorEmpresa, postulacion_1.postulacionesEmpresa);
// Actualizar estado de postulacion
