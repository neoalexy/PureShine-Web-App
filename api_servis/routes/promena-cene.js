const express = require('express');
const{sequelize, Usluga} = require("../models");
const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({ extended:true }));
module.exports = route; 


route.put("/:id", async (req, res) => {
    try {
      const usluga = await Usluga.findByPk(req.params.id);
      usluga.cena = req.body.cena;
      usluga.save();
      return res.json(usluga);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Greska", data: err });
    }
  });