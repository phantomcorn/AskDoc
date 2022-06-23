const asyncHandler = require('express-async-handler')
const Thread = require("../models/threadModel")

// @route GET /api/threads
const getThreads = asyncHandler(async (req, res) => {
    const threads = await Thread.find({answer : ""})
    res.status(200).json(threads)
})

// @route POST /api/threads
const setThread = asyncHandler(async (req, res) => {
    if (!req.body.title || !req.body.content) {
        res.status(400)
        throw new Error("A field is currently missing")
    }

    const threadAsked = await Thread.findOne({owner : req.body.owner})

    //non-computing student can only ask a question each time
    if (threadAsked === null) {
        const thread = await Thread.create({
            tag1 : req.body.tag1,
            tag2 : req.body.tag2,
            title : req.body.title,
            content : req.body.content,
            link : req.body.link,
            owner : req.body.owner,
            answer : "",
            lat : req.body.lat,
            lng : req.body.lng,
            askerNote : req.body.askerNote
        })
    
        res.status(200).json(thread)
    } else {
        res.status(200).send({message : "Can ask only 1 question each time"})
    }
    
  
})

// @route PUT /api/threads/:id
const putThread = asyncHandler(async (req,res) => {

    //find thread to update
    const threadToUpdate = await Thread.findById(req.params.id)

    if (!threadToUpdate) {
        res.status(400)
        throw new Error("Unable to find thread")
    }

    const updatedField = {
        answer : req.body.answer
    }

    //update value of new thread
    const updatedThread = await Thread.findByIdAndUpdate(req.params.id,updatedField)

    res.status(200).json(updatedThread)
})

// @route DELETE /api/threads/:id
const deleteThread = asyncHandler(async (req,res) => {

    //find thread to delete
    const threadToDelete = await Thread.findById(req.params.id)

    if (!threadToDelete) {
        res.status(400)
        throw new Error("Unable to find thread")
    }

    await Thread.deleteOne(threadToDelete)

    res.status(200).json({id : req.params.id})
})


module.exports = {
    getThreads, setThread, putThread, deleteThread
}