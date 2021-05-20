const Router = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const {check,validationResult} = require("express-validator");
const router = new Router();
const authMiddleware = require('../middleware/auth.middleware')

router.post('/registration',
    [
        check('email',"incorrect email").isEmail(),
        check('password','Password must be longer than 3 and shorter than 12').isLength({min:3,max:12})
    ],
    async (req,res)=>{
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({message:"incorrect request",errors});
        }

        const {email,password} = req.body;

        const candidate = await User.findOne({email});

        if (candidate){
            return res.status(400).json({message:`User with email ${email} already exist`});
        }
        const hashPassword = await bcrypt.hash(password,8)
        const  user = new User({email,password:hashPassword});
        await user.save();
        return  res.json({
            message:"Thank you for registration"
        });

    } catch (e) {
        console.log(e);
        res.send({message:"Server error"})
    }
})

router.post('/reset',
    async (req,res)=>{
        try {
            const {email} = req.body;
            const user = await User.findOne({email});
            if (!user){
                return res.status(404).json({message:"user not found"});
            }
            let num = JSON.stringify(Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000);
            const code = await bcrypt.hash(num,8);

            return res.json({
                num:num,
                code: code
            });
        } catch (e) {
            console.log(e);
            res.send({message:"Server error"})
        }
    });


router.post('/login',
    async (req,res)=>{
        try {
            const {email,password} = req.body;
            const user = await User.findOne({email});
            if (!user){
                return res.status(404).json({message:"user not found"});
            }
            const isPassValid = bcrypt.compareSync(password,user.password);

            if(!isPassValid){
                return res.status(400).json({message:"Invalid password"});
            }
            const token = jwt.sign({id:user.id},config.get("secretKey"),{expiresIn:"3h"});
            return res.json({
                token,
                user:{
                    id:user.id,
                    email:user.email
                }
            });
        } catch (e) {
            console.log(e);
            res.send({message:"Server error"})
        }
    });



router.get('/auth', authMiddleware,
    async (req,res)=>{
        try {
            const user = await User.findOne({_id:req.user.id})

            const token = jwt.sign({id:user.id},config.get("secretKey"),{expiresIn:"3h"});

            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email
                }
            })
        } catch (e) {
            console.log(e);
            res.send({message:"Server error"})
        }
    });


router.post('/edit',
    async (req,res)=>{
        try {
            const {email,oldPassword,newPassword,password} = req.body;
            const user = await User.findOne({email});
            let hashPassword;
            if (!user){
                return res.status(404).json({message:"user not found"});
            }
            if (password){
                hashPassword = await bcrypt.hash(password,8)
            }
            else{
                const isPassValid = bcrypt.compareSync(oldPassword,user.password);

                if(!isPassValid){
                    return res.status(400).json({message:"Old password isn't right "});
                }
                else if(oldPassword === newPassword){
                    return res.status(400).json({message:"You have write same passwords"});
                }
                hashPassword = await bcrypt.hash(newPassword,8)
            }

            const newUser = await User.findOneAndUpdate(
                {email:email},
                {$set:{password: hashPassword}},
                {returnOriginal:false}
                );

            const token = jwt.sign({id:user.id},config.get("secretKey"),{expiresIn:"3h"});

            return res.json({
                token,
                user:{
                    id:user.id,
                    email:user.email,
                }
            });
        } catch (e) {
            console.log(e);
            res.send({message:"Server error"})
        }
    });



module.exports = router;