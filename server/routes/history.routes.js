const Router = require("express");
const History = require("../models/History")
const User = require("../models/User")
const jwt = require("jsonwebtoken");
const router = new Router();
const authMiddleware = require('../middleware/auth.middleware')

router.post('/request',
    async (req,res)=>{
        try {

            const {kind,right,length,email,result,date} = req.body;
            const user = await User.findOne({email});
            const  row = new History({
                userId:user.id,
                username:email,
                kind:kind,
                rightAnswers:right,
                totalAnswers:length,
                result: result,
                date:date
            });
            await row.save();
            return  res.json({
                message:"row was wrote",
                id: row._id
            });

        } catch (e) {
            res.send({message:"Server error",e})
        }
    })

router.post('/response',
    async (req,res)=>{
        try {
            const row = await History.find({userId:req.body.id})

            return res.json({
                   response:row
            })

        } catch (e) {
            res.send({message:"Server error",e:e.response})
        }
    })

router.post('/range',
    async (req,res)=>{
        try {
            const data = await History.find();

            return res.json({
                response:data
            })

        } catch (e) {
            res.send({message:"Server error",e:e.response})
        }
    })
module.exports = router;