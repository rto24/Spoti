const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const pool = require('../db');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      const email = profile.emails[0].value;
      const username = profile.displayName;

      pool.query(
        'SELECT * FROM "User" WHERE email = $1',
        [email],
        (err, userRes) => {
          if (err) return done(err);

          if (userRes.rows.length > 0) {
            return done(null, userRes.rows[0]);
          } else {
            pool.query(
              'INSERT INTO "User" (email, username) VALUES ($1, $2) RETURNING *',
              [email, username],
              (insertErr, newUserRes) => {
                if (insertErr) return done(insertErr);
                return done(null, newUserRes.rows[0]);
              }
            )
          }
        }
      )
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.user_id);
});

passport.deserializeUser((user_id, done) => {
  pool.query('SELECT * FROM "User" WHERE user_id = $1', [user_id], (err, userRes) => {
    return done(null, userRes.rows[0]);
  })
})