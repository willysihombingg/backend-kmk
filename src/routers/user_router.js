const router = require("express").Router();
const userController = require("../controllers/user_controller");
const authenticator = require("../middlewares/authentication");

router.post("/users", userController.registerUser);
router.get("/users", authenticator, userController.getAllUser);
router.post("/users/login", userController.loginUser);
router.patch("/users/approve", authenticator, userController.approve_user);

module.exports = router;
