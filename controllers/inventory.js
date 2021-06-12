const Item = require("../models/Item");

// Not being used
// Use getItemsForUser instead
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find({});
    return res
      .status(200)
      .json({ success: true, items, msg: "Successfully retreived All items" });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};

// get items for the current user
exports.getItemsForUser = async (req, res) => {
  try {
    const { username } = req.body;
    if (!username)
      return res
        .status(500)
        .json({ success: false, error: "User isn't logged in" });
    const items = await Item.find({ user: username });
    return res
      .status(200)
      .json({ success: true, items, msg: "Successfully retreived All items" });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};

exports.getItemByID = async (req, res) => {
  try {
    const { _id } = req.params;
    const item = await Item.findOne({ _id });
    return res.status(200).json({
      success: true,
      item,
      msg: `${item.name}, successfully retreived`,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};

exports.addNewItem = async (req, res) => {
  try {
    const { username } = req.user;
    if (!username)
      return res
        .status(500)
        .json({ success: false, error: "User isn't logged in" });
    const item = await new Item({
      ...req.body,
      user: username,
    }).save();

    return res
      .status(200)
      .json({ success: true, item, msg: "Successfully added Item" });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};

exports.updateItemByID = async (req, res) => {
  try {
    const { _id } = req.body;
    await Item.findByIdAndUpdate(
      { _id },
      {
        ...req.body,
      }
    );
    const item = await Item.findOne({ _id });
    return res
      .status(200)
      .json({ success: true, item, msg: "Item Update Successful" });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};

exports.deleteItemByID = async (req, res) => {
  try {
    const { _id, name } = req.body;
    const item = await Item.deleteOne({ _id });
    return res.status(200).json({
      success: true,
      msg: `Deleted a count of ${item.deletedCount} item with name: ${name}.`,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};
