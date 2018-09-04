const mysql = require ('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const mailer = require('nodemailer');
const userController = require('./userController.js');
const adminController = require('./adminController.js');
const dogController = require('./dogController.js');
const bookingController = require('./bookingController.js');

const app = express();
const portNum = process.env.PORT || 3000;
/*
http.createServer(function (req, res) {
    fs.readFile('signup.html', function(err, data) {
        res.writeHead(200, {'Content-type': 'text/html'});
        res.write(data);
        res.end();
    })
}).listen(8000);
console.log('Server started on port '+8000);
*/

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))

//edit the following fields according to your database setup
const db = mysql.createConnection({
    host: 'hostname',
    user: 'username',
    password: 'password',
    port: 'portnumber',
    database: 'databasename'
});

db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('mysql connected...');
});

//signup and login page route
app.get('/',function(req, res){
    res.render('signup',{
        error: null
    });
});
app.get('/signup',function(req, res){
    res.render('signup',{
        error: null
    });
});

app.get('/login', (req,res) => {
    res.render('login',{
        error: null
    });
})

let router = express.Router();

// the get function expect a callback with signature(req,res,next), so the database variable db
// is passed to the function in the Controller, the corresponding function will do something with the db variable,
// and return the callback function with the signature expected.

// JavaScript has first-class functions, being able to pass function as argument to other functions, 
// return functions as the values from other functions, assign them to variables or data structure.
// https://en.wikipedia.org/wiki/First-class_function

//user page route
router.post('/signup',userController.addUser(db));
router.post('/login',userController.login(db));
router.get('/user/:id',requiresLogin, userController.getUserPage(db));
router.post('/user/edit/:id', userController.editUser(db));

//admin page route
router.get('/admin',adminController.getAdmin(db));

//dog panel route
router.post('/dogs/add/:userid', dogController.addDog(db));
router.post('/dogs/edit/:userid/:dogsid', dogController.editDog(db));
router.post('/dogs/delete/:userid/:dogsid', dogController.deleteDog(db));

//booking panel route
router.post('/appointment/add', bookingController.addBooking(db,false)); //enable booking confirm email by setting second argument to true  
router.post('/booking/edit/:userid/:bid', bookingController.editBooking(db));
router.post('/booking/delete/:userid/:bid', bookingController.deleteBooking(db));

app.use(router);

//the following function which tries to setup session for user login doesn't work properly
function requiresLogin(req, res, next){
    if (req.session && req.session.userId){
        return next();
    }else{
        var err = new Error('You must be logged in to view this page.');
        err.status = 401;
        res.redirect('/login');
    }
}


app.listen(portNum, function(){
    console.log('Server started on port '+portNum);
})

//the following line tries to setup automatic reminder email every 24 hours
//autoEmail();
//setInterval(autoEmail,86400000);
