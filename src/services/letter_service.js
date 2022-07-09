const { query } = require("express");
const { body } = require("express-validator");
const LetterModel = require("../models/letter");
const ImageKit = require("imagekit");

var imagekit = new ImageKit({
  publicKey: "public_ksNG8sBOic3WrvWhxRVt/y3oCuE=",
  privateKey: "private_RGWjsi9JaU5RaW0OireaxtWxlC4=",
  urlEndpoint: "https://ik.imagekit.io/n4ttntgq4",
});
// Function to input letter
exports.createLetter = async (creator, body, attachment) => {
  // ONLY ADMIN WHO CAN DO THIS ACTION!!!
  // Params
  // From, to, receier, courier,
  // letter_type, note, outgoing_date,
  // entry_date, attachment, created_by
  //

  // ADMIN or not
  if (creator.role != "ADMIN") {
    return reject({
      message: "You are not authorized to do this action",
    });
  }

  let params = {
    from: body.from,
    to: body.to,
    receiver: body.receiver,
    courier: body.courier,
    letter_type: body.letter_type,
    note: body.note,
    outgoing_date: body.outgoing_date,
    entry_date: body.entry_date,
    create_by: creator._id,
  };

  for (let prop in params) if (!params[prop]) delete params[prop];

  if (attachment) {
    let dataImage = await imagekit.upload({
      file: attachment.buffer.toString("base64"),
      fileName: `IMG-${Date.now()}`,
    });
    params.attachment = dataImage.url;
  }

  return new Promise((resolve, reject) => {
    LetterModel.create(params)
      .then((letter) => {
        console.log(letter);
        return resolve({
          message: "Letter has been created",
          data: letter,
        });
      })
      .catch((err) => {
        console.log(err);
        return reject({
          message: err.message,
        });
      });
  });
};

exports.getAllLetter = async () => {
  return new Promise((resolve, reject) => {
    // cara 1

    LetterModel.find({})
      .populate("receiver", "name")
      .populate("courier", "name")
      .then((allLetters) => {
        if (allLetters.length == 0) {
          return resolve({
            message: "Letters empty",
            data: allLetters,
          });
        }
        return resolve({
          data: allLetters,
        });
      })
      .catch((err) => {
        return reject({
          message: err.message,
        });
      });

    // // cara 2
    // const allLetters = await LetterModel.find({})
    // console.log(allLetters)
  });
};

exports.getLetterDetail = async (Letterid) => {
  console.log(Letterid);
  return new Promise((resolve, reject) => {
    LetterModel.findById(Letterid)
      .then((letterDetail) => {
        return resolve({
          data: letterDetail,
        });
      })
      .catch((err) => {
        return reject({
          message: err.message,
        });
      });
  });
};

exports.updateLetter = async (creator, body) => {
  // ONLY ADMIN WHO CAN DO THIS ACTION!!!
  // Params
  // From, to, receier, courier,
  // letter_type, note, outgoing_date,
  // entry_date, attachment, created_by

  return new Promise((resolve, reject) => {
    // ADMIN or not
    // if (creator.role != "ADMIN") {
    //   return reject({
    //     message: "You are not authorized to do this action",
    //   });
    // }

    let params = {
      from: body.from,
      to: body.to,
      receiver: body.receiver,
      courier: body.courier,
      letter_type: body.letter_type,
      note: body.note,
      outgoing_date: body.outgoing_date,
      entry_date: body.entry_date,
      attachment: body.attachment,
    };

    // for (let prop in params) if (!params[prop]) delete params[prop];

    LetterModel.findByIdAndUpdate(id, params, {
      new: true,
    })
      .then((letterUpdate) => {
        return resolve({
          data: letterUpdate,
          message: `Letter has been updated`,
        });
      })
      .catch((err) => {
        return reject({
          message: err.message,
        });
      });
  });
};

exports.deleteLetter = async (letterid) => {
  return new Promise((resolve, reject) => {
    LetterModel.findByIdAndDelete(letterid)
      .then((letterDelete) => {
        console.log(letterDelete);
        return resolve({
          data: letterDelete,
          message: `Letter has been remove`,
        });
      })
      .catch((err) => {
        return reject({
          message: err.message,
        });
      });
  });
};
