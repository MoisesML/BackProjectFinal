import { Request, Response } from "express";
import { CallbackError } from "mongoose";
import { Persona } from "../config/mongoose";

export var crearPersona = (req: Request, res: Response) => {
  let { per_emal } = req.body;
  Persona.findOne({ per_emal: per_emal }, (error: any, persona: any) => {
    if (persona) {
      res.json({
        ok: false,
        content: null,
        message: "El correo ingresado ya esta en uso",
      });
    } else {
      let objPersona: any = new Persona(req.body);
      objPersona.cifrarContraseña(req.body.password);
      objPersona.save((error: CallbackError, nuevaPersona: Document) => {
        if (error) {
          res.status(200).json({
            ok: false,
            content: error,
            message: "Hubo un error al registrar a la persona",
          });
        } else {
          res.status(201).json({
            ok: true,
            content: nuevaPersona,
            message: "Persona registrada exitosamente",
          });
        }
      });
    }
  });
};

export var loginPersona = (req: Request, res: Response) => {
  let { email, password } = req.body;
  Persona.findOne({ per_emal: email }, (error: any, persona: any) => {
    if (persona) {
      let validacion = persona.validarContraseña(password);
      if (validacion) {
        let token = persona.generarJWT();
        let nombre = persona.per_nomb + " " + persona.per_apel;
        let id = persona._id;
        let tipo = "persona";
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
        res.json({
          ok: false,
          content: null,
          message: "Contraseña incorrecta",
        });
      }
    } else {
      res.status(200).json({
        ok: false,
        content: null,
        message: "Usuario inexistente o usuario de empresa",
      });
    }
  });
};

export var devolverPersonas = (req: Request, res: Response) => {
  Persona.find((error: any, personas: any) => {
    if (error) {
      res.status(200).json({
        ok: false,
        content: error,
        message: "Hubo un error al traer los usuarios",
      });
    } else {
      res.json({
        ok: true,
        content: personas,
        message: null,
      });
    }
  });
};

export var devolverPersona = (req: Request, res: Response) => {
  let { id } = req.params;
  Persona.findById(id, (error: CallbackError, persona: any) => {
    if (error) {
      res.json({
        ok: false,
        content: null,
        message: "No se encontro la persona",
      });
    } else {
      res.json({
        ok: true,
        content: persona,
        message: "Se encontro la persona",
      });
    }
  });
};

export var editarPersona = (req: Request, res: Response) => {
  let { id } = req.params;
  Persona.findByIdAndUpdate(
    id,
    req.body,
    { new: true },
    (error: CallbackError, usuarioActualizado: any) => {
      if (error) {
        res.status(200).json({
          ok: false,
          content: error,
          message: "Hubo un error al actualizar el usuario",
        });
      } else {
        res.status(200).json({
          ok: true,
          content: usuarioActualizado,
          message: "Se actualizo exitosamente el usuario",
        });
      }
    }
  );
};

export var agregarFono = (req: Request, res: Response) => {
  let { id } = req.params;
  Persona.findById(id, (error: CallbackError, persona: any) => {
    if (error) {
      res.status(200).json({
        ok: false,
        content: error,
        message: "No se pudo agregar el fono",
      });
    } else {
      persona.per_fonos.push(req.body);
      persona.save();
      res.status(201).json({
        ok: true,
        content: persona,
        message: "Se agrego el fono correctamente",
      });
    }
  });
};

export var agregarEstudio = (req: Request, res: Response) => {
  let { id } = req.params;
  Persona.findById(id, (error: CallbackError, persona: any) => {
    if (error) {
      res.status(200).json({
        ok: false,
        content: error,
        message: "No se pudo agregar el estudio",
      });
    } else {
      persona.per_estu.push(req.body);
      persona.save();
      res.status(201).json({
        ok: true,
        content: persona,
        message: "Se agrego el estudio correctamente",
      });
    }
  });
};

export var agregarTrabajo = (req: Request, res: Response) => {
  let { id } = req.params;
  Persona.findById(id, (error: CallbackError, persona: any) => {
    if (error) {
      res.status(200).json({
        ok: false,
        content: error,
        message: "No se pudo agregar el trabajo",
      });
    } else {
      persona.per_trab.push(req.body);
      persona.save();
      res.status(201).json({
        ok: true,
        content: persona,
        message: "Se agrego el trabajo correctamente",
      });
    }
  });
};

export var editarFono = (req: Request, res: Response) => {
  let { id, idFono } = req.params;
  let { fono_num:numero, fono_ope:operador} = req.body;
  Persona.findById(id, (error: CallbackError, persona: any) => {
    if (error) {
      res.status(200).json({
        ok: false,
        content: error,
        message: "No se pudo quitar el telefono",
      });
    } else {
      let telefonos = persona.per_fonos;
      let nuevoFonos = telefonos.map((tel:any, i:any) => {
        let { _id, fono_num, fono_ope } = tel;
        if (_id == idFono) {
          fono_num = numero;
          fono_ope = operador;
          return {
            _id,
            fono_num,
            fono_ope,
          };
        } else {
          return tel;
        }
      });
      persona.per_fonos = nuevoFonos;
      persona.save();
      res.status(201).json({
        ok: true,
        content: persona,
        message: "Se edito correctamente",
      });
    }
  });
};

export var eliminarFono = (req: Request, res: Response) => {
  let { id, idFono } = req.params;
  Persona.findById(id, (error: CallbackError, persona: any) => {
    if (error) {
      res.status(200).json({
        ok: false,
        content: error,
        message: "No se pudo quitar el telefono",
      });
    } else {
      let telefonos = persona.per_fonos;
      let nuevoFonos = telefonos.map((tel:any, i:any) => {
        let { _id, fono_num, fono_ope, fono_sta } = tel;
        if (_id == idFono) {
          fono_sta = "false"
          return {
            _id,
            fono_num,
            fono_ope,
            fono_sta
          };
        } else {
          return tel;
        }
      });
      persona.per_fonos = nuevoFonos;
      persona.save();
      res.status(201).json({
        ok: true,
        content: persona,
        message: "Se elimino el telefono correctamente",
      });
    }
  });
};
