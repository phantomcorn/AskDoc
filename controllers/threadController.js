const asyncHandler = require('express-async-handler')


// @route GET /api/retrieve/
const getThread = asyncHandler(async (req, res) => {
    res.status(200).json({message : "get message"})
})

// @route POST /api/retrieve/
const setThread = asyncHandler(async (req, res) => {
    console.log(req.body)
    
    if (!req.body.text) {
        res.status(400)
        throw new Error("Please add a field")
    } else {
        res.status(200).json({message : "set message"})
    }
  
})

// @route PUT /api/retrieve/:id
const putThread = asyncHandler(async (req,res) => {
    res.status(200).json({message : `update goal ${req.params.id}`})
})

// @route DELETE /api/retrieve/:id
const deleteThread = asyncHandler(async (req,res) => {
    res.status(200).json({message : `delete message ${req.params.id}`})
})


module.exports = {
    getThread, setThread, putThread, deleteThread
}