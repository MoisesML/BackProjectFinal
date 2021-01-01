import { Request, Response } from "express";
import { CallbackError } from "mongoose";
import { Empresa } from "../config/mongoose";

export var crearEmpresa = (req: Request, res: Response) => {
  let objEmpresa: any = new Empresa(req.body);
  objEmpresa.cifrarContraseña(req.body.password);
  objEmpresa.save((error: CallbackError, nuevaEmpresa: Document) => {
    if (error) {
      res.status(500).json({
        ok: false,
        content: error,
        message: "Hubo un error al registrar la empresa",
      });
    } else {
      res.status(201).json({
        ok: true,
        content: nuevaEmpresa,
        message: "Empresa registrada exitosamente",
      });
    }
  });
};

export var loginEmpresa = (req: Request, res: Response) => {
  let { email, password } = req.body;
  Empresa.findOne({ emp_emal: email }, (error: any, empresa: any) => {
    if (error) {
      res.status(404).json({
        ok: false,
        content: error,
        message: "Usuario inexistente",
      });
    } else {
      let validacion = empresa.validarContraseña(password);
      if (validacion) {
        let token = empresa.generarJWT();
        let nombre = empresa.emp_nomb;
        let id = empresa._id;
        let tipo = "empresa";
        res.json({
          ok: true,
          content: {
            nombre,
            id,
            tipo,
            token,
          },
          message: "Bienvenido",
        });
      } else {
        res.status(400).json({
          ok: false,
          content: null,
          message: "Contraseña incorrecta",
        });
      }
    }
  });
};

export var devolverEmpresas = (req: Request, res: Response) => {
  Empresa.find((error: any, empresas: any) => {
    if (error) {
      res.status(500).json({
        ok: false,
        content: error,
        message: "Hubo un error al traer los usuarios",
      });
    } else {
      res.json({
        ok: true,
        content: empresas,
        message: null,
      });
    }
  });
};

export var devolverEmpresa = (req: Request, res: Response) => {
  let { id } = req.params;
  Empresa.findById(id, (error: CallbackError, empresa: any) => {
    if (error) {
      res.json({
        ok: false,
        content: error,
        message: "No se encontro la empresa",
      });
    } else {
      res.json({
        ok: true,
        content: empresa,
        message: "Se encontro la empresa",
      });
    }
  });
};
