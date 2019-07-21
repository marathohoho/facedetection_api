const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const bcrypt = require('bcrypt');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = require('./config/database');
const saltRounds = 10;

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    db.users.findAll()
        .then(users => {
            res.send(users);
        })
})

//REST constrollers

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)});

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt, saltRounds)});

app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)});

app.put('/image/:id', (req, res) => {image.handleImage(req, res, db)});

app.post('/imageURL/:id', (req, res) => {image.handleApiUrl(req, res)});

app.listen(4000, ()=> {
    console.log("server is running on port 4000")
});


