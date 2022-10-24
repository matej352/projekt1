const express = require('express');
const dotenv = require('dotenv');
const https = require("https");
const path = require('path');
const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');
const bodyParser = require('body-parser');
const comments = require('./database/comments.js')
const matches = require('./database/matches.js')



dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, '/public')));




const config = {
	authRequired: false,		//ok
	auth0Logout: true,
	idpLogout: true,		//ok
	secret: process.env.SECRET,		//ok
	baseURL: 'http://localhost:3000',		//ok
	clientID: process.env.CLIENT_ID,		//ok
	issuerBaseURL: 'https://dev-omid1itejk8yys2k.eu.auth0.com'	//ok
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
	//res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
	res.redirect('home');
});


app.get('/comment', requiresAuth(), function (req, res) {
	var matchId = req.query.matchId;
	const user = JSON.stringify(req.oidc.user);
	res.render('comment', {
		matchId: matchId,
	});
	//console.log(user)
});

app.post('/comment', requiresAuth(), function (req, res) {

	const user = req.oidc.user;
	var authorEmail = user.email;
	var matchId = req.query.matchId;
	var comment = req.body.comment;

	comments.addComment(authorEmail, matchId, comment);

	res.redirect('home');

});

app.post('/edit_comment', requiresAuth(), function (req, res) {

	const user = req.oidc.user;
	var loggedInUserEmail = user.email;
	

	var commentId = req.query.commentId;
	var comment = req.body.comment;

	var commentAuthorEmail = comments.getCommentById(commentId).authorEmail;
	if (loggedInUserEmail !== commentAuthorEmail) {
		res.redirect('home');
	}

	comments.updateComment(commentId, comment);

	res.redirect('home');

});


app.get('/edit', requiresAuth(), function (req, res) {

	const user = req.oidc.user;
	var loggedInUserEmail = user.email;
	var authorEmail = req.query.authorEmail;

	var commentId = req.query.commentId;

	if (loggedInUserEmail !== authorEmail) {
		res.redirect('home');
	} else {

		var comment = comments.getCommentById(commentId);
		
		res.render('edit_comment', {
			comment: comment,
		});


	}

	//comments.addComment(authorEmail, matchId, comment);



});


app.get('/update_match', requiresAuth(), function (req, res) {

	const user = req.oidc.user;
	var loggedInUserEmail = user.email;

	var matchId = req.query.matchId;

	if (loggedInUserEmail !== 'admin@gmail.com') {
		res.redirect('home');
	} else {

		var match = matches.getMatchById(matchId);
		
		res.render('update_match', {
			match: match,
		});


	}

	//comments.addComment(authorEmail, matchId, comment);



});

app.post('/update_match', requiresAuth(), function (req, res) {

	const user = req.oidc.user;
	var loggedInUserEmail = user.email;
	
	if (loggedInUserEmail !== 'admin@gmail.com') {
		res.redirect('home');
	}


	var newResult = req.body.result;

	var matchId = req.query.matchId;

	matches.updateMatch(matchId, newResult);

	res.redirect('home');

});

app.get('/delete', requiresAuth(), function (req, res) {
	const user = req.oidc.user;
	var loggedInUserEmail = user.email;
	var commentId = req.query.commentId;
	var commentAuthorEmail = comments.getCommentById(commentId).authorEmail;
	
	if (loggedInUserEmail !== 'admin@gmail.com' && loggedInUserEmail !== commentAuthorEmail) {
		res.redirect('home');
	} else {
		
		comments.deleteComment(commentId);
	
		res.redirect('home');
	}



});






const homeController = require('./controllers/homeController');

app.use(homeController);


const PORT = 3000;

app.listen(PORT, (error) => {
	if (!error)
		console.log("Server is Successfully Running, and App is listening on port " + PORT)
	else
		console.log("Error occurred, server can't start", error);
}
);
