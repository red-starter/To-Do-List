//set up
var express=require('express')
var app=express()
//relate our app w/ express
var mongoose=require('mongoose')
//create mongoose models for mongodb
var morgan = require('morgan')
//log requests to the console
var bodyParser = require('body-parser')
//pull information from the html POST
var methodOverride = require('method-override')
//simulate DELETE and PUT
var Post = require('./models/post')
// fetch model data

app.use(express.static(__dirname + '/assets'))
//set the static files location /public/img will be /img for users
app.use(morgan('dev'))
//log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}))
//parse application/x-www-form-urlencoded
app.use(bodyParser.json())
//parse application/json
app.use(bodyParser.json({type:'application/vn.api+json'}))
//pars application/vnd.api+json as json
app.use(methodOverride())
//start listening

//routes

//api
//get all posts
app.get('/api/posts',function(req,res){
//use mongoose to get all posts in the database
    Post.find(function(err,posts){
    //    if there is an error, send the error, nothing after
    //    res.sen(err) gets executed
        if(err) res.send(err)
    //  return all posts in JSON format
        res.json(posts)
    })
})
//create and send back all posts after creation
app.post('/api/posts',function(req,res){

//create a _todo,information comes from AJAX request from Angular
    Post.create({
        text: req.body.text,
        // important:req.body.important,
        done: false
    }, function(err, post){
        if (err) res.send(err)
        console.log(post)

    //    get and return all the posts after you create another
        Post.find(function(err,posts){
            if (err) res.send(err)
            res.json(posts)
        })
    })
})
//delete a _Post
app.delete('/api/posts/:post_id', function(req,res){
    Post.remove({
        _id : req.params.post_id
    }, function(err,post){
        if (err) res.send(err)
    //    get and return all posts after deleting one
        Post.find(function(err,posts){
            if (err) res.send(err)
            res.json(posts)
        })
    })
})

//application
app.get('*', function(req,res){
    res.sendfile('./assets/index.html')
//    load the single view file
//    angular handles the routing on the front-end
})

//listening section
var port=8000
app.listen(port,function(){
    console.log('app listening on port '+port)
})



