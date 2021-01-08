import { Router } from 'express';
import { crearEmpresa, devolverEmpresas, loginEmpresa, devolverEmpresa } from '../controllers/empresa';
import { controlador } from "../utils/Validador";

export var empresa_router = Router();

empresa_router.post('/empresa/registro', crearEmpresa);
empresa_router.post('/empresa/login', loginEmpresa);
empresa_router.get('/empresas', devolverEmpresas);
empresa_router.get('/empresa/:id', devolverEmpresa);
// FALTA PARA  EDITAR DATOS