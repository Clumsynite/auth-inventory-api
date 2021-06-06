const router = require("express").Router();
// controllers
const inventory = require("../controllers/inventory");

router
  .get("/", inventory.gettemsForUser)
  .post("/", inventory.addNewItem)
  .get("/:id", inventory.getItemByID)
  .put("/:id", inventory.updateItemByID)
  .delete("/:id", inventory.deleteItemByID);

module.exports = router;
