const express = require('express');
const{sequelize, Rezervacija, StavkaRezervacije, Usluga} = require("../models");
const uslugaoprema = require('../models/uslugaoprema');
const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({ extended:true }));


route.get("/", async (req, res) => {
    try{
    const rezervacije = await Rezervacija.findAll({
        include: [{
            model: StavkaRezervacije,
            as: 'stavke',
        }]
    });
    return res.json(rezervacije);
} catch(err){
    console.log(err);
    res.status(500).json({error: "Greska", data: err});
}
});

route.get("/:id", async (req, res) => {
    try{
        const rezervacija = await Rezervacija.findByPk(req.params.id,{
            include: [{
                model: StavkaRezervacije,
                as: 'stavke',
            }]

        });
        return res.json(rezervacija);
    } catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }
});

route.post("/", async (req, res) => {
    try {
      const novaRezervacija = {
        vreme_narucivanja: req.body.vreme_narucivanja,
        zakazano_vreme: req.body.zakazano_vreme,
        status: req.body.status,
        adresa: req.body.adresa,
        telefon: req.body.telefon,
        ime_prezime: req.body.ime_prezime,
        stavke: req.body.stavke
      };
  
    //   const nova = await Rezervacija.create(novaRezervacija, {
    //     include: [{model: StavkaRezervacije, as: "stavke"}]
    //   });
    const nova = await Rezervacija.create(novaRezervacija);
  
  
      return res.json({ novaRezervacija: nova });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Greska", data: err });
    }
  });

//   route.post("/", async (req, res) => {
//     try {
//         const novaRezervacija = {
//             vreme_narucivanja: req.body.vreme_narucivanja,
//             zakazano_vreme: req.body.zakazano_vreme,
//             status: req.body.status,
//             adresa: req.body.adresa,
//             telefon: req.body.telefon,
//             ime_prezime: req.body.ime_prezime,
//             stavke: req.body.stavke
//         };

//         // Mapiraj nazive usluga na odgovarajuće ID-jeve ili koristi direktno unete ID-jeve
//         const mappedStavke = novaRezervacija.stavke.map(stavka => {
//             return {
//                 usluga_id: stavka.usluga_id, // Ovde koristi direktno uneti ID ili implementiraj logiku za mapiranje
//                 komada: stavka.komada,
//                 jedinicna_cena: stavka.jedinicna_cena
//             };
//         });

//         novaRezervacija.stavke = mappedStavke;

//         const nova = await Rezervacija.create(novaRezervacija, {
//             include: [{ model: StavkaRezervacije, as: "stavke" }]
//         });

//         // Dohvati nazive usluga i dodaj ih u odgovor
//         const rezervacijaSaNazivima = await Rezervacija.findByPk(nova.id, {
//             include: [{
//                 model: StavkaRezervacije,
//                 as: 'stavke',
//                 include: [{
//                     model: Usluga,
//                     as: 'usluga',
//                     attributes: ['naziv'] // Ovde navedi kolone koje želiš da prikažeš u odgovoru
//                 }]
//             }]
//         });

//         return res.json({ novaRezervacija: rezervacijaSaNazivima });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: "Greska", data: err });
//     }
// });

route.put("/:id", async (req, res) => {
    try {
      const rezervacija = await Rezervacija.findByPk(req.params.id);
      rezervacija.update(req.body);
      return res.json(rezervacija);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Greska", data: err });
    }
  });

  route.delete("/:id", async (req, res) => {
    try {
      const rezervacija = await Rezervacija.findByPk(req.params.id);
      rezervacija.destroy();
      return res.json(rezervacija);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Greska", data: err });
    }
  });

module.exports = route; 




