// creation des constantes

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const { dbURI } = require("./config/keys");
const utilisateurs = require("./routes/utilisateurs");

//Connection

mongoose
    .connect(dbURI, { useNewUrlParser: true})
    .then(() => console.log(`Connection reussie`))
    .catch(err => console.error(`Erreur connection ${err}`));

//Middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

//Routes

app.use("/api/utilisateurs", utilisateurs);

//Appel PORT

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Appel du port ${port}`));



