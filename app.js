var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));


//Mongoose model config
var blogSchema = new mongoose.Schema({
   title: String,
   image: String,
   body: String,
   created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);


//RESTful Routes

// Blog.create({
//     title: "LOL",
//     image: "https://unsplash.com/?photo=hVF_04fzKO4",
//     body: "Image test astyasajdkjas test"
// })


//Landing Page///
////////////////////////////////////////////////////////////////////////////////////////


app.get("/", function(req,res){
            res.render("blogApp");         
});

////////////////////////////////////////////////////////////////////////////////////////


//Index///
////////////////////////////////////////////////////////////////////////////////////////


app.get("/blogs", function(req,res){
    Blog.find({}, function(err,blogs){
       if(err){
           console.log(err);
       } 
       else {
            res.render("index",{blogsIndexPage: blogs});         
       }
    });
});


///////////////////////////////////////////////////////////////////////////////////////

//New///
////////////////////////////////////////////////////////////////////////////////////////

app.get("/blogs/new", function(req, res) {
    res.render("new.ejs");
});

////////////////////////////////////////////////////////////////////////////////////////

//Create///
////////////////////////////////////////////////////////////////////////////////////////

app.post("/blogs", function(req,res){

Blog.create(req.body.blog, function(err, newBlog){
    if(err){
        res.render("new");
    }
    else {
        res.redirect("/blogs");
    }
});
    
});

////////////////////////////////////////////////////////////////////////////////////////


//SHow Route///
////////////////////////////////////////////////////////////////////////////////////////


app.get("/blogs/:id", function(req, res) {
    Blog.findById(req.params.id, function(err,foundId){
       if(err){
           res.redirect("/blogs");
       } 
       else {
        res.render("show", {blogData: foundId});       
       }
    });
    
});


////////////////////////////////////////////////////////////////////////////////////////
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Blog server standby");
    console.log("Blog server started");
});