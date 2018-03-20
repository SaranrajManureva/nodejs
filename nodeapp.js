express  	= require('express');
mysql     	= require('mysql');
var body   	= require('body-parser');
var cookie 	= require('cookie-parser');
var session = require('express-session');
var view 	= require('express-handlebars');
var path 	= require('path');
var flash	= require('connect-flash');
db_config = {};
dbCon = {};
app = express();
d='3'

const configuration = require('./config/config.js');
config = new configuration();

app.use(express.static(path.join(__dirname, 'public'))); 
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', view({defaultLayout:'layout'}));
app.set('view engine', 'handlebars'); 
app.use(body.json());  
app.use(body.urlencoded({ extended: true }));  
app.use(cookie());  
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
})); 


app.use(flash()); 

 
app.use((req, res, next)=> {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

route = require('./route/route');
app.use('/', route);