const asyncHandler = require('express-async-handler')
const Account = require("../models/accountModel")
const Token = require("../models/tokenModel");
const sendEmail = require("../utils/sendEmail");
var bcrypt = require('bcrypt');

// @route POST /api/accounts/signup
const signup = asyncHandler(async (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.status(400).send({message: "A field is currently missing"})
        throw new Error("A field is currently missing")
    }

    const {name,email,password,computing,phone} = req.body

    let user = await Account.findOne({email: email})
    if(user) {
        res.status(400).send({message: "User already registered"})
    } else {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const account = new Account({
            name,
            email, 
            password: hashedPassword,
            computing,
            phone
        })
        account.save(err => {
            if (err) {
                res.status(400).send(err)
            } else {
                res.status(200).send({
                    name : name,
                    email: email, 
                    password: hashedPassword, 
                    computing: computing,
                    phone : phone
                })
            }
        })
    }
})

// @route POST /api/accounts/login
const login = asyncHandler(async (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.status(400).send({message: "A field is currently missing"})
        throw new Error("A field is currently missing")
    }

    const {email,password} = req.body

    let user = await Account.findOne({email: email})
    if(user) {
        if(await bcrypt.compare(password,user.password)) {
            res.status(200).send({email: email, password: user.password, computing: user.computing})
        } else {
            res.status(400).send({message: "Incorrect password"})
        }
    } else {
        res.status(400).send({message: "User not registered"})
    }
})

const updateEmail = asyncHandler(async (req, res) => {
    if (!req.body.email) {
        res.status(400).send({message: "A field email is currently missing"})
        throw new Error("A field is currently missing")
    }

    if (!req.body.password) {
        res.status(400).send({message: "A field password is currently missing"})
        throw new Error("A field is currently missing")
    }

    if (!req.body.newemail) {
        res.status(400).send({message: "A field newemail is currently missing"})
        throw new Error("A field is currently missing")
    }

    const {email,password,newemail} = req.body

    let user = await Account.findOne({email: email});
    if (user) {
        if(await bcrypt.compare(password, user.password)) {

            let user = await Account.findOne({email: newemail});
            if (!user) {
                let updatedUser = await Account.updateOne({email: email}, {$set: {email: newemail}})
                if (updatedUser) {
                    res.status(200).send({email: newemail, password: updatedUser.password, computing: updatedUser.computing})
                } else {
                    res.status(500).send({message: "Failed to update email"})
                }
            } else {
                res.status(400).send({message: "User email taken"})
            }
        } else {
            res.status(400).send({message: "Incorrect password"})
        }
    } else {
        res.status(400).send({message: "User email not registered"})
    }
})

const updatePassword = asyncHandler(async (req, res) => {
    if (!req.body.email || !req.body.password || !req.body.newpassword) {
        res.status(400).send({message: "A field is currently missing"})
        throw new Error("A field is currently missing")
    }

    const {email,password,newpassword} = req.body

    let user = await Account.findOne({email: email});
    if (user) {
        if(await bcrypt.compare(password, user.password)) {
            let updatedUser = await Account.updateOne({email: email}, {$set: {password: newpassword}})
            if (updatedUser) {
                res.status(200).send({email: email, password: updatedUser.password, computing: updatedUser.computing})
            } else {
                res.status(500).send({message: "Failed to update password"})
            }
        } else {
            res.status(400).send({message: "Incorrect password"})
        }
    } else {
        res.status(400).send({message: "User email not registered"})
    }
})

const getAsker = asyncHandler(async (req, res) => {

    const {email} = req.query;

    if (!email) {
        res.status(400).send({message: "A field is currently missing"})
        throw new Error("A field is currently missing")
    }
    
    let user = await Account.findOne({email: email});

    if (user) {
        res.status(200).send({name : user.name, email: email, phone : user.phone})
    } else {
        res.status(400).send({message: "User email not registered"})
    }
})

module.exports = {
    signup, login, updateEmail, updatePassword, getAsker
}