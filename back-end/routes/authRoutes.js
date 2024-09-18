const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');
const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/', session: false }), authController.googleCallback);
router.get('/userInfo', authController.verifyJWT, authController.getUserCred);

module.exports = router;