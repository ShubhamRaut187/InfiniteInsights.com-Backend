const {Router} = require('express');

// Data Model
const {Usermodel} = require('../DataModels/User.model') 

// Middlewares
const {Authenticate} = require('../Middlewares/Authenticate')
const UserRoutes = Router();

// Get Single User
UserRoutes.get('/v1/:id',Authenticate,async(req,res)=>{
    const {id} = req.params;
    try {
        const User = await Usermodel.findOne({_id:id});
        res.status(200).send({'Message':'Here is your user','User':User});
    } catch (error) {
        console.log(error);
        res.status(500).send({'Message':'Internal Server Error! Please try again.','error':error})   
    }
})

// Update User
UserRoutes.patch('/v1/update/:id',Authenticate,async(req,res)=>{
    const {id} = req.params;
    try {
        const Data = req.body;
        const Updated = await Usermodel.findOneAndUpdate({_id:id},Data,{new:true});
        res.status(202).send({'Message':'User updated successfully.','User':Updated});
    } catch (error) {
        console.log(error);
        res.status(500).send({'Message':'Internal Server Error! Please try again.','error':error})   
    }
})

// Delete User
UserRoutes.delete('/v1/delete/:id',Authenticate,async(req,res)=>{
    const {id} = req.params;
    try {
        const Deleted = await Usermodel.findOneAndDelete({_id:id});
        res.status(200).send({'Message':'User deleted !','User':Deleted});
    } catch (error) {
        console.log(error);
        res.status(500).send({'Message':'Internal Server Error! Please try again.','error':error})  
    }
})


module.exports = {
    UserRoutes
}