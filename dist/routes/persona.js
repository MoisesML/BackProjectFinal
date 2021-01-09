"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.persona_router = void 0;
const express_1 = require("express");
const persona_1 = require("../controllers/persona");
const Validador_1 = require("../utils/Validador");
exports.persona_router = express_1.Router();
exports.persona_router.post('/registro', persona_1.crearPersona);
exports.persona_router.post('/login', persona_1.loginPersona);
exports.persona_router.get('/personas', persona_1.devolverPersonas);
exports.persona_router.get('/persona/:id', persona_1.devolverPersona);
exports.persona_router.put('/editar/:id', Validador_1.controladorPersona, persona_1.editarPersona);
exports.persona_router.put('/fono/:id/:idFono', Validador_1.controladorPersona, persona_1.editarFono);
// fALTA EDITAR LOS TRABAJOS Y ESTUDIOS
exports.persona_router.post('/trabajo/:id', Validador_1.controladorPersona, persona_1.agregarTrabajo);
exports.persona_router.post('/telefono/:id', Validador_1.controladorPersona, persona_1.agregarFono);
exports.persona_router.post('/estudio/:id', Validador_1.controladorPersona, persona_1.agregarEstudio);
exports.persona_router.delete('/eliminarFono/:id/:idFono', Validador_1.controladorPersona, persona_1.eliminarFono);
// FALTA ELIMINAR LOS TRABAJOS Y ESTUDIOS
