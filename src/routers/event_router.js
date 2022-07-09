const router = require("express").Router();
const eventController = require("../controllers/event_controller");
const authenticator = require("../middlewares/authentication");

router.post("/events", authenticator, eventController.create_event);
router.get("/events", authenticator, eventController.getAllEvent);
router.get("/events/details", authenticator, eventController.getEventDetail);
router.patch("/events", authenticator, eventController.updateEvent);
router.delete("/events", authenticator, eventController.deleteEvent);

module.exports = router;
