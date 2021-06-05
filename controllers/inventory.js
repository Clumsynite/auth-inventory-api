const Item = require("../models/Item");

exports.onGetAllItems = async (req, res) => {
  try {
    const items = await Item.find({});
    return res
      .status(200)
      .json({ success: true, items, msg: "Successfully retreived All items" });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};

exports.getItem = async (req, res) => {
  try {
    const { _id } = req.params;
    const item = await Item.findOne({ _id });
    return res
      .status(200)
      .json({
        success: true,
        item,
        message: `${item.name}, successfully retreived`,
      });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};

exports.addNewItem = async (req, res) => {
  try {
    const item = await new Item({
      ...req.body
    }).save();

    return res
      .status(200)
      .json({ success: true, item, msg: "Successfully added Item" });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const {_id} = req.body
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

exports.deleteItem = async (req, res) => {
  try {
    const { _id, name } = req.body;
    const item = await Item.deleteOne({ _id });
    return res.status(200).json({
      success: true,
      message: `Deleted a count of ${item.deletedCount} item with name: ${name}.`,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};
