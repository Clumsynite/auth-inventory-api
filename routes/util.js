const router = require("express").Router();
const utilsController = require("../controllers/util");

router
  .get("/check-username/:username", utilsController.checkUsername)
  .get("/get-avatar/:username", utilsController.getAvatarByUsername);

module.exports = router;
