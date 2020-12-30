import { Schema } from 'mongoose';
import crypto from 'crypto';
import { sign } from 'jsonwebtoken';

var fonoSchema = new Schema ({
    fono_num : {
        type : String,
        required : true
    },
    fono_ope : {
        type : String,
        required : true
    }
})

var estudioSchema = new Schema ({
    est_nom : {
        type : String,
        required : true
    },
    est_nvl : {
        type : String,
        required : true
    },
    est_inst : {
        type : String,
        required : true
    },
    est_ini : {
        type : String,
        required : true
    },
    est_fin : {
        type : String,
        required : true
    }
})

var trabajoSchema = new Schema ({
    trab_pue : {
        type:String,
        required : true
    },
    trab_emp : {
        type:String,
        required : true
    },
    trab_ini : {
        type : String,
        required : true
    },
    trab_fin : {
        type : String,
        required : true
    },
    trab_func : {
        type : String,
        required : true
    }

})

export var personaSchema = new Schema ({
    per_nomb : {
        type : String,
        required : true
    },
    per_apel : {
        type : String,
        required : true
    },
    per_emal : {
        type : String,
        required : true
    },
    per_dni : {
        type : String,
    },
    per_fnac : {
        type : Date,
    },
    per_dire : {
        type : String,
    },
    per_fonos : [
        fonoSchema
    ],
    per_estu : [
        estudioSchema
    ],
    per_trab : [
        trabajoSchema
    ],
    per_pref : [
        {per_puesto : String}
    ],
    per_salt : String,
    per_hash : String
} , {
    timestamps : true
})

personaSchema.methods.cifrarContraseña = function (password:string) {
    this.per_salt = crypto.randomBytes(16).toString('hex');
    this.per_hash = crypto.pbkdf2Sync(password, this.per_salt, 1000, 64, 'sha512').toString('hex');
};

personaSchema.methods.validarContraseña = function ( password:string) {
    let temporal = crypto.pbkdf2Sync(password, this.per_salt, 1000, 64, 'sha512').toString('hex');
    if (temporal == this.per_hash) {
        return true
    } else {
        return false
    }
}

personaSchema.methods.generarJWT = function () {
    let payload = {
        per_id : this._id,
        per_nomb : this.per_nomb,
        per_apel : this.per_apel,
    }
    let token = sign(payload, 'proyecto', {expiresIn : 120}, {algorithm:'RS256'});
    return token;
}