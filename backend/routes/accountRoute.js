const express = require("express");
const router = express.Router();
const Account = require("../models/accountModel");
const {signup, login, updateEmail, updatePassword, getAsker} = require('../controllers/accountController');

router.post("/signup", signup);
router.post("/login", login);
// router.post("/reset-password", resetpassword);
router.post("/update-email", updateEmail);
router.post("/update-password", updatePassword);
router.get("/answer", getAsker)

module.exports = router;