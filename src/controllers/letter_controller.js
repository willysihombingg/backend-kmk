const { success, error } = require("../helpers/response");
const letter = require("../models/letter");
const letterService = require("../services/letter_service");

exports.create_letter = async (req, res) => {
  try {
    let result = await letterService.createLetter(req.user, req.body, req.file);
    success(res, result.data, 201, result.message);
  } catch (err) {
    error(res, err.data, 422, err.message);
  }
};

// GET ALL LETTER
exports.getAllLetter = async (req, res) => {
  try {
    let result = await letterService.getAllLetter();
    success(res, result.data, 200, result.message);
  } catch (err) {
    error(res, err.data, 422, err.message);
  }
};

// GET LETTER DETAIL
exports.getLetterDetail = async (req, res) => {
  try {
    let result = await letterService.getLetterDetail(req.query.id);
    success(res, result.data, 200, result.message);
  } catch (err) {
    error(res, err.data, 422, err.message);
  }
};

// UPDATE LETTER
exports.updateLetter = async (req, res) => {
  try {
    let result = await letterService.updateLetter(
      req.query.id,
      req.body,
      req.file
    );
    success(res, result.data, 202, result.message);
  } catch (err) {
    error(res, err.data, 422, err.message);
  }
};

// DELETE LETTER
exports.deleteLetter = async (req, res) => {
  try {
    let result = await letterService.deleteLetter(req.query.id);
    success(res, result.data, 200, result.message);
  } catch (err) {
    error(res, err.data, 422, err.message);
  }
};
