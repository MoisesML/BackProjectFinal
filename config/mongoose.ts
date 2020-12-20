import { model } from 'mongoose';
import { personaSchema } from '../models/Persona';
import { empresaSchema } from '../models/empresa'; 
import { anuncioSchema } from '../models/anuncio';

export var Persona = model('persona', personaSchema);
export var Empresa = model('empresa', empresaSchema);
export var Anuncio = model('anuncio', anuncioSchema);