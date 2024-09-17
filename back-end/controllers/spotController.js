const pool = require('../db');

const spotController = {};

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