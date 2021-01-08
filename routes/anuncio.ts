import { Router } from 'express';
import { crearAnuncio, traerAnuncio, traerAnunciosXEmpresa, busquedaAnunciosPuesto, anunciosContratados, añadirPostulante } from '../controllers/anuncio';
import { controlador } from "../utils/Validador";

export var anuncio_router = Router();

anuncio_router.post('/crear/anuncio',controlador, crearAnuncio);
anuncio_router.get('/anuncio/:id', traerAnuncio);
anuncio_router.get('/anuncios/:id', traerAnunciosXEmpresa);
anuncio_router.get('/anuncios/keyword/:keyword', busquedaAnunciosPuesto);
anuncio_router.get('/anuncioscontratados', anunciosContratados);
// anuncio_router.post('/postulante/:id', añadirPostulante);