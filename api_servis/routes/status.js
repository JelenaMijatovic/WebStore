const express = require("express");
const { sequelize, Narudzbina, Status} = require("../models");
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
     const kategorije = await Status.findAll();
        return res.json(kategorije);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });

 route.get("/:id", async (req, res) => {
    try{
        const status = await Status.findByPk(req.params.id);
        return res.json(status);  
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
          const status = await Status.create(req.body);
          status.save();
          return res.json(status);
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
          const status = await Status.findByPk(req.params.id);
          status.naziv = req.body.naziv;
          status.save();
          return res.json(status);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });
 
 
 route.delete("/:id", async (req, res) => {
    try{
          const status = await Status.findByPk(req.params.id);
          const narudzbina = await Narudzbina.findAll({
               where: {
                    status_id: status.id
               }
          });
          console.log(narudzbina);
          if (Array.isArray(narudzbina)) {
               status.destroy();
               return res.json( status.id );
          } else {
               res.status(500).json({ error: "Status je vezan za postojecu narudzbinu", data: err });
          }
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });

module.exports = route;