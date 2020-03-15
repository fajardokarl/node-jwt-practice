const mongoose = require('mongoose')
const mongoDB = 'mongodb://localhost:27017/node_rest_api'
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('connected')).catch(err => console.log(err))
mongoose.Promise = global.Promise