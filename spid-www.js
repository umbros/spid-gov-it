'use strict';

process.env.NODE_ENV = 'production';


var express = require("express");
var path = require("path");
var exphbs = require('express-handlebars');
var globalizeExpress  = require('globalize-express');
var cookieParser = require('cookie-parser');
var helmet = require('helmet');
var path = require('path');
var http = require('http');
var fs = require('fs');
var favicon = require('serve-favicon');


var app = express();
app.use(favicon(path.join(__dirname,'views','assets/img','favicon.ico')));

if (process.env.EXP_APPCACHE == 'false') {
    console.log('\n\nView cache disabled, enable in production !\n\n');
    app.disable('view cache');
}

var hbs = exphbs.create({
    defaultLayout: 'template-standard',
    helpers: require('./app/helpers')
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use('/assets', express.static(__dirname + '/views/assets'));

app.use(cookieParser());
app.use(globalizeExpress({
  locales:['it', 'en', 'de'],
  defaultLocale: 'it',
  cookieName: 'lang',
  messages: __dirname + '/i18n',
  devMode: false
}));

function setLang (req, res, next) {
    if(req.query.lang!=null) {
        res.cookie('lang', req.query.lang);
    }

    next();
 }

 app.use(setLang);

//require('./app/minifier.js');
require('./app/routes.js')(app);

app.use(helmet());

http.createServer(app).listen(3333);

console.log('=====================================');
console.log(' Server www.spid.gov.it su porta 3333');
console.log('=====================================');
