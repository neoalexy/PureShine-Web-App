const express = require('express');
const{sequelize,  Upit} = require("../models");
const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({ extended:true }));


// route.post('/rezervacija-usluge', async (req, res) => {
//     try {
//       const { ime, adresa, telefon, zakazanoVreme, upit } = req.body;
  
//       const noviUpit = await Upit.create({
//         ime,
//         adresa,
//         telefon,
//         zakazanoVreme,
//         upit,
//       });
  
//       return res.status(200).json({ success: true, message: 'Upit uspesno poslat.' });
//     } catch (err) {
//       console.error(err);
//       return res.status(500).json({ success: false, error: 'Doslo je do problema prilikom slanja upita.' });
//     }
//   });



route.post("/rezervacija-usluge", async (req, res) => {
    try {
        const noviUpit = {
            ime: req.body.ime,
            adresa: req.body.adresa,
            telefon: req.body.telefon,
            zakazanoVreme: req.body.zakazanoVreme,
            upit: req.body.upit,
        };

        const novi = await Upit.create(noviUpit);

    //     return res.status(200).json({ success: true, message: 'Upit uspešno poslat.', noviUpit: novi });
    // } catch (err) {
    //     console.error(err);
    //     return res.status(500).json({ success: false, error: 'Došlo je do problema prilikom slanja upita.', data: err });
    // }
    return res.json(novi);
} catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
}
});
  
  module.exports = route;






