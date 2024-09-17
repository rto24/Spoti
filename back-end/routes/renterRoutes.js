const express = require('express');
const router = express.Router();
const spotController = require('../controllers/spotController')

//get all spots
router.get('/spots/:user_id', spotController.getSpots, (req, res) => {
  return res.status(200).json(res.locals.spots);
});

// Renter
// Create parking spot listing - /spot (POST), createSpot(location: String, price: num, photo: String, desc: String)
// Delete listing - '/spot:id' (DELETE)
// Edit listing (if price needs to change, dates, etc.), user (permissions if they change from booker to renter) - '/spot:id' (PUT)

module.exports = router;