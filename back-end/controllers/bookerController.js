const pool = require('../db');

const bookerController = {
    async getBookingsRequests (req, res, next) {
        try {
            const { user_id } = req.params;

            const bookingsQuery = 'SELECT booking_ids FROM "Users" WHERE user_id = $1';
            const bookingsResult = await pool.query(bookingsQuery, [user_id]);

            if (bookingsResult.rows.length === 0 || !bookingsResult.rows[0].booking_ids || bookingsResult.rows[0].booking_ids.length === 0) {
                return res.status(404).json("No Current Bookings found for the user");
            }

            const { booking_ids } = bookingsResult.rows[0];

            res.locals.booking_ids = booking_ids;
            return next();
        } catch (err) {
            return next({
                log: `bookerController error from getBookingsRequests ${err}`,
                status: 500,
                message: { err: "An error occurred while getting the bookings" },
              });
        }
    }
}

module.exports = bookerController;