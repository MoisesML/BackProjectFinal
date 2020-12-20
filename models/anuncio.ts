import { Schema } from 'mongoose';

var postulanteSchema = new Schema ({
    post_id : {
        type : String,
        required : true
    },
    post_cv : {
        type : Boolean,
        required : true,
        default : false
    }
})

export var anuncioSchema = new Schema ({
    anun_psto : {
        type : String,
        required : true
    },
    anun_empr : {
        type : String,
        required : true
    },
    anun_emId : {
        type : String,
        required : true
    },
    anun_desc : {
        type : Array,
        // required : true
    },
    anun_post : [
        postulanteSchema
    ],
    anun_esco : [
        { pers_id : String }
    ],
    anun_cont : {
        type : String,
        default : false
    },
    anun_esta : {
        type : String,
        default : true
    }
})