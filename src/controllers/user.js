const { insertUserInDB } = require('../services/user');
const { successResponse, failureResponse } = require('../utils/response');

const addUser = async (req, res, next) => {
  try {
    const user = {
      user_name: req.body.username,
      password: req.body.password,
      confirm_password: req.body.confirm_password,
      name: req.body.name,
      email: req.body.email,
      is_admin: req.body.is_admin || false, // fixme: req.is_admin should'nt be allowed
    };
    if (user.password === user.confirm_password) {
      const userRecord = await insertUserInDB(user);
      if (userRecord) {
        return successResponse(res, {
          status: 200,
          message: 'User successfully signed up',
        });
      }
      return failureResponse(res, {
        status: 400,
        message: 'User sign up failed',
      });
    } else {
      return failureResponse(res, {
        status: 400,
        message: 'Password and confirm password are not equal',
      });
    }
  } catch (error) {
    return failureResponse(res, {
      status: 400,
      message: error.message,
    });
  }
};

module.exports = { addUser };
