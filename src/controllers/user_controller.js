const { success, error } = require("../helpers/response");
const UserService = require("../services/user_service");

exports.registerUser = async (req, res) => {
  try {
    let result = await UserService.registerUser(req.body);
    success(res, result.data, 201, result.message);
  } catch (err) {
    error(res, err.data, 422, err.message);
  }
};

exports.loginUser = async (req, res) => {
  try {
    let result = await UserService.loginUser(req.body);
    success(res, result.data, 200, result.message);
  } catch (err) {
    error(res, err.data, 422, err.message);
  }
};

exports.approve_user = async (req, res) => {
  try {
    let result = await UserService.approve_user(req.user.role, req.body.nim);
    success(res, result.data, 201, result.message);
  } catch (err) {
    error(res, err.data, 422, err.message);
  }
};

exports.getAllUser = async (req, res) => {
  try {
    let result = await UserService.getAllUser();
    success(res, result.data, 200, result.message);
  } catch (err) {
    error(res, err.data, 422, err.message);
  }
};
