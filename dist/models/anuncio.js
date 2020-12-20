"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.anuncioSchema = void 0;
const mongoose_1 = require("mongoose");
var postulanteSchema = new mongoose_1.Schema({
    post_id: {
        type: String,
        required: true
    },
    post_cv: {
        type: Boolean,
        required: true,
        default: false
    }
});
exports.anuncioSchema = new mongoose_1.Schema({
    anun_psto: {
        type: String,
        required: true
    },
    anun_empr: {
        type: String,
        required: true
    },
    anun_emId: {
        type: String,
        required: true
    },
    anun_desc: {
        type: Array,
    },
    anun_post: [
        postulanteSchema
    ],
    anun_esco: [
        { pers_id: String }
    ],
    anun_cont: {
        type: String,
        default: false
    },
    anun_esta: {
        type: String,
        default: true
    }
});
