var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var session = require('express-session');

// mysql database connection
var mysql = require('mysql');
var app = express();
var orm = require("orm");

// orm stuff
app.use(orm.express("mysql://neumont:sugarc0deit@mysql.hlaingfahim.com/donutsprinkles", {
    define: function (db, models, next) {
        // user model
        models.user = db.define("Users", {
            id: Number,
            username: String,
            password: String,
        });
		// profile model
		models.profile = db.define("Profiles", {
			userId: Number,
			raceCount: Number,
			winCount: Number,
		});
        models.challenge = db.define("Challenges", {
            challenge_id: Number,
            user_id: Number,
            text: String,
            difficulty: String
        });
        //TODO: new model and follow the pattern but not users, challenges and match database
        //Node.js orm... Match the model to database
        next();
    }
}));

// route action handlers
var index = require('./routes/index');
var login = require('./routes/login');
var register = require('./routes/register');
// var profile = require('./routes/profile');
var challenge = require('./routes/challenge');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// url mapping to actions
app.use('/', index);
app.use('/login', login);
app.use('/register', register);
app.use('/challenge', challenge);
// app.use('/profile', profile);

app.use(session({
    secret: 'super-duper-secret-string',
    resave: true,
    saveUninitialized: true,
	cookie: {
		// maxAge: 24 * 60 * 60
	},
}));

// checks to make sure we have an active session
var auth = function (req, res, next) {
    if (req.session && req.session.user != null) {
        return next();
    }
    else {
        res.render("authenticationFailure");
    }
};

app.get('/login', function (req, res) {
	res.send("hello: " + req.session.user);
});

// login
app.post('/login', function (req, res) {
	if (req.session.user) {
		res.redirect('/profile');
		return;	
	}
    // check to make sure user entered in values
    if (validateLoginForm(req, res)) {
        var username = req.body.username;
        var password = req.body.password;
		var User = req.models.user;

        User.find({username: username, password: password}, function (err, user) {
            if (err) {
                res.status(err.status);
                res.render('error');
                return;
            }

            if (user.length == 1) {
                req.session.user = user[0];
				res.redirect('/profile');
            } else {
                res.render("loginFailure");
            }
        });
    }
});

// user registration
app.post('/registerUser', function(req, res) {
	if (validateRegistrationForm(req, res)) {
		// check to make sure a user doesn't already exist
		var username = req.body.username;
		var password = req.body.password;

		req.models.user.exists({ username: username }, function(err, exists) {
			if (exists) {
				//TODO make this display in registration screen!!!
				res.send("User already exists with that username!");	
			} else {
				// add them to the database
				req.models.user.create({username: username, password: password}, function (err, user) {
					if (err) throw err
					res.redirect('/login');
				});
			}
		});
	}
});

app.get('/changePassword', auth, function(req, res) {
	res.render('changePassword');
});


// handler for updating user password
app.post('/updatePassword', auth, function(req, res) {
	var newPassword = req.body.new_password;
	var confirmNewPassword = req.body.confirm_new_password;

	req.checkBody("confirm_new_password", "Passwords must match").equals(newPassword);
	req.checkBody("newPassword", "Password cannot be empty!").notEmpty();

	// validate new password
	var errors = req.validationErrors();
	if (errors) {
		res.render("changePassword", { errors: errors });
		return;
	}

	// update in the database
	var activeUser = req.session.user;

	req.models.user.find({ username: activeUser.username }).each(function (user) {
		user.password = newPassword;	
	}).save(function(err) {
		if (err) throw err;
		res.redirect('/profile');
	});
});

app.get('/profile', auth, function(req, res) {
	res.render('profile', { user : req.session.user });
});

app.get('/logout', function (req, res) {
    if (req.session.user) {
        req.session.destroy();
        res.render("logout");
    } else {
        // already signed out, go back to login screen
        res.redirect("login");
    }
});

// validates a login form by ensuring that both username
// and password fields are not empty
function validateLoginForm(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    // validate
    req.checkBody("username", "Username cannot be blank!").notEmpty();
    req.checkBody("password", "Password cannot be blank!").notEmpty();

    // echo back form with errors displayed
    var errors = req.validationErrors();
    if (errors) {
        res.render("login", {username: username, password: password, errors: errors});
        return false;
    }
    return true;
}

function validateRegistrationForm(req, res) {
	req.checkBody("username", "Username cannot be blank!").notEmpty();
	req.checkBody("password", "Password cannot be blank!").notEmpty();
	req.checkBody("confirm_password", "Confirmation Password cannot be blank!").notEmpty();
	req.checkBody("confirm_password", "Passwords must match").equals(req.body.password);

	var errors = req.validationErrors();
	if (errors) {
		var registrationForm = {
			username : req.body.username,
			password : req.body.password,
			errors : errors,
		};
		res.render("registration", registrationForm);
		return false;
	}
	return true;
}

app.get('/enterChallenge', function(req, res) {
	res.render("enterChallenge");
});

app.get('/playChallenge', function(req, res) {
	var db = createDBConnection();
	var query = "SELECT * FROM `Challenges` ORDER BY Rand() LIMIT 1";
	var text = "";

	db.query(query, function(err, rows) {
		if (err) throw err;
		db.end();
		text = rows[0].text;
		res.render("challenge", { text: text });
	});
})

app.get('/uploadChallenge', auth, function (req, res) {
    res.render("enterChallenge");
});

var maxLength = 500;

function sanitizeChallengeInput(text) {
	// remove line breaks
	text = text.replace(/(\r\n|\n|\r)/gm," ");
	
	// remove excess white spaces
	text = text.trim();
	
	// remove duplicate white spaces
	text = text.replace(/ + (?= )/g, '');
	
	// only allow up to the maxLength amount
	if (text.length > maxLength) {
		text = text.substr(0, maxLength);
	}
	return text;
}

app.post('/processChallenge', function (req, res) {
    var userId = req.session.user.id;
    var text = req.body.challengeText;
    var diff = req.body.difficulty;

	text = sanitizeChallengeInput(text);
	req.body.challengeText = text;
	req.checkBody("challengeText", "The challenge cannot be blank!").notEmpty();

	// echo back form with errors displayed
	var errors = req.validationErrors();
	if (errors) {
		res.render("enterChallenge", {errors: errors});
		return;
	}

    //Insert into database (it's valid at this point)
    req.models.challenge.create({user_id: userId, text: text, difficulty: diff}, function (err, challenge) {
        if (err) {throw err; }

    });
    res.redirect("/profile");
});

// creates a connection to our mysql database
function createDBConnection() {

    // connection settings
    var connection = mysql.createConnection({
        host: 'mysql.hlaingfahim.com',
        user: 'neumont',
        password: 'sugarc0deit',
        database: 'donutsprinkles'
    });

    // connect to database
    connection.connect(function (err) {
        if (err) {
            return null;
        }
    });
    return connection;
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
