import { Router } from 'express';
import { crearEmpresa, devolverEmpresas, loginEmpresa } from '../controllers/empresa';

export var empresa_router = Router();

empresa_router.post('/empregistro', crearEmpresa);
empresa_router.post('/emplogin', loginEmpresa);
empresa_router.get('/empresas', devolverEmpresas);