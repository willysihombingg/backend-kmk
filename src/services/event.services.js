const { now } = require("mongoose");
const EventModel = require("../models/event");

// function to input letter
exports.createEvent = async (creator, body) => {
  // ONLY ADMIN WHO CAN DO THIS ACTION!!!
  // Params
  // event_name, chairman, participant, handphone,
  // title, place, date, attachment, created_by

  return new Promise((resolve, reject) => {
    // ADMIN OR NOT
    if (creator.role != "ADMIN") {
      return reject({
        message: "You are not auhtorized to do this action",
      });
    }
    // const date = new Date(body.date);

    let params = {
      event_name: body.event_name,
      chairman: body.chairman,
      participant: body.participant,
      handphone: body.handphone,
      title: body.title,
      place: body.place,
      date: body.date,
      attachment: body.attachment,
      created_by: creator._id,
    };

    for (let prop in params) if (!params[prop]) delete params[prop];

    EventModel.create(params)
      .then((eventCreate) => {
        return resolve({
          message: "event has been created",
          data: eventCreate,
        });
      })
      .catch((err) => {
        return reject({
          message: err.message,
        });
      });
  });
};

exports.getAllEvent = async () => {
  return new Promise((resolve, reject) => {
    EventModel.find({})
      .then((allEvents) => {
        if (allEvents.length == 0) {
          return resolve({
            message: "Events Empty",
            data: allEvents,
          });
        }
        return resolve({
          data: allEvents,
        });
      })
      .catch((err) => {
        return reject({
          message: err.message,
        });
      });
  });
};

exports.getEventDetail = async (eventid) => {
  return new Promise((resolve, reject) => {
    EventModel.findById(eventid)
      .then((eventDetail) => {
        return resolve({
          data: eventDetail,
        });
      })
      .catch((err) => {
        return reject({
          message: err.message,
        });
      });
  });
};

exports.updateEvent = async (id, body) => {
  console.log("id :", id);
  return new Promise((resolve, reject) => {
    let params = {
      event_name: body.event_name,
      chairman: body.chairman,
      participant: body.participant,
      handphone: body.handphone,
      title: body.title,
      place: body.place,
      date: body.date,
      attachment: body.attachment,
    };
    // console.log("Params :", params);
    // for (let prop in params) if (!params[prop]) delete params[prop];

    EventModel.findByIdAndUpdate(id, params, {
      new: true,
    })
      .then((eventUpdate) => {
        // console.log("Event update :", eventUpdate);
        return resolve({
          data: eventUpdate,
          message: "Event has been updated",
        });
      })
      .catch((err) => {
        return reject({
          message: err.message,
        });
      });
  });
};

exports.deleteEvent = async (eventid) => {
  return new Promise((resolve, reject) => {
    EventModel.findByIdAndDelete(eventid)
      .then((eventDelele) => {
        // console.log(eventDelele);
        return resolve({
          data: eventDelele,
          message: "Event has been remove",
        });
      })
      .catch((err) => {
        return reject({
          message: err.message,
        });
      });
  });
};
