const router = require("express").Router();
const eventController = require("../controllers/event_controller");
const authenticator = require("../middlewares/authentication");
const { attachment } = require("../middlewares/multer");

router.post("/events", attachment, authenticator, eventController.create_event);
router.get("/events", authenticator, eventController.getAllEvent);
router.get("/events/details", authenticator, eventController.getEventDetail);
router.patch("/events", attachment, authenticator, eventController.updateEvent);
router.delete("/events", authenticator, eventController.deleteEvent);

module.exports = router;
