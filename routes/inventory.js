const router = require("express").Router();
// controllers
const inventory = require("../controllers/inventory");

router
  .get("/:id", inventory.getItemByID)
  .get("/", inventory.getItemsForUser)
  .post("/", inventory.addNewItem)
  .put("/", inventory.updateItemByID)
  .delete("/", inventory.deleteItemByID);

// updateItemByID, deleteItemByID get itemID from the item sent through request body

module.exports = router;
