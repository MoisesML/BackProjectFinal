"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.añadirPostulante = exports.anunciosContratados = exports.busquedaAnunciosLugar = exports.busquedaAnunciosPuesto = exports.busquedaAnunciosPuestoLugar = exports.traerAnunciosXEmpresa = exports.devolverAnuncios = exports.traerAnuncio = exports.crearAnuncio = void 0;
const mongoose_1 = require("../config/mongoose");
var crearAnuncio = (req, res) => {
    let objAnuncio = new mongoose_1.Anuncio(req.body);
    objAnuncio.save((error, nuevoAnuncio) => {
        if (error) {
            res.status(200).json({
                ok: false,
                content: error,
                message: "Hubo un error al registrar el anuncio",
            });
        }
        else {
            res.status(201).json({
                ok: true,
                content: nuevoAnuncio,
                message: "Anuncio registrado exitosamente",
            });
        }
    });
};
exports.crearAnuncio = crearAnuncio;
var traerAnuncio = (req, res) => {
    let { id } = req.params;
    mongoose_1.Anuncio.findById(id, (error, anuncio) => {
        if (error) {
            res.json({
                ok: false,
                content: error,
                message: "No se encontro el anuncio",
            });
        }
        else {
            res.json({
                ok: true,
                content: anuncio,
                message: "Se encontro el anuncio",
            });
        }
    });
};
exports.traerAnuncio = traerAnuncio;
var devolverAnuncios = (req, res) => {
    mongoose_1.Anuncio.find((error, anuncios) => {
        if (error) {
            res.status(200).json({
                ok: false,
                content: error,
                message: "Hubo un error al traer los anuncios",
            });
        }
        else {
            res.json({
                ok: true,
                content: anuncios,
                message: null,
            });
        }
    });
};
exports.devolverAnuncios = devolverAnuncios;
var traerAnunciosXEmpresa = (req, res) => {
    let { id } = req.params;
    mongoose_1.Anuncio.find({ anun_emId: id }, (error, anuncios) => {
        if (error) {
            res.json({
                ok: false,
                content: error,
                message: "No se encontro los anuncios",
            });
        }
        else {
            res.json({
                ok: true,
                content: anuncios,
                message: "Se encontro los anuncios",
            });
        }
    });
};
exports.traerAnunciosXEmpresa = traerAnunciosXEmpresa;
var busquedaAnunciosPuestoLugar = (req, res) => {
    let { keyword, place } = req.params;
    const keywordRegex = new RegExp(keyword, "i");
    const placeRegex = new RegExp(place, "i");
    mongoose_1.Anuncio.find({ anun_psto: keywordRegex, anun_ubic: placeRegex }, (error, anuncios) => {
        if (error) {
            res.json({
                ok: false,
                content: null,
                message: `No se encontro anuncios con los parametros indicados`,
            });
        }
        else {
            res.json({
                ok: true,
                content: anuncios,
                message: "Se encontro estos anuncios ",
            });
        }
    });
};
exports.busquedaAnunciosPuestoLugar = busquedaAnunciosPuestoLugar;
var busquedaAnunciosPuesto = (req, res) => {
    let { keyword } = req.params;
    const keywordRegex = new RegExp(keyword, "i");
    mongoose_1.Anuncio.find({ anun_psto: keywordRegex }, (error, anuncios) => {
        if (error) {
            res.json({
                ok: false,
                content: null,
                message: `No se encontro anuncios con los parametros indicados`,
            });
        }
        else {
            res.json({
                ok: true,
                content: anuncios,
                message: "Se encontro estos anuncios ",
            });
        }
    });
};
exports.busquedaAnunciosPuesto = busquedaAnunciosPuesto;
var busquedaAnunciosLugar = (req, res) => {
    let { place } = req.params;
    const placeRegex = new RegExp(place, "i");
    mongoose_1.Anuncio.find({ anun_ubic: placeRegex }, (error, anuncios) => {
        if (error) {
            res.json({
                ok: false,
                content: null,
                message: `No se encontro anuncios con los parametros indicados`,
            });
        }
        else {
            res.json({
                ok: true,
                content: anuncios,
                message: "Se encontro estos anuncios ",
            });
        }
    });
};
exports.busquedaAnunciosLugar = busquedaAnunciosLugar;
var anunciosContratados = (req, res) => {
    mongoose_1.Anuncio.find({ anun_cont: true }, (error, anuncios) => {
        if (anuncios.length > 0) {
            res.json({
                ok: true,
                content: anuncios,
                message: "Estos son todos los anuncios contratados",
            });
        }
        else {
            res.json({
                ok: false,
                content: null,
                message: "No se encontro anuncios contratados",
            });
        }
    });
};
exports.anunciosContratados = anunciosContratados;
var añadirPostulante = (req, res) => {
    let { id } = req.params;
    mongoose_1.Anuncio.findById(id, (error, anuncio) => {
        if (error) {
            res.status(200).json({
                ok: false,
                content: error,
                message: "No se pudo encontrar el anuncio",
            });
        }
        else {
            anuncio.anun_post.push(req.body);
            anuncio.save();
            res.status(201).json({
                ok: true,
                content: anuncio,
                message: "Se registro su postulación exitosamente",
            });
        }
    });
};
exports.añadirPostulante = añadirPostulante;
