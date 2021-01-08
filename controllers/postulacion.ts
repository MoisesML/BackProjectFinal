import { Request, Response } from "express";
import { CallbackError } from "mongoose";
import { Postulacion, Anuncio } from "../config/mongoose";

export var agregarPostulante = (req: Request, res: Response) => {
  let { id } = req.params;
  let { post_idPe } =req.body;

  Anuncio.findById(id, (error: CallbackError, anuncio: any) => {
    if (error) {
      res.status(200).json({
        ok: false,
        content: error,
        message: "No se pudo encontrar el anuncio",
      });
    } else {
      anuncio.anun_post.push(post_idPe)
      anuncio.save();
      let objPostulacion: any = new Postulacion(req.body);
      objPostulacion.save((error: CallbackError, postulacion: Document) => {
        if (error) {
          res.status(200).json({
            ok: false,
            content: error,
            message: "No se pudo registrar la postulacion",
          });
        } else {
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

export var postulacionAnuncio = (req:Request, res:Response) => {
  let { id } = req.params;
  Postulacion.find({post_idAn:id}, (error:CallbackError, postulantes:any) => {
    if (postulantes) {
      res.json({
        ok: true,
        content: postulantes,
        message: "Estos son los postulantes del anuncio",
      });
    } else {
      res.json({
        ok: false,
        content: null,
        message: "No se encontro anuncios contratados",
      });
    }
  })
};

export var postulacionesPersona = (req:Request, res:Response) => {
  let { id } = req.params;
  Postulacion.find({post_idPe:id}, (error:CallbackError, postulaciones:any) => {
    if (postulaciones) {
      res.json({
        ok: true,
        content: postulaciones,
        message: "Estos son las postulaciones de la persona",
      });
    } else {
      res.json({
        ok: false,
        content: null,
        message: "No se encontro anuncios contratados",
      });
    }
  })
}