const express = require('express');
const router = express.Router();
const pool = require('../db.js');
const { getBookingsRequests } = require('../controllers/bookerController.js');

// See Booking Requestors - /book, GET for owner to see all the bookings requested for a spot
router.get('/', getBookingsRequests, (req, res) => {
    res.status(200).json(res.locals.booking_ids);
});

// Book a spot - '/book/:id', PUT, JSON of the booking details
router.put('/:id', (req, res) => {
    res.status(200) // finish this
});

// Confirm booking  - /book/confirm/:id, PUT
router.put('/confirm/:id', (req, res) => {
    res.status(200) // finish this
});

// Cancel booking - '/book/cancel/:id,' PUT, params
router.put('/cancel/:id', (req, res) => {
    res.status(200) // finish this
});

module.exports = router;