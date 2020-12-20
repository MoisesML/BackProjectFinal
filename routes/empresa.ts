import { Router } from 'express';
import { crearEmpresa, devolverEmpresas, loginEmpresa } from '../controllers/empresa';

export var empresa_router = Router();

empresa_router.post('/empresa/registro', crearEmpresa);
empresa_router.post('/empresa/login', loginEmpresa);
empresa_router.get('/empresas', devolverEmpresas);