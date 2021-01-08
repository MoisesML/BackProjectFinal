import { model } from 'mongoose';
import { personaSchema } from '../models/Persona';
import { empresaSchema } from '../models/empresa'; 
import { anuncioSchema } from '../models/anuncio';
import { postulacionSchema } from "../models/postulacion";

export var Persona = model('persona', personaSchema);
export var Empresa = model('empresa', empresaSchema);
export var Anuncio = model('anuncio', anuncioSchema);
export var Postulacion = model('postulacion', postulacionSchema);