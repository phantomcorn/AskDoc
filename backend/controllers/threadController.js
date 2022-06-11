const asyncHandler = require('express-async-handler')
const Thread = require("../models/threadModel")

// @route GET /api/retrieve/
const getThreads = asyncHandler(async (req, res) => {
    const threads = await Thread.find()
    res.status(200).json(threads)
})

// @route POST /api/retrieve/
const setThread = asyncHandler(async (req, res) => {
    if (!req.body.title || !req.body.content) {
        res.status(400)
        throw new Error("A field is currently missing")
    }

    const thread = await Thread.create({
        title : req.body.title,
        content : req.body.content
    })

    res.status(200).json(thread)
    
  
})

// @route PUT /api/retrieve/:id
const putThread = asyncHandler(async (req,res) => {

    //find thread to update
    const threadToUpdate = await Thread.findById(req.params.id)

    if (!threadToUpdate) {
        res.status(400)
        throw new Error("Unable to find thread")
    }

    //update value of new thread
    const updatedThread = await Thread.findByIdAndUpdate(req.params.id, 
        req.body, {
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