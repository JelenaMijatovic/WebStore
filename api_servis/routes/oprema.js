const express = require("express");
const { sequelize, Oprema, Kategorija, OpremaTag, Tag, StavkaNarudzbine} = require("../models");
const route = express.Router();
const Joi = require('joi');
const fs = require('fs');
const BP = require('body-parser');
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
          const kategorije = await Oprema.findAll(({
            include: {
                  model: Kategorija,
                  as: 'kategorija',
                  required: true
                }
          }));
          return res.json(kategorije);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });

 route.get("/:id", async (req, res) => {
    try{
          const oprema = await Oprema.findByPk(req.params.id, ({
            include:[{
                  model: Tag,
                  as: 'tagovi',
                  required: false,
                  through: {attributes: []}
          }, {
            model: Kategorija,
            as: 'kategorija',
            required: true
            }]
      }));
          return res.json(oprema);     
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });
 
 
 route.post("/", async (req, res) => {
    try{
      const shema = Joi.object().keys({
            naziv: Joi.string().trim().min(5).max(25).required(),
            opis: Joi.string().trim().min(0).required(),
            kategorija_id: Joi.string().min(1).required(),
            cena: Joi.number().greater(0).required()
      });
      const {error, succ} = shema.validate(req.body);
      if(error){
            res.send("Greska: " + error.details[0].message);
            return;
      }
          const novi = await Oprema.create(req.body);
          novi.save();
          return res.json(novi);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });
 
 
 route.put("/:id", async (req, res) => {
    try{
      const shema = Joi.object().keys({
            naziv: Joi.string().trim().min(5).max(25).required(),
            opis: Joi.string().trim().min(0).required(),
            kategorija_id: Joi.string().min(1).required(),
            cena: Joi.number().greater(0).required(),
            tagovi: Joi.string()
      });
      const {error, succ} = shema.validate(req.body);
      if(error){
            console.log(error);
            res.send("Greska: " + error.details[0].message);
            return;
      }
          const oprema = await Oprema.findByPk(req.params.id, ({
            include:{
                  model: Tag,
                  as: 'tagovi',
                  required: false,
                  through: {attributes: []}
          }
      }));
          oprema.naziv = req.body.naziv;
          oprema.opis = req.body.opis;
          oprema.cena = req.body.cena;
          oprema.kategorija_id = req.body.kategorija_id;
          let tags = [];
          for (let tag in oprema.tagovi) {
            if (!req.body.tagovi.includes(oprema.tagovi[tag].dataValues.id.toString())) {
                  oldTag = await Tag.findByPk(oprema.tagovi[tag].dataValues.id);
                  await oprema.removeTag(oldTag);
            } else {
                  tags.push(oprema.tagovi[tag].dataValues.id);
            }
          }
          tags = tags.join("");
          for (let tag in req.body.tagovi) {
            if (Number.isInteger(parseInt(req.body.tagovi[tag])) && !tags.includes(req.body.tagovi[tag])) {
                  newTag = await Tag.findByPk(parseInt(req.body.tagovi[tag]));
                  await oprema.addTag(newTag);
            }
          }
          oprema.save();
          return res.json(oprema);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });

 route.put("/promeni-cenu/:id", async (req,res)=>{
	try{
            const shema = Joi.object().keys({
                  cena: Joi.number().greater(0).required()
            });
            const {error, succ} = shema.validate(req.body);
            if(error){
                  res.send("Greska: " + error.details[0].message);
                  return;
            }
            const oprema = await Oprema.findByPk(req.params.id);
            oprema.cena = req.body.cena;
            oprema.save();
            return res.json(oprema);
	} catch(err) {
            console.log(err);
            res.status(500).json({ error: "Greska", data: err });
	}
});

 route.delete("/:id", async (req, res) => {
    try{
          const oprema = await Oprema.findByPk(req.params.id);
          await OpremaTag.destroy({
            where: {
                  OpremaId: oprema.id
            }
          });
          oprema.destroy();
          return res.json( oprema.id );
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });
 

module.exports = route;
