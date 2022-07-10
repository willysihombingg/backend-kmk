const { success, error } = require("../helpers/response");
const eventService = require("../services/event.services");

// CREATE EVENT
exports.create_event = async (req, res) => {
  try {
    let result = await eventService.createEvent(req.user, req.body, req.file);
    success(res, result.data, 201, result.message);
  } catch (err) {
    error(res, err.data, 422, err.message);
  }
};

// GET ALL EVENT
exports.getAllEvent = async (req, res) => {
  try {
    let result = await eventService.getAllEvent();
    success(res, result.data, 200, result.message);
  } catch (err) {
    error(res, err.data, 422, err.message);
  }
};

// GET EVENT DETAIL
exports.getEventDetail = async (req, res) => {
  try {
    let result = await eventService.getEventDetail(req.query.id);
    success(res, result.data, 200, result.message);
  } catch (err) {
    error(res, err.data, 422, err.message);
  }
};

// UPDATE EVENT
exports.updateEvent = async (req, res) => {
  try {
    let result = await eventService.updateEvent(req.query.id, req.body);
    success(res, result.data, 200, result.message);
  } catch (err) {
    error(res, err.data, 422, err.message);
  }
};

// DELETE EVENT

exports.deleteEvent = async (req, res) => {
  try {
    let result = await eventService.deleteEvent(req.query.id);
    success(res, result.data, 200, result.message);
  } catch (err) {
    error(res, err.data, 422, err.message);
  }
};
