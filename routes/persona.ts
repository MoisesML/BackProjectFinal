import { Router } from 'express';
import { crearPersona, devolverPersona, devolverPersonas, editarFono, eliminarFono, loginPersona, editarPersona, agregarFono, agregarEstudio, agregarTrabajo, eliminarTrabajo, eliminarEstudio } from '../controllers/persona';
import { controladorPersona } from "../utils/Validador";

export var persona_router = Router();

persona_router.post('/registro', crearPersona);
persona_router.post('/login', loginPersona);
persona_router.get('/personas', devolverPersonas);
persona_router.get('/persona/:id', devolverPersona);
persona_router.put('/editar/:id', controladorPersona, editarPersona);
persona_router.put('/fono/:id/:idFono', controladorPersona, editarFono);
// fALTA EDITAR LOS TRABAJOS Y ESTUDIOS
persona_router.post('/trabajo/:id', controladorPersona, agregarTrabajo);
persona_router.post('/telefono/:id', controladorPersona, agregarFono);
persona_router.post('/estudio/:id', controladorPersona, agregarEstudio);
persona_router.delete('/eliminarFono/:id/:idFono',controladorPersona, eliminarFono);
persona_router.delete('/eliminarFono/:id/:idTrabajo',controladorPersona, eliminarTrabajo);
persona_router.delete('/eliminarFono/:id/:idEstudio',controladorPersona, eliminarEstudio);
// FALTA ELIMINAR LOS TRABAJOS Y ESTUDIOS