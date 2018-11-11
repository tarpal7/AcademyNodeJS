var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");

var app = express();
var jsonParser = bodyParser.json();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.get("/gallery", function(req, res){


    var content = fs.readFileSync("gallery.json", "utf8");
    var items = JSON.parse(content);
    res.send(items);
});


app.get("/gallery/:id", function(req, res){

    var id = req.params.id;
    var content = fs.readFileSync("gallery.json", "utf8");
    var items = JSON.parse(content);
    var item = null;

    for(var i=0; i<items.length; i++){
        if(items[i].id==id){
            item = items[i];
            break;
        }
    }

    if(item){
        res.send(item);
    }
    else{
        res.status(404).send();
    }
});



app.post("/gallery", jsonParser, function (req, res) {

    if(!req.body) return res.sendStatus(400);

    var itemTitle = req.body.title;
    var itemUrl = req.body.url;
    var item = {title: itemTitle, url: itemUrl};

    var data = fs.readFileSync("gallery.json", "utf8");
    var items = JSON.parse(data);
    var id = Math.max.apply(Math,items.map(function(o){return o.id;}))

    item.id = id+1;

    items.push(item);
    var data = JSON.stringify(items);

    fs.writeFileSync("gallery.json", data);
    res.send(item);
});



app.delete("/gallery/:id", function(req, res){
    var id = req.params.id;
    var data = fs.readFileSync("gallery.json", "utf8");
    var items = JSON.parse(data);
    var index = -1;

    for(var i=0; i<items.length; i++){
        if(items[i].id==id){
            index=i;
            break;
        }
    }
    if(index > -1){

        var item = items.splice(index, 1)[0];
        var data = JSON.stringify(items);
        fs.writeFileSync("gallery.json", data);

        res.send(item);
    }
    else{
        res.status(404).send();
    }
});



app.put("/gallery", jsonParser, function(req, res){

    if(!req.body) return res.sendStatus(400);

    var itemId = req.body.id;
    var itemName = req.body.name;
    var itemAge = req.body.age;

    var data = fs.readFileSync("gallery.json", "utf8");
    var items = JSON.parse(data);
    var item;
    for(var i=0; i<items.length; i++){
        if(items[i].id==itemId){
            item = items[i];
            break;
        }
    }

    if(item){
        item.url = itemUrl;
        item.title = itemTitle;
        var data = JSON.stringify(items);
        fs.writeFileSync("gallery.json", data);
        res.send(item);
    }
    else{
        res.status(404).send(item);
    }
});


app.listen(3000, function(){
    console.log("server listining...");
});