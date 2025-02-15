const express = require('express');
const cors = require("cors");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const corsOptions = {
    origin: ['http://localhost:8000', 'http://127.0.0.1:8000', 'http://localhost:8080/', 'http://localhost:8001', 'http://localhost:3000']
};

const {sequelize, Usluga, Kategorija, UslugaOprema, Oprema, StavkaRezervacije, Rezervacija} = require("./models");
const app = express();
app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send("Hello from REST API Service")
});


 const uslugaRoutes = require ("./routes/usluga.js");
    app.use ("/usluga", uslugaRoutes);

const kategorijaRoutes = require ("./routes/kategorija.js");
  app.use ("/kategorija", kategorijaRoutes);

 const rezervacijaRoutes = require ("./routes/rezervacija.js");
    app.use("/rezervacija", rezervacijaRoutes);

 const opremaRoutes = require ("./routes/oprema.js");
    app.use("/oprema", opremaRoutes);

const promenaCeneRoutes = require ("./routes/promena-cene.js")
    app.use("/promena-cene", promenaCeneRoutes);

const slikeRoutes = require('./routes/slike.js');
    app.use('/slike', slikeRoutes);

const rezervacijaUslugeRoutes = require('./routes/upit.js');
    app.use("/rezervacija-usluge", rezervacijaUslugeRoutes);

   
app.listen({port:9000}, async() => {
    console.log("Started server on localhost: 9000");
    // await sequelize.sync({force:true});
    await sequelize.authenticate({force:true});
    console.log("DB synced");
});