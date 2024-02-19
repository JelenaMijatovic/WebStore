const express = require('express');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const cors = require("cors");

const app = express();

function getCookies(req) {
    if (req.headers.cookie == null) return {};


    const rawCookies = req.headers.cookie.split('; ');
    const parsedCookies = {};


    rawCookies.forEach( rawCookie => {
        const parsedCookie = rawCookie.split('=');
        parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });


    return parsedCookies;
};

function authToken(req, res, next) {
    const cookies = getCookies(req);
    const token = cookies['token'];
    if (token == null) return res.redirect(301, '/admin/login');
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.redirect(301, '/admin/login');
        req.user = user;
        next();
    });
}

const corsOptions = {
	origin: ['http://localhost:8000', 'http://localhost:8080', 'http://127.0.0.1:8000']
  };
app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, 'static', 'dist')));
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static/admin', 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'static/admin', 'login.html'));
});

app.get('/admin/register', (req, res) => {
    res.sendFile('register.html', { root: './static/admin' });
});


app.get('/admin/login', (req, res) => {
    res.sendFile('login.html', { root: './static/admin' });
});


app.get('/admin', authToken, (req, res) => {
    res.sendFile('index.html', { root: './static/admin' });
});


app.get("/oprema", (req, res) => {
    oprema = [];
    fs.readFile('oprema.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send({ error: "Greška" });
            return;
        }
        const redovi = data.split('\n');
        for (let i=0; i<redovi.length; i++) {
            let obj = JSON.parse(JSON.stringify(redovi[i]));
            oprema.push(obj);
        }
        res.json(oprema);
    });
})
    

app.listen(8000);

