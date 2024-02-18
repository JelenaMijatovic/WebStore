const express = require("express");
const { sequelize, Oprema, OpremaTag, Tag} = require("../models");
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
Oprema.belongsToMany(Tag, { through: 'OpremaTags', sourceKey: 'id', targetKey: 'id', onDelete: 'cascade'});
Tag.belongsToMany(Oprema, { through: 'OpremaTags', sourceKey: 'id', targetKey: 'id', onDelete: 'cascade' });

route.get("/", async (req, res) => {
    try{
     const tags = await Tag.findAll();
        return res.json(tags);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });

 route.get("/:id", async (req, res) => {
    try{
     const tag = await Tag.findByPk(req.params.id);
        return res.json(tag);   
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
          const tag = await Tag.create(req.body);
          tag.save();
          return res.json(tag);
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
          const tag = await Tag.findByPk(req.params.id);
          tag.naziv = req.body.naziv;
          tag.save();
          return res.json(tag);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });
 
 
 route.delete("/:id", async (req, res) => {
    try{
          const tag = await Tag.findByPk(req.params.id);
          await OpremaTag.destroy({
               where: {
                    TagId: tag.id
               }
          });
          tag.destroy();
          return res.json( tag.id );
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });

module.exports = route;
