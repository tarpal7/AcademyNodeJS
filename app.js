// var http = require("http");
// http.createServer(function(request,response){
//
//     response.end("response from giNodeJS!");
//
// }).listen(3000, "127.0.0.1",function(){
//     console.log("Server listining on port 3000");
// });


var nodePath = process.argv[0];
var appPath = process.argv[1];
var dataIn = process.argv[2];


console.log("nodePath: " + nodePath);
console.log("appPath: " + appPath);
console.log("data: " + dataIn);


var fs = require("fs");
var breakLine = require('os').EOL;

fs.appendFile("data.txt", breakLine + dataIn, function(error){
    if(error) throw error;
    console.log("File writing completed. File contents:");
    var data = fs.readFileSync("data.txt", "utf8");
    console.log(data);
});