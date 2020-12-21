import { Request, Response } from 'express';
import { CallbackError } from 'mongoose';
import { Persona } from '../config/mongoose';

export var crearPersona = (req:Request, res:Response) => {
    let objPersona:any = new Persona (req.body);
    objPersona.cifrarContraseña(req.body.password);
    objPersona.save ((error:CallbackError, nuevaPersona:Document) => {
        if (error) {
            res.status(500).json({
                ok : false,
                content : error,
                message : 'Hubo un error al registrar a la persona'
            })
        } else {
            res.status(201).json({
                ok : true,
                content : nuevaPersona,
                message : 'Persona registrada exitosamente'
            })
        }
    })
};

export var loginPersona = (req:Request, res:Response) => {
    let { email, password } = req.body;
    Persona.findOne({per_emal : email}, (error:any, persona:any) => {
        if (persona) {
            let validacion = persona.validarContraseña(password);
            if (validacion) {
                res.json({
                    ok : true,
                    content : persona._id,
                    message : 'Bienvenido'
                })
            } else {
                res.json({
                    ok : false,
                    content : null,
                    message : 'Contraseña incorrecta'
                })
            }
        } else {
            res.status(200).json({
                ok : false,
                content : null,
                message : 'Usuario inexistente o usuario de empresa'
            })
        }
    })
};

export var devolverPersonas = (req:Request, res:Response) => {
    Persona.find((error:any, personas:any) => {
        if (error) {
            res.status(500).json({
                ok : false,
                content : error,
                message : 'Hubo un error al traer los usuarios'
            })
        } else {
            res.json({
                ok : true,
                content : personas,
                message : null
            })
        }
    })
};

export var devolverPersona = (req:Request, res:Response) => {
    let { id } = req.params;
    Persona.findById(id, (error:CallbackError, persona:any) => {
        if (error) {
            res.json({
                ok : false,
                content : null,
                message : 'No se encontro la persona'
            })
        } else {
            res.json({
                ok : true,
                content : persona,
                message : 'Se encontro la persona'
            })
        }
    })
}
