var express = require("express"),
	app = express(),
	bodyParser = require("body-parser");

// including the routes
var todoRoutes = require("./routes/todos");

// including body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
//__dirname refers to the directory where 
// the node app is starting from.
app.use(express.static(__dirname+ "/views"));
app.use(express.static(__dirname+"/public"));
// root route
app.get("/", function(req,res){
	res.sendFile("index.html");
});
// routes for /api/todos
app.use("/api/todos", todoRoutes)

app.listen(3000, function(){
	console.log("The server has started!");
})