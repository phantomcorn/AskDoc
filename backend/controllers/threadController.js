const asyncHandler = require('express-async-handler')
const Thread = require("../models/threadModel")

// @route GET /api/retrieve/
const getThreads = asyncHandler(async (req, res) => {
    const threads = await Thread.find({answer : ""})
    res.status(200).json(threads)
})

// @route POST /api/retrieve/
const setThread = asyncHandler(async (req, res) => {
    if (!req.body.title || !req.body.content) {
        res.status(400)
        throw new Error("A field is currently missing")
    }

    const threadAsked = await Thread.findOne({owner : req.body.owner})

    //non-computing student can only ask a question each time
    if (threadAsked === null) {
        const thread = await Thread.create({
            title : req.body.title,
            content : req.body.content,
            owner : req.body.owner,
            answer : ""
        })
    
        res.status(200).json(thread)
    } else {
        res.status(200).send({message : "Can ask only 1 question each time"})
    }
    
  
})

// @route PUT /api/retrieve/:id
const putThread = asyncHandler(async (req,res) => {

    //find thread to update
    const threadToUpdate = await Thread.findById(req.params.id)

    if (!threadToUpdate) {
        res.status(400)
        throw new Error("Unable to find thread")
    }

    const newBody = {
        title : threadToUpdate.title,
        content: threadToUpdate.content,
        owner : threadToUpdate.owner,
        answer : req.body.answer
    }

    //update value of new thread
    const updatedThread = await Thread.findByIdAndUpdate(req.params.id, 
        newBody, {
            new: true
        })

    res.status(200).json(updatedThread)
})

// @route DELETE /api/retrieve/:id
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