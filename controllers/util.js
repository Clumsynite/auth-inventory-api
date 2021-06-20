const User = require("../models/User");

exports.checkUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const check = await User.findOne({ username });
    const msg =
      check !== null ? "Username already exists" : "Username doesn't exists";
    res.json({ success: true, exists: check !== null, msg });
  } catch (error) {
    res.json({ success: false, error });
  }
};

exports.getAvatarByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const { photo } = await User.findOne({ username });
    res.json({
      success: true,
      photo,
      msg: "User avatar retrieved successfully",
    });
  } catch (error) {
    res.json({ error });
  }
};
