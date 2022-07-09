const multer = require("multer");

let attachment = multer().single("attachment");

module.exports = {
  attachment,
};
