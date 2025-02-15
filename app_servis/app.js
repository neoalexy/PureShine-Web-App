const express = require('express');
const path = require('path');
const BP = require('body-parser');
const Joi = require('joi');
const fs=require('fs');


const app = express();

function getCookies(req){
    if (req.headers.cookie == null ) return {};

    const rawCookies = req.headers.cookie.split(';');
    const parsedCookies = {};

    rawCookies.forEach (rawCookie => {
        const parsedCookie = rawCookie.split('=');
        parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });

    return parsedCookies;
};

function authToken (req, res, next){
    const cookies = getCookies(req);
    const token = cookies['token'];
    if(token == null) return res.redirect(301, '/login');
    jwt.verify (token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.redirect(301, '/login');
        req.user = user;
        next();
    });
};

app.get('/administrator/register', (req, res) => {
    res.sendFile('register.html', { root: './static/administrator' });
});


app.get('/administrator/login', (req, res) => {
    res.sendFile('login.html', { root: './static/administrator' });
});


app.get('/administrator', authToken, (req, res) => {
    res.sendFile('index.html', { root: './static/administrator' });
});


app.use(express.static(path.join(__dirname, 'static')));
app.use('/nova-usluga', BP.urlencoded({extended: false}));


app.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname, 'static', 'index.html'))
    
});
app.post("/nova-usluga", (req,res) =>{

    const schema = Joi.object().keys({
        naziv: Joi.string().trim().min(5).max(30).required(),
        opis: Joi.string().trim().min(1).required(),
        kategorija: Joi.string().trim().min(1).required(), 
        cena: Joi.number().greater(0).required()
    });
    

 const {error, succ} = schema.validate(req.body);

  if(error){
    console.log('Greška:', error.details[0].message);
    res.send("Greska: "+ error.details[0].message);
    return;
  }
 // console.log('Nema greške, poruka je poslata.');
 // res.send("Poruka je poslata, ocekujte odgovor.");
     

  req.body.opis.replace(/\r?\n|\r/g, '<br>');

  fs.appendFile("usluge.txt",
                JSON.stringify(req.body) + "\n",
                function(err, succ){
                    res.send("Poruka je poslata, ocekujte odgovor uskoro.");
                });
  
});

app.get("/usluge", (req, res) =>{
    console.log("Pristup ruti /usluge");
    const usluge = [];
    fs.readFile('usluge.txt', 'utf8', (err, data) => {
        if(err){
            console.error('Error reading file:', err);
            res.status(500).send({error:"Greska"});
            return;
        }
        else{
            const redovi = data.split('\n');
            for (let i = 0; i < redovi.length; i++) {
                const linija = redovi[i].trim();
                if (linija) {
                    let obj = JSON.parse(linija);
                    usluge.push(obj);
                }
            }
            }
            console.log("Usluge učitane:", usluge); 

            res.json(usluge);
        });
})


app.get('/', (req,res) => {
    // res.sendFile(path.join(__dirname, 'static', 'dist', 'index.html'));

    res.sendFile('index.html', {root: './static/dist'});
});

app.get('/Login', (req,res)=>{
    res.sendFile('index.html', {root: './static/dist'});
    // res.sendFile(path.join(__dirname, 'static', 'dist', 'index.html'));
});

app.get('/Register', (req,res) =>{
    res.sendFile('index.html', {root: './static/dist'});
    // res.sendFile(path.join(__dirname, 'static', 'dist', 'index.html'));
});

            app.listen(8000, ()=>{
                console.log("Server je pokrenut na portu 8000.")
            });




