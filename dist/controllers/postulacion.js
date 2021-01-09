"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postulacionExacta = exports.postulacionesPersona = exports.postulacionAnuncio = exports.agregarPostulante = void 0;
const mongoose_1 = require("../config/mongoose");
var agregarPostulante = (req, res) => {
    let { id } = req.params;
    let { post_idPe } = req.body;
    mongoose_1.Anuncio.findById(id, (error, anuncio) => {
        if (error) {
            res.status(200).json({
                ok: false,
                content: error,
                message: "No se pudo encontrar el anuncio",
            });
        }
        else {
            anuncio.anun_post.push(post_idPe);
            anuncio.save();
            let objPostulacion = new mongoose_1.Postulacion(req.body);
            objPostulacion.save((error, postulacion) => {
                if (error) {
                    res.status(200).json({
                        ok: false,
                        content: error,
                        message: "No se pudo registrar la postulacion",
                    });
                }
                else {
                    res.status(201).json({
                        ok: true,
                        content: postulacion,
                        message: "Se registro su postulación exitosamente",
                    });
                }
            });
        }
    });
};
exports.agregarPostulante = agregarPostulante;
var postulacionAnuncio = (req, res) => {
    let { id } = req.params;
    mongoose_1.Postulacion.find({ post_idAn: id }, (error, postulantes) => {
        if (postulantes) {
            res.json({
                ok: true,
                content: postulantes,
                message: "Estos son los postulantes del anuncio",
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
exports.postulacionAnuncio = postulacionAnuncio;
var postulacionesPersona = (req, res) => {
    let { id } = req.params;
    mongoose_1.Postulacion.find({ post_idPe: id }, (error, postulaciones) => {
        if (postulaciones) {
            res.json({
                ok: true,
                content: postulaciones,
                message: "Estos son las postulaciones de la persona",
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
exports.postulacionesPersona = postulacionesPersona;
var postulacionExacta = (req, res) => {
    let { id, idAn } = req.params;
    mongoose_1.Postulacion.findOne({ post_idPe: id, post_idAn: idAn }, (error, postulacion) => {
        if (error) {
            res.json({
                ok: false,
                content: null,
                message: "No se pudo encontrar la postulacion, error",
            });
        }
        else {
            if (postulacion) {
                res.json({
                    ok: true,
                    content: postulacion,
                    message: "Esta es la postulacion",
                });
            }
            else {
                res.json({
                    ok: false,
                    content: null,
                    message: "Aun no has postulado",
                });
            }
        }
    });
};
exports.postulacionExacta = postulacionExacta;
