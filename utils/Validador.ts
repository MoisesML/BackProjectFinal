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

export var controlador = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization) {
    let token = req.headers.authorization.split(" ")[1];
    let verificacion = verificarToken(token);
    if (verificacion) {
      next();
    } else {
      res.status(401).json({
        ok: false,
        message: "No estas autorizado para realizar esta solicitud",
      });
    }
  } else {
    res.status(401).json({
      ok: false,
      message: "Necesitas estar autenticado para realizar esta peticion",
    });
  }
};