import { Router } from 'express';
import { empresa_router } from './empresa';
import { crearAnuncio, traerAnunciosXEmpresa, busquedaAnunciosPuesto, anunciosContratados } from '../controllers/anuncio';

export var anuncio_router = Router();

empresa_router.post('/crear/anuncio', crearAnuncio);
empresa_router.get('/anuncios/:id', traerAnunciosXEmpresa);
empresa_router.get('/anuncios/keyword/:keyword', busquedaAnunciosPuesto);
empresa_router.get('/anuncioscontratados', anunciosContratados);