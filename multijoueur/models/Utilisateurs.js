//Import

const mongoose = require("mongoose");
const Joi = require("joi");
//Schema

const utilisateurSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now()
    }
});

//Model

const Utilisateurs = new mongoose.model("utilisateurs", utilisateurSchema);

//Joi pour la validation

function registartionValidation(utilisateur) {
    const schema = {
        username: Joi.string()
            .min(3)
            .max(30)
            .required(),
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .min(8)
            .required()
    };
    return Joi.validate(utilisateur, schema);
}

function loginValidation(utilisateur) {
    const schema = {
        email: Joi.string().email().required(),
        password: Joi.string().required()
    };
    return Joi.validate(utilisateur, schema);
}

//Export

exports.Utilisateurs = Utilisateurs;
exports.regValidation = registartionValidation;
exports.loginValidation = loginValidation;

