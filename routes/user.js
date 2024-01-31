const express = require("express")
const _ = require("lodash")
const bcrypt = require("bcrypt")
const {validateUser} = require("../validator")
const User = require("../models/User")

const router = express.Router()

router.post("/", async(req, res)=>{
    const {error} = validateUser(req.body)
    if (error) {
        return res.send(error.details[0].message)
    }

    let email = await User.findOne({email: req.body.email})
    if (email) {
        return res.status(400).send("exist")
    }

    let username = await User.findOne({username: req.body.username})
    if (username) {
        return res.status(400).send("exist")
    }

    try{
        let user = new User(_.pick(req.body, ['username', 'email', 'password']))
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
        await user.save()
        res.send(_.pick(user, ['username', 'email']))
    }catch(err){
        res.status(500).send("Server Error")
    }
})

module.exports = router 
