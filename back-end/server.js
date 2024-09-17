const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes.js');
const PORT = 8080;
const path = require('path');
const pool = require('./db.js');
const cors = require('cors');
const passport = require('passport')

const sharedRoutes = require('./routes/sharedRoutes.js');
const renterRoutes = require('./routes/renterRoutes.js');
const bookerRoutes = require('./routes/bookerRoutes.js');

require('dotenv').config();
require('./middleware/passport.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cookieParser());
app.use(passport.initialize());

app.use('/', sharedRoutes);
app.use('/auth', authRoutes);
app.use('/renter', renterRoutes);
app.use('/book', bookerRoutes);

app.get('/', (req, res) => {
  pool.query('SELECT NOW()', (err, dbRes) => {
    if (err) {
      console.log('Error fetching data from db', err);
      res.status(500).send('Database error');
    } else {
      res.status(200).send(`Database connected: ${dbRes.rows[0].now}`)
    }
  });
});

app.use((req, res) => {
  return res.status(404).send('404 Not Found');
});

app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'Express error handler caught unknown middleware error',
        status: 500,
        message: { err: 'An error occured'}
    }
    const errorObj = Object.assign({}, defaultErr, err);
    return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});