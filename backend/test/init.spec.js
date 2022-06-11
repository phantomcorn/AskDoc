const mongoUnit = require('mongo-unit')
const mongoose = require("mongoose");

mongoUnit.start().then(() => {
  console.log('fake mongo is started: ', mongoUnit.getUrl())
  process.env.DATABASE_URL = mongoUnit.getUrl() // this var process.env.DATABASE_URL = will keep link to fake mongo
  run() // this line start mocha tests
})

after(() => {
  console.log('stop')
  mongoose.disconnect()
  return mongoUnit.stop()
})