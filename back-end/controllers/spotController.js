const pool = require('../db');

const spotController = {};

spotController.getAllSpots = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM "Spot"');
    res.locals.spots = result.rows;
    return next();
  } catch (err) {
    return next(err);
  }
}

spotController.getSpots = async (req, res, next) => {
  const { user_id } = req.params;
  try {
    // console.log(pool)
    const result = await pool.query('SELECT * FROM "Spot" WHERE owner_id = $1', [user_id]);
    console.log('hit result', result);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Spot not found' });
    }
    res.locals.spots = result.rows[0];
    return next();
  } catch (err) {
      return next(err);
  }
}

spotController.addSpots = async (req, res, next) => {
  // const { owner_id, price, status, renter_id, img, start_date, end_date, building_address, building_name } = req.body;
  const { price, status, renter_id, img, start_date, end_date, building_address, building_name } = req.body;
  const owner_id = req.user.user_id; //owner id is set to the current user id thats logged in
  const requestors = '{}';
  try {
    const result = await pool.query(`INSERT INTO "Spot" (owner_id, price, status, requestors, renter_id, img, start_date, end_date, building_address, building_name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
    [owner_id, price, status, requestors, renter_id, img, start_date, end_date, building_address, building_name])
    const spot = result.rows[0];
    console.log('Created spot successfully', spot);
    res.locals.spots = spot;
    return next();
  } catch (err) {
      return next(err);
  }
}

spotController.updateSpot = async (req, res, next) => {
  const { spot_id } = req.params;
  const { owner_id, price, status, requestors, renter_id, img, start_date, end_date, building_address, building_name } = req.body;
  try {
    const result = await pool.query(`UPDATE "Spot" SET owner_id = $1, price = $2, status = $3, requestors = $4, renter_id = $5, img = $6, start_date = $7, end_date = $8, building_address = $9, building_name = $10 WHERE spot_id = $11 RETURNING *`,
      [owner_id, price, status, requestors, renter_id, img, start_date, end_date, building_address, building_name, spot_id]
    )
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Spot not found' });
    }
    const updatedSpot = result.rows[0];
    console.log('Updated spot successfully', updatedSpot);
    res.locals.spots = updatedSpot;
    return next();
  } catch (err) {
      return next(err);
  }
}

spotController.deleteSpot = async (req, res, next) => {
  
}

module.exports = spotController;