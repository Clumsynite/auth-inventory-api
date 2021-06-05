const router = require("express").Router();
// controllers
const auth = require("../controllers/auth");
const { decode } = require("../middlewares/jwt");

router.post("/login", auth.login);
router.post("/logout", decode, auth.logout);

module.exports = router;
