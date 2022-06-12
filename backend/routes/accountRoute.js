const express = require("express");
const router = express.Router();
const Account = require("../models/accountModel");
// const {signup, login, logout, resetpassword, updateemail, updatepassword} = require('../controllers/accountController');
const {signup, login, updateemail, updatepassword} = require('../controllers/accountController');

/*
router.post((req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const newThread = new Thread({
        title,
        content
    });

    newThread.save();
}) 
*/
// const hostSignup = `${domain}/api/accounts/signup`;
// const hostLogin = `${domain}/api/accounts/login`;
// const hostLogout = `${domain}/api/accounts/logout`;
// const hostResetPassword = `${domain}/api/accounts/reset-password`;
// const hostUpdateEmail = `${domain}/api/accounts/update-email`;
// const hostUpdatePassword = `${domain}/api/accounts/update-password`;

router.post("/signup", signup);
router.post("/login", login);
// router.post("/reset-password", resetpassword);
router.post("/update-email", updateemail);
router.post("/update-password", updatepassword);

module.exports = router;