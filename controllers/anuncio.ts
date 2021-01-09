import { Request, Response } from "express";
import { CallbackError } from "mongoose";
import { Anuncio } from "../config/mongoose";

export var crearAnuncio = (req: Request, res: Response) => {
  let objAnuncio: any = new Anuncio(req.body);
  objAnuncio.save((error: CallbackError, nuevoAnuncio: Document) => {
    if (error) {
      res.status(200).json({
        ok: false,
        content: error,
        message: "Hubo un error al registrar el anuncio",
      });
    } else {
      res.status(201).json({
        ok: true,
        content: nuevoAnuncio,
        message: "Anuncio registrado exitosamente",
      });
    }
  });
};

export var traerAnuncio = (req: Request, res: Response) => {
  let { id } = req.params;
  Anuncio.findById(id, (error: CallbackError, anuncio: any) => {
    if (error) {
      res.json({
        ok: false,
        content: error,
        message: "No se encontro el anuncio",
      });
    } else {
      res.json({
        ok: true,
        content: anuncio,
        message: "Se encontro el anuncio",
      });
    }
  });
};

export var devolverAnuncios = (req: Request, res: Response) => {
  Anuncio.find((error: any, anuncios: any) => {
    if (error) {
      res.status(200).json({
        ok: false,
        content: error,
        message: "Hubo un error al traer los anuncios",
      });
    } else {
      res.json({
        ok: true,
        content: anuncios,
        message: null,
      });
    }
  });
};

export var traerAnunciosXEmpresa = (req: Request, res: Response) => {
  let { id } = req.params;
  Anuncio.find({ anun_emId: id }, (error: CallbackError, anuncios: any) => {
    if (error) {
      res.json({
        ok: false,
        content: error,
        message: "No se encontro los anuncios",
      });
    } else {
      res.json({
        ok: true,
        content: anuncios,
        message: "Se encontro los anuncios",
      });
    }
  });
};

export var busquedaAnunciosPuestoLugar = (req: Request, res: Response) => {
  let { keyword, place } = req.params;
  const keywordRegex = new RegExp(keyword, "i");
  const placeRegex = new RegExp(place, "i");
  Anuncio.find(
    { anun_psto: keywordRegex, anun_ubic: placeRegex },
    (error: CallbackError, anuncios: any) => {
      if (error) {
        res.json({
          ok: false,
          content: null,
          message: `No se encontro anuncios con los parametros indicados`,
        });
      } else {
        res.json({
          ok: true,
          content: anuncios,
          message: "Se encontro estos anuncios ",
        });
      }
    }
  );
};

export var busquedaAnunciosPuesto = (req: Request, res: Response) => {
  let { keyword } = req.params;
  const keywordRegex = new RegExp(keyword, "i");
  Anuncio.find(
    { anun_psto: keywordRegex },
    (error: CallbackError, anuncios: any) => {
      if (error) {
        res.json({
          ok: false,
          content: null,
          message: `No se encontro anuncios con los parametros indicados`,
        });
      } else {
        res.json({
          ok: true,
          content: anuncios,
          message: "Se encontro estos anuncios ",
        });
      }
    }
  );
};

export var busquedaAnunciosLugar = (req: Request, res: Response) => {
  let { place } = req.params;
  const placeRegex = new RegExp(place, "i");
  Anuncio.find(
    { anun_ubic: placeRegex },
    (error: CallbackError, anuncios: any) => {
      if (error) {
        res.json({
          ok: false,
          content: null,
          message: `No se encontro anuncios con los parametros indicados`,
        });
      } else {
        res.json({
          ok: true,
          content: anuncios,
          message: "Se encontro estos anuncios ",
        });
      }
    }
  );
};

export var anunciosContratados = (req: Request, res: Response) => {
  Anuncio.find({ anun_cont: true }, (error: CallbackError, anuncios: any) => {
    if (anuncios.length > 0) {
      res.json({
        ok: true,
        content: anuncios,
        message: "Estos son todos los anuncios contratados",
      });
    } else {
      res.json({
        ok: false,
        content: null,
        message: "No se encontro anuncios contratados",
      });
    }
  });
};

export var añadirPostulante = (req:Request, res:Response) => {
    let { id } = req.params;
    Anuncio.findById(id, (error:CallbackError, anuncio:any) => {
        if (error) {
            res.status(200).json({
                ok: false,
                content: error,
                message: "No se pudo encontrar el anuncio",
              });
        } else {
            anuncio.anun_post.push(req.body);
            anuncio.save();
            res.status(201).json({
                ok: true,
                content: anuncio,
                message: "Se registro su postulación exitosamente",
              });
        }
    })
}