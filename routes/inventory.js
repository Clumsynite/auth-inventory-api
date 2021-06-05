const router = require("express").Router();
// controllers
const inventory = require("../controllers/inventory");

router.get("/items", inventory.getAllItems);

module.exports = router;
