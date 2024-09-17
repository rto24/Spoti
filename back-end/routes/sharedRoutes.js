// Shared Processes
const express = require('express');
const router = express.Router();
const pool = require('../db.js');
const { userLogin, userRegister } = require('../controllers/userController.js');

// Login: '/login', (POST), checkUser(email: String, password: String)
router.post('/login', userLogin, (req, res) => {
    res.status(200).json(res.locals.data);
});

// Create User: '/signup', (POST), createUser(email: String, password: String)
router.post('/signup', userRegister, (req, res) => {
    res.status(200).json(res.locals.data);
})

// authorization / authentication / session management

// Onboarding - '/settings', POST, JSON of the address or payment info
// Settings - '/settings', PUT, JSON of new address or payment info

module.exports = router;