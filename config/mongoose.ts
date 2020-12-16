import { model } from 'mongoose';
import { personaSchema } from '../models/Persona';
import { empresaSchema } from '../models/empresa';

export var Persona = model('persona', personaSchema);
export var Empresa = model('empresa', empresaSchema);