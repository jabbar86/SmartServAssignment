var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var cors = require('cors')
var database = require('./database');
const data = require('./data');
const product = require('./routes/productRoute');
app.use(bodyParser.json()); // handle application/json forms

// handle application/x-www-form-urlencoded forms
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));
app.use(cors());

app.get('/', function (req, res) {

    console.log("Welcome to Smart Serv.")
    res.send('Welcome to Smart Serv-> ')
  })
app.use('/product', product);

app.listen(process.env.PORT || 3001, () => {
    console.log("started web process at Port 3001");
});