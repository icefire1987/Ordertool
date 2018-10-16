var express = require('express');
var methodOverride = require('method-override')
var errorHandler = require('errorhandler')
var bodyParser = require('body-parser')

var config = require('./config');
var routes = require('./routes');
var http = require('http');
var path = require('path');
//load customers route
var orders = require('./routes/orders');
var app = express();
var connection  = require('express-myconnection');
var mysql = require('mysql');
// all environments

//app.use(express.favicon());
//app.use(express.logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());

// development only
if ('development' == app.get('env')) {
    app.use(errorHandler());
}

// Cross Origin middleware
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});


/*------------------------------------------
    connection peer, register as middleware
    type koneksi : single,pool and request
-------------------------------------------*/

app.use(
    connection(mysql,config.database,'request')
);


var routes = require('./routes/index');
var routes_orders = require('./routes/orders');

app.use('/', routes);
app.use('/api/v1/orders', routes_orders);
//routes(app);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(config.server.port);

console.log('Studio API up and working on Port:' + config.server.port);


/*//route index, hello world
app.get('/', routes.index);//route customer list
app.get('/customers', customers.list);//route add customer, get n post
app.get('/customers/add', customers.add);
app.post('/customers/add', customers.save);//route delete customer
app.get('/customers/delete/:id', customers.delete_customer);//edit customer route , get n post
app.get('/customers/edit/:id', customers.edit);
app.post('/customers/edit/:id',customers.save_edit);
app.use(app.router);
http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
*/
