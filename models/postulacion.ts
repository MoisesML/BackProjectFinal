import { Schema } from "mongoose";

export var postulacionSchema = new Schema ({
    post_idPe : {
        type : String,
        required : true
    },
    post_nmPe : {
        type : String,
        required : true
    },
    post_idAn : {
        type : String,
        required : true
    },
    post_idEm : {
        type : String,
        required : true
    },
    post_empr : {
        type : String,
        required : true
    },
    post_psto : {
        type : String,
        required : true
    },
    post_cuvi : {
        type : String,
        required : false
    },
    post_esta : {
        type : String,
        default : "Postulacion Enviada"
    },
    post_sta : {
        type : String,
        default : true
    }
})