const { matches, connectMatchesWithComments } = require('./../database/matches.js')
const express = require('express');

const router = express.Router();


router.get('/home', function (req, res) {

    let loggedInUserEmail;
    if (req.oidc.isAuthenticated()) {
       const user = req.oidc.user;
       loggedInUserEmail = user.email;
      
    }
    
    matchesWithComments = connectMatchesWithComments();

    res.render('home', {
        loggedInUserEmail: loggedInUserEmail,
        matches: matchesWithComments,
    });
});

// /admin/add-product => POST
//router.post('/add-product', productsController.postAddProduct);




module.exports = router;