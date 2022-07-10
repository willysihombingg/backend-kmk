const router = require("express").Router();
const letterController = require("../controllers/letter_controller");
const authenticator = require("../middlewares/authentication");
const letter = require("../models/letter");
const { attachment } = require("../middlewares/multer");

router.post(
  "/letters",
  attachment,
  authenticator,
  letterController.create_letter
);
router.get("/letters", authenticator, letterController.getAllLetter);
router.get("/letters/details", authenticator, letterController.getLetterDetail);
router.patch(
  "/letters",
  attachment,
  authenticator,
  letterController.updateLetter
);
router.delete("/letters", authenticator, letterController.deleteLetter);

module.exports = router;
