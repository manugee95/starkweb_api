const express = require("express")
const bcrypt = require("bcrypt")
const {validateLogin} = require("../validator")
const User = require("../models/User")

const router = express.Router()

router.post("/", async(req, res)=>{
    const {error} = validateLogin(req.body)
    if (error) {
        return res.send(error.details[0].message)
    }

    let user = await User.findOne({email: req.body.email})
    if (!user) {
        return res.status(400).send("Invalid email or password")
    }

    try{
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if (!validPassword){
            return res.status(400).send("Invalid email or password")
        }

        const token = user.generateAuthToken()
        res.status(200).json({token})
    }catch(err){
        res.status(500).send("Server Error...")
    }
})

module.exports = router 
