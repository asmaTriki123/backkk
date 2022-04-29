const express = require('express');
const routes = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Reservation = require('../models/Reservation');
const { Token } = require('../models/Token');
const { type } = require('express/lib/response');
const {auth} = require('../middlewares/auth');
const res = require('express/lib/response');
const user=require ("../models/Utilisateurs")


// ajouter une réservation

routes.post('/addres', async(req, res)=>{



    try {
      let reserv= new Reservation({
        namestation:req.body.namestation,
        date_heure:req.body.date_heure,
        marque_vehicule: req.body.marque_vehicule,
        Nature_vehicule: req.body.Nature_vehicule
  
      })
      reserv.Utilistauer=req.body.Utilistauer
      
        let reserva=await reserv.save();
console.log(reserv.Utilistauer)
      await user.updateOne(
       { _id:req.body.Utilistauer},
        {
            $addToSet: { reservation: reserva._id },
          },
          { new: true }

      )
       res.status(201).json({message: " Reservaionajouter aec succes"}) 
    } catch (error) {
        console.log(error.message);
    
    }
    })

// supprimer une réservation
    routes.delete('/deleteres/:id', async (req, res)=>{

        try {
            await Reservation.deleteOne({_id: req.params.id})
            res.status(201).json({message:"resrvation supermer avec succes"});
        } catch (error) {
            console.log(error.message);
        }
        
        
        })

        
    module.exports = routes;

    // get  une station  by name

    routes.get('/getname/:namestation', async ( req, res)=>{

        try {
            
        const oneComt = await Reservation.find({namestation:req.params.namestation}).populate("Utilistauer");
        res.status(201).json(oneComt);
        
        } catch (error) {
          console.log(error.message);  
        }
        
        
        
        })


    routes.get("/getuser/:id",async(req,res)=>{
            try {
                let getuser= await user.findById(req.params.id).populate("reservation");
            delete  getuser.MPass 
                res.status(200).send(getuser)
            } catch (error) {
                console.log(error);
            }
        })