import { Schema } from 'mongoose';
import crypto from 'crypto';
import { sign } from 'jsonwebtoken';

export var empresaSchema = new Schema ({
    emp_nomb : {
        type : String,
        required : true
    },
    emp_rsoc : {
        type : String,
        // required : true
    },
    emp_ruc : {
        type : String,
        required : true
    },
    emp_dire : {
        type : String,
        // required : true
    },
    emp_emal : {
        type : String,
        required : true
    },
// Falta agragar los favroitos de cada empresa
    emp_salt : String,
    emp_hash : String
}, {
    timestamps : true
})

empresaSchema.methods.cifrarContraseña = function (password:string) {
    this.emp_salt = crypto.randomBytes(16).toString('hex');
    this.emp_hash = crypto.pbkdf2Sync(password, this.emp_salt, 1000, 64, 'sha512').toString('hex');
};

empresaSchema.methods.validarContraseña = function (password:string) {
    let temporal = crypto.pbkdf2Sync(password, this.emp_salt, 1000, 64, 'sha512').toString('hex');
    if (temporal == this.emp_hash) {
        return true
    } else {
        return false
    }
}

empresaSchema.methods.generarJWT = function () {
    let payload = {
        emp_id : this._id,
        emp_nomb : this.emp_nomb,
        emp_ruc : this.emp_ruc,
    }
    let token = sign(payload, 'proyecto', {expiresIn : 120}, {algorithm:'RS256'});
    return token;
}