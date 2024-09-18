const express = require('express');
const router = express.Router();
const pool = require('../db.js');
const { getBookingRequests, confirmRequestor, getSpot, addBookingRequest } = require('../controllers/bookerController.js');

// See Booking Requestors - /book, GET for owner to see all the bookings requested for a spot
router.get('/:user_id', getBookingRequests, (req, res) => {
    res.status(200).json(res.locals.requestors);
});

// route for user to see spot listing
router.get('/spots/:spot_id', getSpot, (req, res) => {
    return res.status(200).json(res.locals.spot);
  });

// Confirm booking  - /book/confirm/:id, PATCH
router.patch('/confirm/:id', confirmRequestor, (req, res) => {
    res.status(200).json(res.locals.renter_id);
});

// spot_id, booker_id, selected date through params route to add requestor to owners requestor array
router.patch('/spots/:spot_id', addBookingRequest, (req, res) => {
    res.status(200).send('Request sent to owner!');
});

module.exports = router;