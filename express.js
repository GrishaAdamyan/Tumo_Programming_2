var express = require("express");
var app = express();

app.listen(3000, function(){
    console.log("Example is running on port 3000");
});

/*
app.get("/", function(req, res){
    res.send("Hello world");
});
*/

/*
app.get("/", function(req, res){
    res.send("<h1>Hello world</h1>");
});
*/

/*
app.get("/news", function(req, res){
    res.send("<h1>Hello world</h1>");
});
*/


app.get("/:id", function(req, res){
    var name = req.params.id;
    res.redirect("https://www.google.com/search?q=" + name);
});



