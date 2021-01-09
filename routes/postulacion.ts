import { Router } from 'express';
import { agregarPostulante, postulacionAnuncio, postulacionesPersona, postulacionesEmpresa, postulacionExacta } from '../controllers/postulacion';
import { controladorEmpresa, controladorPersona } from "../utils/Validador";

export var postulacion_router = Router();

postulacion_router.post('/postulante/:id',controladorPersona, agregarPostulante);
postulacion_router.get('/postulantes/anuncio/:id', postulacionAnuncio);
postulacion_router.get('/postulaciones/persona/:id',controladorPersona, postulacionesPersona);
postulacion_router.get('/postulacion/:id/:idAn', controladorPersona, postulacionExacta);
postulacion_router.get('/postulaciones/empresa/:id', controladorEmpresa, postulacionesEmpresa);
// Actualizar estado de postulacion