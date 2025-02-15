const express = require('express');
const{sequelize, Kategorija, UslugaOprema, Usluga, Oprema, StavkaRezervacije} = require("../models");
const uslugaoprema = require('../models/uslugaoprema');
const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({ extended:true }));


route.get("/", async (req, res) => {
    try{
    // return res.json("Sve usluge");
    const usluge = await Usluga.findAll({
        include: [{
            model: Kategorija,
            as: 'kategorija',
        }]
    });
    return res.json(usluge);
} catch(err){
    console.log(err);
    res.status(500).json({error: "Greska", data: err});
}
});

route.get("/:id", async (req, res) => {
    try{
        // return res.json("Usluga ciji je id=" + req.params.id);
        const usluga = await Usluga.findByPk(req.params.id);
        //return console.log(usluga.toString());
        return res.json(usluga);
    } catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }
});

// route.post("/", async (req, res) => {
//     try{
//         // return res.json("Unos nove usluge ciji su podaci u req.body");
//         const novi = await Usluga.create(req.body);
//         return res.json(novi);
//     } catch(err){
//         console.log(err);
//         res.status(500).json({error: "Greska", data: err});
//     }
// });

route.post("/", async (req, res) => {
    try {
        const newData = {
            naziv: req.body.naziv,
            opis: req.body.opis,
            cena: req.body.cena,
            kategorija_id: req.body.kategorija_id,
        };
        const novi = await Usluga.create(newData);
        return res.json(novi);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.put("/:id", async (req, res) => {
    try{
       const usluga = await Usluga.findByPk(req.params.id);
       usluga.naziv = req.body.naziv;
       usluga.opis = req.body.opis;
       usluga.cena = req.body.cena;
       usluga.kategorija_id = req.body.kategorija_id;
       usluga.save();
       return res.json(usluga);
       // return res.json("Izmena podataka usluge ciji je id=" + req.params.id + "a podaci su u req.body");
    } catch(err){
        console.log(err);
        res.status(500).json({error:"Greska", data: err});
    }
});

route.delete("/:id", async (req, res) => {
    try{
        // return res.json(req.params.id);
        const usluga = await Usluga.findByPk(req.params.id);
        usluga.destroy();
        return res.json(usluga);
    } catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }
});




module.exports = route; // resava problem ako je ispod definisanih ruta??




