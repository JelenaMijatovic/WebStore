const express = require('express');
const { sequelize, Oprema, Kategorija, OpremaTag, Tag, StavkaNarudzbine, Narudzbina } = require("./models");
const cors = require("cors");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

function authToken(req, res, next) {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
	if (token == null) return res.status(401).json({ msg: err });
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
	   if (err) return res.status(403).json({ msg: err });
	   req.user = user;
	   next();
	});
  }  

const corsOptions = {
	origin: ['http://localhost:8000', 'http://localhost:8080', 'http://127.0.0.1:8000']
  };
  app.use(cors(corsOptions));
  
app.get('/', (req, res) => {
    res.send('Hello from REST API service');
});

const opremaRoutes = require("./routes/oprema.js");
app.use("/oprema", opremaRoutes);

const kategorijaRoutes = require("./routes/kategorija.js");
app.use("/kategorija", kategorijaRoutes);

const narudzbinaRoutes = require("./routes/narudzbina.js");
app.use("/narudzbina", narudzbinaRoutes);

const tagRoutes = require("./routes/tag.js");
app.use("/tag", tagRoutes);

app.listen({ port:9000 }, async () => {
	console.log("Started server on localhost:8000");
	await sequelize.sync();
	console.log("DB synced");
});


