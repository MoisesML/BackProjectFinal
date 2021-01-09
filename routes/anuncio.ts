import { Router } from 'express';
import { crearAnuncio, traerAnuncio, devolverAnuncios, traerAnunciosXEmpresa, busquedaAnunciosPuestoLugar, anunciosContratados, busquedaAnunciosPuesto, busquedaAnunciosLugar } from '../controllers/anuncio';
import { controladorEmpresa } from "../utils/Validador";

export var anuncio_router = Router();

anuncio_router.post('/crear/anuncio',controladorEmpresa, crearAnuncio);
anuncio_router.get('/anuncio/:id', traerAnuncio);
anuncio_router.get('/anuncios/:id', traerAnunciosXEmpresa);
anuncio_router.get('/anuncios', devolverAnuncios);
anuncio_router.get('/busqueda/:keyword/:place', busquedaAnunciosPuestoLugar);
anuncio_router.get('/puesto/:keyword', busquedaAnunciosPuesto);
anuncio_router.get('/lugar/:place', busquedaAnunciosLugar);
anuncio_router.get('/anuncioscontratados', anunciosContratados);
// Actualizar anuncio, eliminaranuncio
// anuncio_router.post('/postulante/:id', añadirPostulante);