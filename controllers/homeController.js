const { connectMatchesWithComments } = require('./../database/matches.js')
const express = require('express');
const team  = require('../database/teamScores.js');

const router = express.Router();


router.get('/home', function (req, res) {

    let loggedInUserEmail;
    if (req.oidc.isAuthenticated()) {
       const user = req.oidc.user;
       loggedInUserEmail = user.email;
      
    }

    //get data for scores table
    team.calculatePoints();
    const teams = team.getTeamsOrderdByScoreDesc();
    
    matchesWithComments = connectMatchesWithComments();

    res.render('home', {
        loggedInUserEmail: loggedInUserEmail,
        matches: matchesWithComments,
        teams: teams
    });
});

// /admin/add-product => POST
//router.post('/add-product', productsController.postAddProduct);




module.exports = router;