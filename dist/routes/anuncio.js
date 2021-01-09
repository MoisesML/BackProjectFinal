"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.anuncio_router = void 0;
const express_1 = require("express");
const anuncio_1 = require("../controllers/anuncio");
const Validador_1 = require("../utils/Validador");
exports.anuncio_router = express_1.Router();
exports.anuncio_router.post('/crear/anuncio', Validador_1.controladorEmpresa, anuncio_1.crearAnuncio);
exports.anuncio_router.get('/anuncio/:id', anuncio_1.traerAnuncio);
exports.anuncio_router.get('/anuncios/:id', anuncio_1.traerAnunciosXEmpresa);
exports.anuncio_router.get('/anuncios', anuncio_1.devolverAnuncios);
exports.anuncio_router.get('/busqueda/:keyword/:place', anuncio_1.busquedaAnunciosPuestoLugar);
exports.anuncio_router.get('/puesto/:keyword', anuncio_1.busquedaAnunciosPuesto);
exports.anuncio_router.get('/lugar/:place', anuncio_1.busquedaAnunciosLugar);
exports.anuncio_router.get('/anuncioscontratados', anuncio_1.anunciosContratados);
// Actualizar anuncio, eliminaranuncio
// anuncio_router.post('/postulante/:id', añadirPostulante);
