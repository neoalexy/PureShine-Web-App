const express = require('express');
const{sequelize, Usluga, Kategorija} = require("../models");
const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({ extended:true }));

route.get("/", async (req, res) => {
    try{
    const kategorije = await Kategorija.findAll();
    return res.json(kategorije);
} catch(err){
    console.log(err);
    res.status(500).json({error: "Greska", data: err});
}
});

route.get("/:id", async (req, res) => {
    try{
        const kategorije = await Kategorija.findByPk(req.params.id);
        return res.json(kategorije);
    } catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }
});

route.post("/", async (req, res) => {
    try {
        const novaKategorija = {
            naziv: req.body.naziv,
        };
        const nova = await Kategorija.create(novaKategorija);
        return res.json(nova);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.put("/:id", async (req, res) => {
    try{
       const kategorije = await Kategorija.findByPk(req.params.id);
       kategorije.naziv = req.body.naziv;
       kategorije.save();
       return res.json(kategorije);
    } catch(err){
        console.log(err);
        res.status(500).json({error:"Greska", data: err});
    }
});

route.delete("/:id", async (req, res) => {
    try{
        const kategorija = await Kategorija.findByPk(req.params.id);
        kategorija.destroy();
        return res.json(kategorija);
    } catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }
});



module.exports = route;