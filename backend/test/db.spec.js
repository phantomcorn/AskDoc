const expect = require('chai').expect
const mongoose = require('mongoose')
const mongoUnit = require('mongo-unit')
const Thread = require("../models/threadModel")

describe('threads collection rest api', () => {

    const testData = require('./testData/threads.json')
    before(() => mongoose.connect(process.env.DATABASE_URL))
    beforeEach(() => mongoUnit.load(testData))
    afterEach(() => mongoUnit.drop())

    it('should find all threads', async () => {

      return Thread.find()
        .then(threads => {
          expect(threads.length).to.equal(2)
          expect(threads[0].title).to.equal("For")
        })
    })
    
     
    it('should create new thread', async () => {
      return Thread.create({ 
          title: 'test-title', 
          content: "test-content" 
      })
        .then(thread => {
          expect(thread.title).to.equal("test-title")
          expect(thread.content).to.equal("test-content")
        })
          .then(() => Thread.find())
          .then(threads => {
            expect(threads.length).to.equal(3)
            expect(threads[1].title).to.equal("If")
          })
    })
     

    it('should remove thread', async () => {
    return Thread.find()
        .then(threads => threads[0])
        .then(thread => Thread.deleteOne(thread))
        .then(() => Thread.find())
        .then(threads => {
          expect(threads.length).to.equal(1)
          expect(threads[0].title).to.equal("If")
        })
    })


    it('should update thread', async () => {
      return Thread.find()
          .then(threads => threads[1])
          .then(thread => {
            expect(thread.title).to.equal("If")
            const updatedThread = {
              title : thread.title,
              content : "Updated"
            }
            //for some reason, you need the 3rd parameter
            Thread.findByIdAndUpdate(thread._id, updatedThread,(err,obj) => {})
          })
          .then(() => Thread.find())
          .then(threads => {
            expect(threads.length).to.equal(2)
            expect(threads[1].content).to.equal("Updated")
          })
    })

})