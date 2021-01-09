import { Response, Request, NextFunction } from "express";
import { verify } from 'jsonwebtoken';

let verificarToken = (token:any) => {
  try {
    let resultado = verify(token, "proyecto", { algorithm: "RS256" });
    return resultado
  } catch (error) {
    return null;
  }
};

export var controladorPersona = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization) {
    let token = req.headers.authorization.split(" ")[1];
    let verificacion = verificarToken(token);
    if (verificacion) {
      let {tipo} = verificacion
      if (tipo === "persona") {
        next();
      } else {
        res.status(401).json({
          ok: false,
          message: "No tiene permitido realizar esta peticion",
        });
      }
    } else {
      res.status(401).json({
        ok: false,
        message: "Token vencido o presenta algun fallo",
      });
    }
  } else {
    res.status(401).json({
      ok: false,
      message: "Necesitas estar autenticado para realizar esta peticion",
    });
  }
};

export var controladorEmpresa = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization) {
    let token = req.headers.authorization.split(" ")[1];
    let verificacion = verificarToken(token);
    if (verificacion) {
      let {tipo} = verificacion
      if (tipo === "empresa") {
        next();
      } else {
        res.status(200).json({
          ok: false,
          message: "No tiene permitido realizar esta peticion",
        });
      }
    } else {
      res.status(200).json({
        ok: false,
        message: "Token vencido o presenta algun fallo",
      });
    }
  } else {
    res.status(200).json({
      ok: false,
      message: "Necesitas estar autenticado para realizar esta peticion",
    });
  }
};