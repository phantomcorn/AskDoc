const express = require("express");
const router = express.Router();
const Thread = require("../models/threadModel");
const {getThreads, setThread, putThread, deleteThread} = require('../controllers/threadController');
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

router.post("/", setThread);

router.get("/", getThreads);

router.put("/:id", putThread);

router.delete("/:id", deleteThread);

module.exports = router;