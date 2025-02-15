const express = require('express');
const{sequelize, Oprema} = require("../models");
const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({ extended:true }));

route.get("/", async (req, res) => {
    try{
    const opreme = await Oprema.findAll();
    return res.json(opreme);
} catch(err){
    console.log(err);
    res.status(500).json({error: "Greska", data: err});
}
});

route.get("/:id", async (req, res) => {
    try{
        const opreme = await Oprema.findByPk(req.params.id);
        return res.json(opreme);
    } catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }
});


route.post("/", async (req, res) => {
    try {
        const novaOprema = {
            naziv: req.body.naziv,
        };
        const nova = await Oprema.create(novaOprema);
        return res.json(nova);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.put("/:id", async (req, res) => {
    try{
       const opreme = await Oprema.findByPk(req.params.id);
       opreme.naziv = req.body.naziv;
       opreme.save();
       return res.json(opreme);
    } catch(err){
        console.log(err);
        res.status(500).json({error:"Greska", data: err});
    }
});

route.delete("/:id", async (req, res) => {
    try{
        const opreme = await Oprema.findByPk(req.params.id);
        opreme.destroy();
        return res.json(opreme);
    } catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }
});
module.exports = route;