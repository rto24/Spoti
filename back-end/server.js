const express = require('express');
const app = express();
const PORT = 8080;
const path = require('path');
const pool = require('./db');

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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