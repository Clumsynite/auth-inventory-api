const router = require("express").Router();
// controllers
const user = require("../controllers/user");
const { decode } = require("../middlewares/jwt");

router
  .get("/", user.onGetAllUsers)
  .post("/", user.onCreateUser)
  .put("/", decode, user.onUpdateUser)
  .get("/:id", user.onGetUserByUsername)
  .delete("/:id", decode, user.onDeleteCurrentUser);

module.exports = router;
