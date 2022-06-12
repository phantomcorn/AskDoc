const express = require("express");
const router = express.Router();
const Account = require("../models/accountModel");
const {signup, login, updateemail, updatepassword} = require('../controllers/accountController');

router.post("/signup", signup);
router.post("/login", login);
// router.post("/reset-password", resetpassword);
router.post("/update-email", updateemail);
router.post("/update-password", updatepassword);

module.exports = router;