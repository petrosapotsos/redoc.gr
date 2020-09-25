const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');

const Party = require('../models/Party');

// @desc    Landing Page
// @route   GET /
router.get('/', (req, res) => {
  res.render('home');
});

/*
// @desc    Login/Landing Page
// @route   GET /login
router.get('/login', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login'
    })
})

// @desc    Dashboard
// @route   GET /dashboard
router.get('/dashboard', ensureAuth, async (req, res) => {
    try {
        const parties = await Party.find({user: req.user.id}).lean()
        res.render('dashboard', {
            name: req.user.firstName,
            parties
        })
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})
*/
module.exports = router;
