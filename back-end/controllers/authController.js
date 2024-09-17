const jwt = require('jsonwebtoken');

const authController = {}

authController.googleCallback = (req, res) => {
  const user = req.user;
  const token = jwt.sign({ id: user.user_id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.cookie('jwt', token, { httpOnly: true, secure: false });
  res.redirect('http://localhost:5173/home')
};

authController.verifyJWT = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(400).json({ message: 'Auth token is missing' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(400).json({ message: 'Invalid token' });
    }
    req.user = decoded;
    next();
  })
}

module.exports = authController;