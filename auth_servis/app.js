const express = require('express');
const { sequelize, Users } = require('./models');
// const { Users } = models;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

// require('./models');
// console.log(models);
const app = express();


var corsOptions = {
    origin: 'http://127.0.0.1:8000',
    optionsSuccessStatus: 200
}


app.use(express.json());
app.use(cors(corsOptions));


app.post('/register', (req, res) => {
    const obj = {
        username: req.body.username,
        email: req.body.email,
        admin: false,
        password: bcrypt.hashSync(req.body.password, 10)
    };

    Users.create(obj) .then (rows => {
        const usr = {
            userID: rows.id,
            user: rows.username
        };
        const token = jwt.sign(usr, process.env.ACCESS_TOKEN_SECRET);
        console.log(token);
        res.json({token: token});
    }) .catch (err => res.status(500).json(err));
});


app.post('/login', (req, res) => {
    console.log('Received login request:', req.body);
    Users.findOne({where: {username: req.body.username} })
    .then (usr => {
        console.log('Found user:', usr);
        if (bcrypt.compareSync(req.body.password, usr.password)){
            console.log('Password match');
        const obj = {
            userId: usr.id,
            user: usr.username
        };
        const token = jwt.sign (obj, process.env.ACCESS_TOKEN_SECRET);
        res.json ({token: token});
    } else {
        console.log('Password does not match');
        res.status(400).json({msg: "Invalid credentials"});
    }
    })
    .catch( err =>{
        console.error('Error finding user:', err);
         res.status(500).json(err)});
});


app.listen({ port: 9001 }, async () => {
    await sequelize.authenticate();
});
