const mongoose = require('mongoose')
const { DB_URI } = process.env

mongoose.set('strictQuery', false)
mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    sslValidate: true,
  })
  .then(async() => {
    console.log('database is connected'.green)
  })
  .catch(err => {
    throw err
  })
