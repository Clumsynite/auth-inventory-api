const router = require("express").Router();
// controllers
const inventory = require("../controllers/inventory");

router
  .get("/:id", inventory.getItemByID)
  .get("/", inventory.getItemsForUser)
  .post("/", inventory.addNewItem)
  .put("/:id", inventory.updateItemByID)
  .delete("/:id", inventory.deleteItemByID);

module.exports = router;
