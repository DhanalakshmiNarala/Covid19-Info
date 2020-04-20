const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { getUserFromDB } = require('../services/user');
const {
  generateJWTAccessToken,
  generateJWTRefreshToken,
} = require('../utils/jwt_tokens');
const { successResponse, failureResponse } = require('../utils/response');

const login = async (req, res, next) => {
  try {
    const user = {
      user_name: req.body.username,
      password: req.body.password,
    };
    const dbUser = await getUserFromDB({ user_name: user.user_name });
    if (!dbUser) {
      return failureResponse(res, { status: 400, message: 'User not found' });
    }
    if (await bcrypt.compare(user.password, dbUser.password)) {
      const userInfo = {
        id: dbUser.id,
        name: dbUser.name,
        isAdmin: dbUser.is_admin,
      };
      const accessToken = generateJWTAccessToken(userInfo);
      const refreshToken = generateJWTRefreshToken(userInfo);
      return successResponse(res, {
        status: 200,
        message: 'Successfully logged in',
        results: {
          accessToken,
          refreshToken,
        },
      });
    }
    return failureResponse(res, {
      status: 400,
      message: 'Authentication failed',
    });
  } catch (error) {
    return failureResponse(res, { status: 500, message: error.message });
  }
};

const getNewAccessToken = async (req, res, next) => {
  const refreshToken = req.body.refresh_token;
  if (!refreshToken) {
    return failureResponse(res, {
      status: 400,
      message: 'Refresh tokens is required',
    });
  }
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (error, userInfo) => {
      if (error) {
        return failureResponse(res, {
          status: 403,
          message: 'Invalid refresh token',
        });
      }
      const accessToken = generateJWTAccessToken({
        id: userInfo.id,
        name: userInfo.name,
        isAdmin: userInfo.isAdmin,
      });
      return successResponse(res, {
        status: 200,
        message: 'New access token generated',
        results: {
          accessToken,
        },
      });
    }
  );
};

const logout = async (req, res, next) => {
  return successResponse(res, {
    status: 204,
    message: 'Successfully logged out',
  });
};

//Authentication
const authorize = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const accessToken = authHeader && authHeader.split(' ')[1];
  if (!accessToken) {
    return failureResponse(res, {
      status: 401,
      message: 'Access token is required',
    });
  }
  jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET,
    (error, userInfo) => {
      if (error) {
        return failureResponse(res, {
          status: 403,
          message: 'Unauthorized',
        });
      }
      req.userInfo = userInfo;
    }
  );
  next();
};

module.exports = { login, getNewAccessToken, logout, authorize };
