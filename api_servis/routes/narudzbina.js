const express = require("express");
const { sequelize, Oprema, Narudzbina, Status, StavkaNarudzbine} = require("../models");
const route = express.Router();
const jwt = require('jsonwebtoken');

function authToken(req, res, next) {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
	if (token == null) return res.status(401).json({ msg: "Error: null token" });
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
	   if (err) return res.status(403).json({ msg: err });
	   req.user = user;
	   next();
	});
  } 

route.use(express.json());
route.use(express.urlencoded({extended:true}));
route.use(authToken);

route.get("/", async (req, res) => {
    try{
     const narudzbine = await Narudzbina.findAll(({
          include:{ 
               model: Status,
               as: 'status',
               required: true
          }
  }));
     return res.json(narudzbine);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });

 route.get("/:id", async (req, res) => {
    try{
     const narudzbina = await Narudzbina.findByPk(req.params.id, ({
          include:{ 
                model: Oprema,
                as: 'oprema',
                required: false,
                through: {attributes: []}
        }
     })); return res.json(narudzbina); 
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });
 
 
 route.post("/", async (req, res) => {
    try{
          const novi = await Narudzbina.create(req.body);
          novi.save();
          return res.json(novi);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });
 
 
 route.put("/:id", async (req, res) => {
    try{
          const narudzbina = await Narudzbina.findByPk(req.params.id);
          narudzbina.status_id = req.body.status_id;
          console.log(req);
          narudzbina.save();
          return res.json(narudzbina);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });
 
 
 route.delete("/:id", async (req, res) => {
    try{
          const narudzbina = await Narudzbina.findByPk(req.params.id);
          narudzbina.destroy();
          return res.json( narudzbina.id );
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });

module.exports = route;