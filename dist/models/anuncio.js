"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.anuncioSchema = void 0;
const mongoose_1 = require("mongoose");
exports.anuncioSchema = new mongoose_1.Schema({
    anun_psto: {
        type: String,
        required: true
    },
    anun_empr: {
        type: String,
        required: true
    },
    anun_suel: {
        type: String,
        required: true
    },
    anun_emId: {
        type: String,
        required: true
    },
    anun_desc: {
        type: String,
        required: true
    },
    anun_func: {
        type: String,
        required: true
    },
    anun_requ: {
        type: String,
        required: true
    },
    anun_cont: {
        type: String,
        default: false
    },
    anun_esta: {
        type: String,
        default: true
    },
    anun_inic: {
        type: String
    },
    anun_fin: {
        type: String
    },
    anun_ubic: {
        type: String,
        required: true
    },
    anun_post: [
        { per_id: String }
    ]
});
