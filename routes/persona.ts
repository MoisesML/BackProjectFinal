import { Router } from 'express';
import { crearPersona, devolverPersona, devolverPersonas, loginPersona } from '../controllers/persona';

export var persona_router = Router();

persona_router.post('/registro', crearPersona);
persona_router.post('/login', loginPersona);
persona_router.get('/personas', devolverPersonas);
persona_router.get('/persona/:id', devolverPersona);