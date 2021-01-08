import { Router } from 'express';
import { crearPersona, devolverPersona, devolverPersonas, editarFono, eliminarFono, loginPersona, editarPersona, agregarFono, agregarEstudio, agregarTrabajo } from '../controllers/persona';
import { controlador } from "../utils/Validador";

export var persona_router = Router();

persona_router.post('/registro', crearPersona);
persona_router.post('/login', loginPersona);
persona_router.get('/personas', devolverPersonas);
persona_router.get('/persona/:id', devolverPersona);
persona_router.put('/editar/:id', controlador, editarPersona);
persona_router.put('/fono/:id/:idFono', controlador, editarFono);
// fALTA EDITAR LOS TRABAJOS Y ESTUDIOS
persona_router.post('/trabajo/:id', controlador, agregarTrabajo);
persona_router.post('/telefono/:id', controlador, agregarFono);
persona_router.post('/estudio/:id', controlador, agregarEstudio);
persona_router.delete('/eliminarFono/:id/:idFono',controlador, eliminarFono);
// FALTA ELIMINAR LOS TRABAJOS Y ESTUDIOS