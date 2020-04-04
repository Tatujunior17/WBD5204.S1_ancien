//Creations des constantes

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
const keys = require("../config/keys");


//Prise des constantes selon le modele appartenant a Utilisateur

const {Utilisateurs, regValidation, loginValidation } = require('../models/Utilisateurs');

router.get("/", (req, res) => {
    res.send("Hello");
});

// POST Enregistrement utilisateurs

router.post('/inscription', (req, res) => {

    //Validation

    const {error} = regValidation(req.body);
    if (error) {
        return res.status(400).json({
            status: 'error',
            type: error.details[0].path[0],
            msg: error.details[0].message
        });
    }

    //Nouvel Objet

    const newUtilisateur = new Utilisateurs({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    //Email existant ou non

    Utilisateurs.findOne({email: req.body.email}).then(emailMatch => {
        if (emailMatch) {
            return res.status(400).json({
                status: "error",
                type: email,
                msg: "Email déjà existant"
            });
        }

        //Utilisateur existant ou non

        Utilisateurs.findOne({username: req.body.username}).then(usernameMatch => {
            if (usernameMatch) {
                return res.status(400).json({
                    status: "error",
                    type: username,
                    msg: "Utilisateur déjà existant"
                });
            }

            //Hashage mot de passe

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUtilisateur.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUtilisateur.password = hash;

                    //Enregistrement dans la bdd

                    newUtilisateur
                        .save()
                        .then(post => res.json(post))
                        .catch(err => console.error(err));
                });
            });
        });
    });
});

//Envoie page login

router.post('/login',(req,res)=>{
    const {error} = loginValidation(req.body);
    if(error) {
        return res.status(400).json({
            status: "error",
            type: error.details[0].path[0],
            msg: error.details[0].message
        });
    }
    //email existant ou non

    Utilisateurs.findOne({email: req.body.email}).then(utilisateur=>{
        if(!utilisateur) {
            return res.status(400).json({
                status: "error",
                type: "email",
                msg: "Email non enregister."
            });
        }
        //comparaison du mpd crypte
        bcrypt.compare(req.body.password, utilisateur.password).then(isMatch =>{
            if(isMatch){
                const payload ={
                    id:utilisateur.id,
                    username: utilisateur.username,
                    email: utilisateur.email
                };
                jwt.sign(payload, keys.secretKey, {expiresIn:3600},(err,token)=>{

                    //Utilisateur par rapport au token

                    const decode = jwt_decode(token);

                    res.json({
                        sucess: true,
                        token: "test " + token,
                        decode: decode
                    });
                });
            }else{
                return res.status(400).json({
                    status: "error",
                    type: "password",
                    msg: "Mot de passe est incorrect."
                });
            }
        });
    });
});

//Export

module.exports = router;
