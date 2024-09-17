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

// spotController.addSpots = async (req, res, next) => {
//   const { owner_id, address, price, status, renter_id, img, start_date, end_date } = req.body;
//   const requestors = '[]';
//   try {
//     const result = await pool.query('INSERT INTO "Spot" (owner_id, address, price, status, requestors, renter_id, img, start_date, end_date) VALUES ($1 $2 $3 $4 $5 $6 $7 $8 $9) RETURNING *',
//     [owner_id, address, price, status, renter_id, img, start_date, end_date])
//     const spot = result.rows[0];
//     console.log('Created spot successfully', spot);

//     if(spot) {
//       res.status(200).json({ spot });
//   } else {
//       res.status(404).json({ message: "Spot could not be created" });
//   }
//   }
// }
// spotController.getSpots = (req, res, next) => {
//   pool.query('SELECT * FROM "User"')
//     .then((result) => {
//       console.log('hit result', result);
//       res.locals.spots = result.rows;
//       return next();
//     })
//     .catch((err) => {
//       return next(err);
//     })
// }

module.exports = spotController;