const express = require("express");
const { sequelize, Oprema, Kategorija} = require("../models");
const route = express.Router();
const Joi = require('joi');
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
     const kategorije = await Kategorija.findAll();
        return res.json(kategorije);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });

 route.get("/:id", async (req, res) => {
    try{
        const kategorija = await Kategorija.findByPk(req.params.id);
        return res.json(kategorija);  
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });
 
 
 route.post("/", async (req, res) => {
    try{
          const shema = Joi.object().keys({
               naziv: Joi.string().trim().min(1).max(25).required(),
          });
          const {error, succ} = shema.validate(req.body);
          if(error){
                    res.send("Greska: " + error.details[0].message);
                    return;
          }
          const kategorija = await Kategorija.create(req.body);
          kategorija.save();
          return res.json(kategorija);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });
 
 
 route.put("/:id", async (req, res) => {
    try{
     const shema = Joi.object().keys({
          naziv: Joi.string().trim().min(1).max(25).required(),
     });
     const {error, succ} = shema.validate(req.body);
     if(error){
               res.send("Greska: " + error.details[0].message);
               return;
     }
          const kategorija = await Kategorija.findByPk(req.params.id);
          kategorija.naziv = req.body.naziv;
          kategorija.save();
          return res.json(kategorija);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });
 
 
 route.delete("/:id", async (req, res) => {
    try{
          const kategorija = await Kategorija.findByPk(req.params.id);
          const oprema = await Oprema.findAll({
               where: {
                    kategorija_id: kategorija.id
               }
          });
          console.log(oprema.length);
          if (oprema.length == 0) {
               kategorija.destroy();
               return res.json( kategorija.id );
          } else {
               res.status(500).json({ error: "Kategorija je vezana za postojecu opremu"});
          }
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });

module.exports = route;