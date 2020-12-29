import { Router } from 'express';
import { crearPersona, devolverPersona, devolverPersonas, loginPersona, editarPersona, agregarFono, agregarEstudio, agregarTrabajo } from '../controllers/persona';

export var persona_router = Router();

persona_router.post('/registro', crearPersona);
persona_router.post('/login', loginPersona);
persona_router.get('/personas', devolverPersonas);
persona_router.get('/persona/:id', devolverPersona);
persona_router.put('/editar/:id', editarPersona);
persona_router.post('/trabajo/:id', agregarTrabajo);
persona_router.post('/telefono/:id', agregarFono);
persona_router.post('/estudio/:id', agregarEstudio);