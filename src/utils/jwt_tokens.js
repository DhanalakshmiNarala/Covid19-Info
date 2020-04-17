const jwt = require('jsonwebtoken');

const generateJWTAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
};

const generateJWTRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
};

module.exports = { generateJWTAccessToken, generateJWTRefreshToken };
