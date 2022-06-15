const express = require("express");
const router = express.Router();
const Thread = require("../models/threadModel");
const {getThreads, setThread, putThread, deleteThread, returnThread} = require('../controllers/threadController');

router.post("/", setThread);

router.get("/", getThreads);

router.put("/:id", putThread);

router.delete("/:id", deleteThread);

router.put("/return/:id", returnThread);

module.exports = router;