var express = require('express');
var moment = require('moment');
var bodyParser = require('body-parser');
var cors = require('cors');
var fs = require('fs');
var app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(cors());

var bugs = [];

app.get('/api/bugs', function (req, res) {
  res.jsonp(bugs.filter(function(bug) {
  	return bug.data >= moment().add(-1, 'hours').format("YYYYMMDDHHmmss");
  }));

});
app.get('/api/novos', function (req, res) {
  var data = req.query.ultimo;
  var novosBugs = bugs.filter(function(bug) {
  	return bug.data > data;
  })
  res.jsonp(novosBugs.length);
});
app.post('/api/bug', function (req, res){
	req.body.data = moment().format("YYYYMMDDHHmmss");
	bugs.unshift(req.body);
	res.send();
});

app.listen(8090, function () {
  console.log('WEB API SERVER rodando na porta: ', 8090);
});
