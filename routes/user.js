const router = require("express").Router();
// controllers
const user = require("../controllers/user");
const { decode } = require("../middlewares/jwt");

router
  .get("/:id", decode, user.onGetUserByUsername)
  // .get("/", user.onGetAllUsers)
  .post("/", user.onCreateUser)
  .put("/", decode, user.onUpdateUser)
  .delete("/", decode, user.onDeleteCurrentUser);

// update & delete user routes gets user object from the decoded jwt

module.exports = router;
