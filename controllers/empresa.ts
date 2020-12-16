import { Request, Response } from 'express';
import { CallbackError } from 'mongoose';
import { Empresa } from '../config/mongoose';

export var crearEmpresa = (req:Request, res:Response) => {
    let objEmpresa:any = new Empresa (req.body);
    objEmpresa.cifrarContraseña(req.body.password);
    objEmpresa.save ((error:CallbackError, nuevaEmpresa:Document) => {
        if (error) {
            res.status(500).json({
                ok : false,
                content : error,
                message : 'Hubo un error al registrar la empresa'
            })
        } else {
            res.status(201).json({
                ok : true,
                content : nuevaEmpresa,
                message : 'Empresa registrada exitosamente'
            })
        }
    })
};

export var loginEmpresa = (req:Request, res:Response) => {
    let { correo, password } = req.body;
    Empresa.findOne({emp_emal : correo}, (error:any, empresa:any) => {
        if (empresa) {
            let validacion = empresa.validarContraseña(password);
            if (validacion) {
                res.json({
                    ok : true,
                    content : 'token',
                    message : 'Bienvenido'
                })
            } else {
                res.status(400).json({
                    ok : false,
                    content : null,
                    message : 'Contraseña incorrecta'
                })
            }
        } else {
            res.status(404).json({
                ok : false,
                content : null,
                message : 'Usuario inexistente'
            })
        }
    })
};

export var devolverEmpresas = (req:Request, res:Response) => {
    Empresa.find((error:any, empresas:any) => {
        if (error) {
            res.status(500).json({
                ok : false,
                content : error,
                message : 'Hubo un error al traer los usuarios'
            })
        } else {
            res.json({
                ok : true,
                content : empresas,
                message : null
            })
        }
    })
}