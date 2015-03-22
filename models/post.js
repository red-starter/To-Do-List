// fetch database info
var db = require('../db')

//defining mongodb model
var Post = db.model('post',{
    text:String,
    // importance:Number
})

module.exports = Post
