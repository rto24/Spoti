const express = require('express');
const router = express.Router();
const pool = require('../db.js');
const { getBookingRequests, confirmRequestor } = require('../controllers/bookerController.js');

// See Booking Requestors - /book, GET for owner to see all the bookings requested for a spot
router.get('/:user_id', getBookingRequests, (req, res) => {
    res.status(200).json(res.locals.requestors);
});

// Confirm booking  - /book/confirm/:id, PATCH
router.patch('/confirm/:id', confirmRequestor, (req, res) => {
    res.status(200).json(res.locals.renter_id);
});

module.exports = router;