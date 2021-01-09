import { Router } from 'express';
import { agregarPostulante, postulacionAnuncio, postulacionesPersona, postulacionExacta } from '../controllers/postulacion';
import { controladorPersona } from "../utils/Validador";

export var postulacion_router = Router();

postulacion_router.post('/postulante/:id',controladorPersona, agregarPostulante);
postulacion_router.get('/postulantes/anuncio/:id', postulacionAnuncio);
postulacion_router.get('/postulaciones/persona/:id',controladorPersona, postulacionesPersona);
postulacion_router.get('/postulacion/:id/:idAn', controladorPersona, postulacionExacta);
// Actualizar estado de postulacion