const express = require("express");
const { sequelize, Oprema, Narudzbina, Status, User, StavkaNarudzbine} = require("../models");
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
Oprema.belongsToMany(Narudzbina, { through: 'StavkaNarudzbine', sourceKey: 'id', targetKey: 'id', onDelete: 'cascade'});
Narudzbina.belongsToMany(Oprema, { through: 'StavkaNarudzbine', sourceKey: 'id', targetKey: 'id', onDelete: 'cascade' });

route.get("/", async (req, res) => {
    try{
     const narudzbine = await Narudzbina.findAll(({
          include:[{ 
               model: Status,
               as: 'status',
               required: true
          }, {
               model: User,
               as: 'user',
               required: true,
             }]
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
          include:[{ 
                model: Oprema,
                as: 'oprema',
                required: false,
                through: {attributes: []}
        }, {
          model: User,
          as: 'user',
          required: true,
        }]
     })); return res.json(narudzbina); 
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });
 
 
 route.post("/", async (req, res) => {
    try{
     const shema = Joi.object().keys({
          vreme_narucivanja: Joi.date().required(),
          zakazano_vreme: Joi.date().required(),
          status_id: Joi.string().min(1).required(),
          adresa: Joi.string().trim().min(5).max(50).required(),
          telefon: Joi.string().trim().min(8).required(),
          user_id: Joi.string().min(1).required(),
          oprema: Joi.string().min(1).required()
    });
    const {error, succ} = shema.validate(req.body);
    if(error){
     console.log(error);
          res.send("Greska: " + error.details[0].message);
          return;
    }
          const novi = await Narudzbina.create(req.body);
          for (let oprema1 in req.body.oprema) {
               newOprema = await Oprema.findByPk(parseInt(req.body.oprema[oprema1]));
               await novi.addOprema(newOprema);
             }
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
          id: Joi.string().min(1).required(),
          status_id: Joi.string().min(1).required()
    });
    const {error, succ} = shema.validate(req.body);
    if(error){
     console.log(error);
          res.send("Greska: " + error.details[0].message);
          return;
    }
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
          await StavkaNarudzbine.destroy({
               where: {
                    NarudzbinaId: narudzbina.id
               }
          });
          narudzbina.destroy();
          return res.json( narudzbina.id );
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });

module.exports = route;