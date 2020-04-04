// Creation des constantes

const express = require("express");
const router = express.Router();

//Statut du lancement du serveur Route

router.get("/", (req, res) => {
    res.send({ response: "Serveur fonctionnel" }).status(200);
});

module.exports = router;
