import { Router } from 'express';
import { agregarPostulante, postulacionAnuncio, postulacionesPersona } from '../controllers/postulacion';

export var postulacion_router = Router();

postulacion_router.post('/postulante/:id', agregarPostulante);
postulacion_router.get('/postulantes/anuncio/:id', postulacionAnuncio);
postulacion_router.get('/postulaciones/persona/:id', postulacionesPersona);
// Actualizar estado de postulacion