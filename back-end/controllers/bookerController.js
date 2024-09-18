const pool = require('../db');

const bookerController = {
  async getBookingRequests(req, res, next) {
    try {
      const { user_id } = req.params;

      const bookingsQuery = 'SELECT requestors FROM spot WHERE owner_id = $1';
      const bookingsResult = await pool.query(bookingsQuery, [user_id]);

      if (
        !bookingsResult.rows.length ||
        bookingsResult.rows[0].booking_ids.length === 0
      ) {
        return res.status(404).json('No Current Bookings found for the user');
      }

      const allRequestors = requestorsResult.rows
        .map((row) => row.requestors)
        .flat();

      res.locals.requestors = allRequestors;
      return res.status(200).json({ requestors: allRequestors });
    } catch (err) {
      return next({
        log: `bookerController error from getBookingsRequests ${err}`,
        status: 500,
        message: { err: 'An error occurred while getting the bookings' },
      });
    }
  },
  async confirmRequestor(req, res, next) {
    try {
      // query the DB using the requestor id from params - update requestors to be an empty array again & update renter_id to be the id of confirmed renter
      const { requestor_id } = req.params;

      // update the spot table: set renter_id and reset requestors array
      const updateSpotQuery = `UPDATE "Spot" SET renter_id = $1, requestors = '{}' WHERE spot_id = $2 RETURNING renter_id`;
      const updateSpotResult = await pool.query(updateSpotQuery, [
        requestor_id,
        requestor_id,
      ]);

      if (updateSpotResult.rows.length === 0) {
        return res.status(404).json('Spot not found');
      }

      const { renter_id } = updateSpotResult.rows[0];

      res.locals.renter_id = renter_id;

      // update the user table add spot_id to the booking_ids of the requestor
      const updateUserQuery = `UPDATE "User" SET booking_ids = array_append(booking_ids, $1) WHERE user_id = $2`;
      await pool.query(updateUserQuery, [requestor_id, requestor_id]);

      next();
    } catch (err) {
      return next({
        log: `bookerController error from confirmRequestor ${err}`,
        status: 500,
        message: { err: 'An error occurred while confirming the booking' },
      });
    }
  },
  async getSpot(req, res, next) {
    try {
      const { spot_id } = req.params;

      const spotQuery = 'SELECT * FROM "Spot" WHERE spot_id = $1';
      const spotResult = await pool.query(spotQuery, [spot_id]);

      if (spotResult.rows.length === 0) {
        return res.status(404).json({ message: 'Spot not found' });
      }

      res.locals.spot = spotResult.rows[0];
      next();
    } catch (err) {
      return next({
        log: `bookerController error from getSpot ${err}`,
        status: 500,
        message: {
          err: 'An error occurred while getting the spot information',
        },
      });
    }
  },
  async addBookingRequest(req, res, next) {
    try {
      const { spot_id } = req.params;
      const { booker_id, start_date } = req.body;

      const query = `UPDATE "Spot" SET requestors = array_append(requestors, $1) WHERE spot_id = $2 RETURNING *`;
      const result = await pool.query(query, [booker_id, spot_id]);

      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Spot not found' });
      }

      res.locals.updatedSpot = result.rows[0];
      next();
    } catch (err) {
      return next({
        log: `bookerController error from addBookingRequest ${err}`,
        status: 500,
        message: { err: 'An error occurred while adding the requestor' },
      });
    }
  },
};

module.exports = bookerController;
