const express = require('express');
const router = express.Router();
const passport = require('passport')

router.get('/', (req,res)=>{
    res.render('login')
})

router.post('/valida', (req, res, next)=>{
    passport.authenticate("local", {
        successRedirect: '/usuario',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next)
})

router.get('/google',
    passport.authenticate('google', { scope: ['email'] }));

router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login', failureFlash: true }),
    function(req, res) {
        res.redirect('/usuario');
    });

module.exports = router