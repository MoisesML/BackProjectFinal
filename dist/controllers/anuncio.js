"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.anunciosContratados = exports.busquedaAnunciosPuesto = exports.traerAnunciosXEmpresa = exports.traerAnuncio = exports.crearAnuncio = void 0;
const mongoose_1 = require("../config/mongoose");
var crearAnuncio = (req, res) => {
    let objAnuncio = new mongoose_1.Anuncio(req.body);
    objAnuncio.save((error, nuevoAnuncio) => {
        if (error) {
            res.status(500).json({
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
var busquedaAnunciosPuesto = (req, res) => {
    let { keyword } = req.params;
    const keywordRegex = new RegExp(keyword, "i");
    mongoose_1.Anuncio.find({ anun_psto: keywordRegex }, (error, anuncios) => {
        if (error) {
            res.json({
                ok: false,
                content: null,
                message: `No se encontro los anuncios + ${keyword}`,
            });
        }
        else {
            res.json({
                ok: true,
                content: anuncios,
                message: "Se encontro los anuncios con la palabra " + keyword,
            });
        }
    });
};
exports.busquedaAnunciosPuesto = busquedaAnunciosPuesto;
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
