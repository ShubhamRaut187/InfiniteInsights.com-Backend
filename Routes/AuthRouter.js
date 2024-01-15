const {Router} = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const {Usermodel} = require('../DataModels/User.model');

// Middlewares
const {PasswordCheck} = require('../Middlewares/PasswordCheck')
const AuthRoutes =  Router();

// Routes
// SignUp
AuthRoutes.post('/v1/signup',PasswordCheck,async(req,res)=>{
    const {Name,Gender,Phone,DOB,Email,Password,Avatar} = req.body;
    try {
        const Hashed = bcrypt.hashSync(Password,8);
        const New_User = new Usermodel({
            Name,
            Gender,
            Phone,
            DOB,
            Email,
            Password:Hashed,
            Avatar
        })
        await New_User.save();
        res.status(201).send({'Message':'Signup Successful...!'});
    } catch (error) {
        res.status(500).send({'Message':'Internal Server Error! Please try again.','error':error})
    }
})

// Login 
AuthRoutes.post('/v1/login',async(req,res)=>{
    const {Email,Password} = req.body;
    console.log(Email,Password);
    try {
        const User = await Usermodel.findOne({Email});
        if(!User){
            res.status(404).send({'Message':'Please signup...!'});
            return
        }
        const Hash = User.Password;
        const Correct_Password = bcrypt.compareSync(Password,Hash);
        if(Correct_Password){
            const Token = jwt.sign({UserID:User._id},'UserToken');
            const UserInfo = {
                Name:User.Name,
                Email:User.Email,
                Avatar:User.Avatar,
                Gender:User.Gender,
                Phone:User.Phone,
            }
           res.status(200).send({'Message':'Login Successful...!','User':UserInfo,'Token':Token});
        }
        else{
            res.status(401).send({'Message':'Wrong Password.'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({'Message':'Internal Server Error! Please try again.','error':error})
    }
})

module.exports = {
    AuthRoutes
}