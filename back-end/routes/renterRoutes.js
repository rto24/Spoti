const express = require('express');
const router = express.Router();
const spotController = require('../controllers/spotController');
const authController = require('../controllers/authController');

router.get('/spots', spotController.getAllSpots, (req, res) => {
  return res.status(200).json(res.locals.spots);
})

//get specific spot owned by user
router.get('/spots/:user_id', spotController.getSpots, (req, res) => {
  return res.status(200).json(res.locals.spots);
});

router.post('/spots', authController.verifyJWT, spotController.addSpots, (req, res) => { //need to check the authController method to see if JWT is created properly
  return res.status(200).json(res.locals.spots);
});

router.put('/spots/:spot_id', spotController.updateSpot, (req, res) => {
  return res.status(200).json(res.locals.spots);
})

router.delete('spots/:spot_id', (req, res) => {
  return res.status(200).json(res.locals.spots);
})
// Renter
// Create parking spot listing - /spot (POST), createSpot(location: String, price: num, photo: String, desc: String)
// Delete listing - '/spot:id' (DELETE)
// Edit listing (if price needs to change, dates, etc.), user (permissions if they change from booker to renter) - '/spot:id' (PUT)

module.exports = router;

