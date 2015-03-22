var mongoose = require('mongoose')
//connect to local mongoDB database
mongoose.connect('mongodb://localhost/ToDo', function () {
    console.log('mongodb connected')
})
module.exports = mongoose
