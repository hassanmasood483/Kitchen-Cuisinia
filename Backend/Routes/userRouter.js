const router = require("express").Router();
const { loginUser, registerUser, checkEmail, resetPassword } = require("../Controllers/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/check-email", checkEmail);
router.post("/reset-password", resetPassword);

module.exports = router;
