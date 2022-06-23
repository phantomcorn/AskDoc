const express = require("express");
const router = express.Router();
const Thread = require("../models/threadModel");
const {getThreads, setThread, putThread, deleteThread} = require('../controllers/threadController');

router.post("/", setThread);

router.get("/", getThreads);

router.put("/:id", putThread);

router.delete("/:id", deleteThread);

module.exports = router;