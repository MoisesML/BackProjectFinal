"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postulacion_router = void 0;
const express_1 = require("express");
const postulacion_1 = require("../controllers/postulacion");
exports.postulacion_router = express_1.Router();
exports.postulacion_router.post('/postulante/:id', postulacion_1.agregarPostulante);
exports.postulacion_router.get('/postulantes/anuncio/:id', postulacion_1.postulacionAnuncio);
exports.postulacion_router.get('/postulaciones/persona/:id', postulacion_1.postulacionesPersona);
// Actualizar estado de postulacion
