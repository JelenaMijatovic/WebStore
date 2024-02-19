const express = require("express");
const { sequelize, User, Narudzbina} = require("../models");
const route = express.Router();
const Joi = require('joi');
const fs = require('fs');
const BP = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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
          const users = await User.findAll();
          return res.json(users);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });

 route.get("/:id", async (req, res) => {
    try{
          const user = await User.findByPk(req.params.id, ({
            include:{
                  model: Narudzbina,
                  as: 'narudzbine',
                  required: false
          }
      }));
          return res.json(user);     
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });
 
 
 route.post("/", async (req, res) => {
    try{
      const shema = Joi.object().keys({
            username: Joi.string().trim().min(5).max(25).required(),
            password: Joi.string().trim().min(5).max(25).required(),
            admin: Joi.bool().required(),
            email: Joi.string().trim().min(5).max(25).required()
      });
      const {error, succ} = shema.validate(req.body);
      if(error){
            res.send("Greska: " + error.details[0].message);
            return;
      }
          const novi = await User.create(req.body);
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
            username: Joi.string().trim().min(5).max(25).required(),
            admin: Joi.bool().required(),
            email: Joi.string().trim().min(5).max(25).required()
      });
      const {error, succ} = shema.validate(req.body);
      if(error){
            res.send("Greska: " + error.details[0].message);
            return;
      }
          const user = await User.findByPk();
          user.username = req.body.username
          user.admin = req.body.admin;
          user.email = req.body.email;
          user.save();
          return res.json(user);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });

 route.delete("/:id", async (req, res) => {
    try{
          const user = await User.findByPk(req.params.id);
          user.destroy();
          return res.json( user.id );
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });
 

module.exports = route;
