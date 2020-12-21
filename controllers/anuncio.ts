import { Request, Response } from 'express';
import { CallbackError } from 'mongoose';
import { Anuncio } from '../config/mongoose';

export var crearAnuncio = (req:Request, res:Response) => {
    let objAnuncio:any = new Anuncio (req.body);
    objAnuncio.save ((error:CallbackError, nuevoAnuncio:Document) => {
        if (error) {
            res.status(500).json({
                ok : false,
                content : error,
                message : 'Hubo un error al registrar el anuncio'
            })
        } else {
            res.status(201).json({
                ok : true,
                content : nuevoAnuncio,
                message : 'Anuncio registrado exitosamente'
            })
        }
    })
};

export var traerAnunciosXEmpresa = ((req:Request, res:Response) => {
    let { id } = req.params;
    Anuncio.find({anun_emId : id}, (error:CallbackError, anuncios:any) => {
        if (error) {
            res.json({
                ok : false,
                content : null,
                message : 'No se encontro los anuncios'
            })
        } else {
            res.json({
                ok : true,
                content : anuncios,
                message : 'Se encontro los anuncios'
            })
        }
    })
});

export var busquedaAnunciosPuesto = ((req:Request, res:Response) => {
    let { keyword } = req.params;
    const keywordRegex = new RegExp(keyword, 'i');
    Anuncio.find({anun_psto : keywordRegex}, (error:CallbackError, anuncios:any) => {
        if (error) {
            res.json({
                ok : false,
                content : null,
                message : `No se encontro los anuncios + ${keyword}`
            })
        } else {
            res.json({
                ok : true,
                content : anuncios,
                message : 'Se encontro los anuncios con la palabra '+ keyword
            })
        }
    })
});

export var anunciosContratados = ((req:Request, res:Response) => {
    Anuncio.find({anun_cont : true}, (error:CallbackError, anuncios:any) => {
        if (anuncios.length > 0) {
            res.json({
                ok : true,
                content : anuncios,
                message : 'Estos son todos los anuncios contratados'
            })
        } else {
            res.json({
                ok : false,
                content : null,
                message : 'No se encontro anuncios contratados'
            })
        }
    })
});