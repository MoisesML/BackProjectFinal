import express from 'express';
import { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { persona_router } from '../routes/persona';
import { empresa_router } from '../routes/empresa';
import { anuncio_router } from '../routes/anuncio';
import { postulacion_router } from '../routes/postulacion';
var cors = require('cors');

export default class Server {
    public app : express.Application;
    public puerto : any;

    constructor () {
        this.app = express();
        this.app.use ((req:Request, res:Response, next:NextFunction) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            next();
        })
        this.app.use(cors());

        this.puerto = process.env.PORT || 5000;
        this.configurarBodyParser();
        this.conectarMongo();
        this.rutas();
    }

    configurarBodyParser () {
        this.app.use(bodyParser.urlencoded({extended : false}));
        this.app.use(bodyParser.json());
    }

    rutas () {
        this.app.get('/', (req:Request, res:Response) => {
            res.send('Bienvenido a la API-Proyecto')
        });
        this.app.use('', persona_router, empresa_router, anuncio_router, postulacion_router);
    }

    iniciarServidor () {
        this.app.listen (this.puerto, () => {
            console.log('Servidor corriendo exitosamente en el puerto', this.puerto)
        })
    }

    conectarMongo () {
        mongoose.connect('mongodb+srv://Moises:moises@cluster0.nhdth.mongodb.net/proyectocodigo?retryWrites=true&w=majority',{ useNewUrlParser : true, useFindAndModify : false, useUnifiedTopology : true, useCreateIndex : true })
    }

}

